import { ComparatorHandler } from "@drozdik.m/comparator-handler";
import { FibonacciHeapNode } from "./FibonacciHeapNode";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { IMergable } from "@drozdik.m/common-interfaces/IMergable";
import { IDisposable } from "@drozdik.m/common-interfaces/IDisposable";
import { ICountable } from "@drozdik.m/common-interfaces/ICountable";
import { IBuildable } from "@drozdik.m/common-interfaces/IBuildable";
import { FibonacciTree } from "./FibonacciTree";


export abstract class FibonacciHeap<T> implements IMergable<FibonacciHeap<T>>, ICountable, IBuildable<T>, IDisposable
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    comparator: ComparatorHandler<T>;
    comparatorFunction: IComparator<T>;
    count: number = 0;
    root: FibonacciHeapNode<T> = null;
    min: FibonacciHeapNode<T> = null;
    last: FibonacciHeapNode<T> = null;

    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    constructor(comparator: IComparator<T> = null)
    {
        this.comparatorFunction = comparator;
        this.comparator = new ComparatorHandler(comparator);
    }

    //--------------------------------------------------
    //----------COMPARATOR WRAPPER----------------------
    //--------------------------------------------------
    /**
     * Wraps comparator so the heap is easily transfarable to min/max heap
     * @param a Parameter 1
     * @param b Parameter 2
     */
    protected abstract ComparatorWrapper(a: T, b: T): number;


    //--------------------------------------------------
    //----------MERGE-----------------------------------
    //--------------------------------------------------
    Merge(obj: FibonacciHeap<T>): void
    {
        //Count
        this.count += obj.count;

        //Nulls
        if (this.root == null)
        {
            this.root = obj.root;
            this.min = obj.min;
            this.last = obj.last;
            obj.Clear();
            return;
        }
        else if (obj.root == null)
            return;

        //Link 
        this.last.next = obj.root;
        obj.root.previous = this.last;
        this.last = obj.last;

        //Set min
        if (this.ComparatorWrapper(obj.min.tree.Key(), this.min.tree.Key()) == -1)
            this.min = obj.min;

        //Clear the other object
        obj.Clear();
    }

    /**
     * Merges trees into this heap. Be aware! Count and other properties are not updated.
     * @param obj Tree to merge
     */
    private MergeTree(obj: FibonacciTree<T>): void
    {
        let tempHeap = this.GetEmptyHeap();
        tempHeap.root = new FibonacciHeapNode<T>(obj);
        tempHeap.last = tempHeap.root;
        tempHeap.min = tempHeap.root;
        tempHeap.comparator = this.comparator;
        tempHeap.comparatorFunction = this.comparatorFunction;

        this.Merge(tempHeap);
    }

    //--------------------------------------------------
    //----------VALUES----------------------------------
    //--------------------------------------------------
    protected Value(): T
    {
        if (this.min == null)
            return null;
        return this.min.tree.Key();
    }

    protected DeleteValue(): void
    {
        //Nulls
        if (this.min == null)
            return;

        //Heaps to merge
        let heapsToMerge = this.min.tree.DismantleExtract(); 

        //Relink root
        if (this.min == this.root)
            this.root = this.min.next;
        else
            this.min.previous.next = this.min.next;

        //Relink last
        if (this.min == this.last)
            this.last = this.min.previous;
        else
            this.min.next.previous = this.min.previous;

        //Merge new heaps
        for (let i = 0; i < heapsToMerge.length; i++)
            this.MergeTree(heapsToMerge[i]);

        //Change count
        this.count -= 1;

        //Consolidate
        this.Consolidate();
    }

    protected ExtractValue(): T
    {
        let res = this.Value();
        this.DeleteValue();
        return res;
    }

    protected InsertValue(item: T): void
    {
        let object = this;

        //Create new heap with 1 tree
        let newHeap = this.GetEmptyHeap();
        newHeap.comparator = this.comparator;
        newHeap.comparatorFunction = this.comparatorFunction;
        newHeap.count = 1;
        newHeap.root = new FibonacciHeapNode(new FibonacciTree(item, function (a: T, b: T): number
        {
            return object.ComparatorWrapper(a, b);
        }));
        newHeap.min = newHeap.root;
        newHeap.last = newHeap.root;

        //Merge that tree
        this.Merge(newHeap);
    }

    protected ChangeValue(newKey: T): void
    {
        if (this.min == null)
            return;
        this.min.tree.ChangeKey(newKey);
        this.FindNewMinUpdateLastSetPrevs();
    }

    //--------------------------------------------------
    //----------CONSOLIDATION---------------------------
    //--------------------------------------------------
    /**
     * Manages consolidation of this heap so it doesn't mutate into a list.
     * */
    private Consolidate(): void
    {
        //Nulls
        if (this.root == null)
        {
            this.FindNewMinUpdateLastSetPrevs();
            return;
        }
            
        let nodesByOrder: FibonacciHeapNode<T>[][] = [];

        //Put nodes by order into an array
        let curr = this.root;
        while (curr != null)
        {
            if (typeof nodesByOrder[curr.tree.Order()] == "undefined")
                nodesByOrder[curr.tree.Order()] = [];

            nodesByOrder[curr.tree.Order()].push(curr);

            //Move
            curr = curr.next;
        }

        //Make the array defined
        for (let i = 0; i < nodesByOrder.length; i++)
            if (typeof nodesByOrder[i] == "undefined")
                nodesByOrder[i] = [];

        //Iterate the array and do the merging
        for (let i = 0; i < nodesByOrder.length; i++)
        {
            //Do the merging
            while (nodesByOrder[i].length >= 2)
            {
                let node1 = nodesByOrder[i].pop();
                let node2 = nodesByOrder[i].pop();
                node1.tree.Merge(node2.tree);
                if (typeof nodesByOrder[i + 1] == "undefined")
                    nodesByOrder[i + 1] = [];
                nodesByOrder[i + 1].push(node1);
            }

        }
        
        //Build the list again
        let nodesArray: FibonacciHeapNode<T>[] = [];
        for (let i = 0; i < nodesByOrder.length; i++)
        {
            if (nodesByOrder[i].length > 0)
                nodesArray.push(nodesByOrder[i][0]);
        } 

        //Fix "next" attributes
        for (let i = 0; i < nodesArray.length - 1; i++)
            nodesArray[i].next = nodesArray[i + 1];

        nodesArray[nodesArray.length - 1].next = null;
        this.root = nodesArray[0];

        //Find new min and update stuff
        this.FindNewMinUpdateLastSetPrevs();
    }

    /**
     * Finds new minimum.
     * Finds last node.
     * Corrects "previous" property.
     * */
    private FindNewMinUpdateLastSetPrevs(): void
    {
        //Nulls
        if (this.root == null)
        {
            this.min = null;
            this.last = null;
            return;
        }

        //Find min
        let res = this.root;
        let curr = this.root;
        let prev = null;
        while (curr != null)
        {
            //Check new min
            if (this.ComparatorWrapper(curr.tree.Key(), res.tree.Key()) == -1)
                res = curr;

            //Set prev
            curr.previous = prev;

            //Move
            prev = curr;
            curr = curr.next;
        }

        //Set new min
        this.min = res;

        //Set new last (because we can)
        this.last = prev;
    }

    //--------------------------------------------------
    //----------CLONE-----------------------------------
    //--------------------------------------------------
    protected abstract GetEmptyHeap(): FibonacciHeap<T>;

    protected CloneHeap(): FibonacciHeap<T> 
    {
        let resHeap = this.GetEmptyHeap();
        resHeap.comparator = this.comparator.Clone();
        resHeap.comparatorFunction = this.comparatorFunction;
        resHeap.count = this.count;
        resHeap.root = this.CloneHeapRec(this.root);
        resHeap.FindNewMinUpdateLastSetPrevs();

        return resHeap;
    }

    private CloneHeapRec(node: FibonacciHeapNode<T>, prev: FibonacciHeapNode<T> = null): FibonacciHeapNode<T>
    {
        if (node == null)
            return null;
        let res = node.Clone();
        res.previous = prev;
        res.next = this.CloneHeapRec(node.next, res);
        return res;
    }

    //--------------------------------------------------
    //----------OTHERS----------------------------------
    //--------------------------------------------------
    Clear(): void
    {
        this.root = null;
        this.min = null;
        this.last = null;
        this.count = 0;
    }
    Dispose(): void
    {
        this.comparator.Dispose();
        this.comparatorFunction = null;
        this.Clear();
    }
    Count(): number
    {
        return this.count;
    }
    IsEmpty(): boolean
    {
        return this.Count() == 0;
    }
    Build(items: T[]): void
    {
        this.Clear();
        for (let i = 0; i < items.length; i++)
            this.InsertValue(items[i]);
    }

}