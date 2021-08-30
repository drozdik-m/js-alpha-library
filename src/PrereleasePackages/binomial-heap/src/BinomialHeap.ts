import { IClonable } from "@drozdik.m/common-interfaces/IClonable";
import { IMergable } from "@drozdik.m/common-interfaces/IMergable";
import { ICountable } from "@drozdik.m/common-interfaces/ICountable";
import { IBuildable } from "@drozdik.m/common-interfaces/IBuildable";
import { IDisposable } from "@drozdik.m/common-interfaces/IDisposable";
import { ComparatorHandler } from "@drozdik.m/comparator-handler";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { BinomialTree } from "./BinomialTree";
import { BinomialHeapTreeNode } from "./BinomialHeapTreeNode";

export abstract class BinomialHeap<T> implements IMergable<BinomialHeap<T>>, ICountable, IBuildable<T>, IDisposable
{
    //--------------------------------------------------
    //----------ATTRIBUTES------------------------------
    //--------------------------------------------------
    protected comparator: ComparatorHandler<T>;
    protected rootTree: BinomialHeapTreeNode<T> = null;
    protected count: number = 0;
    protected comparatorFunction: IComparator<T> = null;

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

    Merge(obj: BinomialHeap<T>): void 
    {
        //Count
        this.count += obj.count;

        //Nulls
        if (this.rootTree == null)
        {
            this.rootTree = obj.rootTree;
            obj.Clear();
            return;
        }
        else if (obj.rootTree == null)
            return;


        //Start merging
        this.MergeLoop(this.rootTree, obj.rootTree);

        //Clear the other tree
        obj.Clear();
    }

    /**
     * Manages merge process of two binomial heaps
     * @param a 1st binomial heap
     * @param b 2nd binomial heap
     */
    private MergeLoop(a: BinomialHeapTreeNode<T>, b: BinomialHeapTreeNode<T>): BinomialHeapTreeNode<T>
    {

        let res: BinomialHeapTreeNode<T> = null;
        let carry: BinomialTree<T> = null;

        while (!(a == null && b == null))
        {
            if (a == null || b == null)
            {
                let curr = (a == null) ? b : a;

                //NO CARRY
                if (carry == null)
                {
                    res = this.InsertIntoResHeapNode(res, curr);
                    a = (b = null);
                }
                //YES CARRY
                else
                {
                    //Carry and current tree are the same order
                    if (curr.Order() == carry.Order())
                    {
                        let tree1 = curr.tree;
                        tree1.Merge(carry);
                        carry = tree1;
                        (a == null) ? b = b.next : a = a.next;
                    }
                    //Insert carry into the blank spot
                    else
                    {
                        res = this.InsertIntoResHeapTree(res, carry);
                        carry = null;
                    }

                }
            }
            //NO CARRY
            else if (carry == null)
            {
                //Trees are the same order
                if (a.Order() == b.Order())
                {
                    let tree1 = a.tree;
                    let tree2 = b.tree;
                    a = a.next;
                    b = b.next;
                    tree1.Merge(tree2);
                    carry = tree1;
                }
                //"a" has lower order
                else if (a.Order() < b.Order())
                {
                    res = this.InsertIntoResHeapTree(res, a.tree);
                    a = a.next;
                }
                //"b" has lower order
                else if (b.Order() < a.Order())
                {
                    res = this.InsertIntoResHeapTree(res, b.tree);
                    b = b.next;
                }
            }

            //YES CARRY
            else
            {
                //Trees are the same order
                if (a.Order() == b.Order())
                {
                    res = this.InsertIntoResHeapTree(res, carry);
                    let tree1 = a.tree;
                    let tree2 = b.tree;
                    a = a.next;
                    b = b.next;
                    tree1.Merge(tree2);
                    carry = tree1;
                }
                //"a" has lower order
                else if (a.Order() < b.Order())
                {
                    let tree = a.tree;
                    a = a.next;
                    tree.Merge(carry);
                    carry = tree;
                }
                //"b" has lower order
                else if (b.Order() < a.Order())
                {
                    let tree = b.tree;
                    b = b.next;
                    tree.Merge(carry);
                    carry = tree;
                }
            }

        }

        //Some carry left
        if (carry != null)
            res = this.InsertIntoResHeapTree(res, carry);

        return res;
    }

    /**
     * Function for inserting into res node using only tree. Is checks nulls and moves the res to highest order.
     * @param res result
     * @param tree tree
     */
    private InsertIntoResHeapTree(res: BinomialHeapTreeNode<T>, tree: BinomialTree<T>): BinomialHeapTreeNode<T>
    {
        if (res == null)
            return this.rootTree = new BinomialHeapTreeNode<T>(tree);
        res.next = new BinomialHeapTreeNode<T>(tree);
        return res.next;
    }

    /**
     * Function for inserting into res node. Is checks nulls and moves the res to highest order.
     * @param res result
     * @param node node
     */
    private InsertIntoResHeapNode(res: BinomialHeapTreeNode<T>, node: BinomialHeapTreeNode<T>): BinomialHeapTreeNode<T>
    {
        if (res == null)
            return this.rootTree = node;
        res.next = node;
        return res.next;
    }

    //--------------------------------------------------
    //----------VALUES----------------------------------
    //--------------------------------------------------
    protected Value(): T
    {
        if (this.rootTree == null)
            return null;

        let current = this.rootTree;
        let res: T = this.rootTree.tree.Key();

        while (current != null)
        {
            //Check for res
            if (this.ComparatorWrapper(current.tree.Key(), res) == -1)
                res = current.tree.Key();
            //Move
            current = current.next;
        }

        return res;
    }

    protected DeleteValue(): void
    {
        //Value to delete
        let valueToDelete = this.Value();
        if (valueToDelete == null)
            return;

        this.count -= 1;

        //Search the heap to delete
        let res: BinomialHeapTreeNode<T> = null;
        let prev: BinomialHeapTreeNode<T> = null;
        let current = this.rootTree;

        //Find and delete target value
        while (current != null)
        {
            //Found the value
            if (current.tree.Key() == valueToDelete)
            {
                //Save the res
                res = current;

                //Disconnect the res
                if (prev != null)
                    prev.next = current.next;

                //This is the root
                if (this.rootTree == res)
                    this.rootTree = this.rootTree.next;

                //Break
                break;
            }

            //Move
            prev = current;
            current = current.next;
        }

        //Create new heap to merge
        let heapToMerge = this.GetEmptyHeap();
        
        let dismanteledTree = res.tree.DismantleExtract();
        let nodes: BinomialHeapTreeNode<T>[] = [];

        //Create and link nodes
        for (let i = 0; i < dismanteledTree.length; i++)
            nodes.push(new BinomialHeapTreeNode<T>(dismanteledTree[i]));
        for (let i = 0; i < dismanteledTree.length - 1; i++)
            nodes[i].next = nodes[i + 1];

        //Set root node
        if (nodes.length > 0)
            heapToMerge.rootTree = nodes[0];
        
        //Merge heaps
        this.Merge(heapToMerge);
    }

    protected ExtractValue(): T
    {
        let res = this.Value();
        this.DeleteValue();
        return res;
    }

    protected InsertValue(item: T): void
    {
        //Create new heap
        let insertHeap = this.GetEmptyHeap();
        //let treeToInsert = new BinomialTree<T>(item, this.comparatorFunction);
        let object = this;
        let treeToInsert = new BinomialTree<T>(item, function (a: T, b: T): number
        {
            return object.ComparatorWrapper(a, b);
        });
        insertHeap.rootTree = new BinomialHeapTreeNode<T>(treeToInsert);
        insertHeap.count = 1;

        //Merge it to this heap
        this.Merge(insertHeap);
    }

    protected ChangeValue(newKey: T): void
    {
        let value = this.Value();

        if (value == null)
            return;  

        let current = this.rootTree;
        while (current != null)
        {
            //Check for res
            if (this.ComparatorWrapper(current.tree.Key(), value) == 0)
            {
                current.tree.ChangeKey(newKey);
                break;
            }

            //Move
            current = current.next;
        }
    }
    //--------------------------------------------------
    //----------CLONE-----------------------------------
    //--------------------------------------------------
    protected abstract GetEmptyHeap(): BinomialHeap<T>;

    protected CloneHeap(): BinomialHeap<T> 
    {
        let res = this.GetEmptyHeap();
        res.comparator = this.comparator.Clone();
        res.comparatorFunction = this.comparatorFunction;
        res.count = this.count;
        res.rootTree = this.CloneRootTreeRec(this.rootTree);
        return res;
    }
    protected CloneRootTreeRec(node: BinomialHeapTreeNode<T> = null): BinomialHeapTreeNode<T>
    {
        if (node == null)
            return null;

        let res = node.Clone();
        res.next = this.CloneRootTreeRec(res.next);
        return res;
    }

    //--------------------------------------------------
    //----------OTHERS----------------------------------
    //--------------------------------------------------
    Build(items: T[]): void 
    {
        this.Clear();
        for (let i = 0; i < items.length; i++)
            this.InsertValue(items[i]);

    }

    Count(): number 
    {
        return this.count;
    }

    IsEmpty(): boolean 
    {
        return this.count == 0;
    }

    Clear(): void 
    {
        this.rootTree = null;
        this.count = 0;
    }

    Dispose(): void 
    {
        this.Clear();
        this.comparator.Dispose();
        this.comparator = null;
        this.comparatorFunction = null;
    }
}