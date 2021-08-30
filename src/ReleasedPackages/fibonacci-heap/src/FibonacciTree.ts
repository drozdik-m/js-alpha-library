import { FibonacciTreeNode } from "./FibonacciTreeNode";
import { IMergable } from "@drozdik.m/common-interfaces/IMergable";
import { IClearable } from "@drozdik.m/common-interfaces/IClearable";
import { ComparatorHandler } from "@drozdik.m/comparator-handler";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";

export class FibonacciTree<T> implements IMergable<FibonacciTree<T>>, IClearable, IClonable<FibonacciTree<T>>
{
    
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    private root: FibonacciTreeNode<T> = null;
    private comparator: ComparatorHandler<T> = null;

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    constructor(rootValue: T, comparator: IComparator<T> = null)
    {
        this.root = new FibonacciTreeNode<T>(rootValue);
        this.comparator = new ComparatorHandler(comparator);
    }

    //--------------------------------------------------
    //---------CLONE------------------------------------
    //--------------------------------------------------
    Clone(): FibonacciTree<T>
    {
        let res = new FibonacciTree(null);
        res.comparator = this.comparator.Clone();
        res.root = this.CloneRec(this.root);
        return res;
    }

    private CloneRec(node: FibonacciTreeNode<T>, parent: FibonacciTreeNode<T> = null): FibonacciTreeNode<T>
    {
        if (node == null)
            return null;

        let res = node.Clone();
        res.parent = parent;
        for (let i = 0; i < res.children.length; i++)
            res.children[i] = this.CloneRec(res.children[i], res);

        return res;
    }

    //--------------------------------------------------
    //---------MERGE------------------------------------
    //--------------------------------------------------
    Merge(obj: FibonacciTree<T>): void
    {
        //Check order
        if (this.Order() != obj.Order())
            return;

        let newRoot: FibonacciTreeNode<T> = null;
        let newChild: FibonacciTreeNode<T> = null;

        //The other objects root is the new root
        if (this.comparator.Compare(this.Key(), obj.Key()) == 1)
        {
            newRoot = obj.root;
            newChild = this.root;
        }
        //This objects root is the new root
        else
        {
            newRoot = this.root;
            newChild = obj.root;
        }

        //Do merge operations
        newRoot.children.push(newChild);
        newChild.parent = newRoot;
        this.root = newRoot;

        //Clear the other object
        obj.Clear();
    }

    //--------------------------------------------------
    //---------KEY--------------------------------------
    //--------------------------------------------------
    /**
     * Returns key of this tree
     * */
    Key(): T
    {
        if (this.root == null)
            return null;
        return this.root.value;
    }

    /**
     * Deletes the tree key and returns array of children fibonacci trees
     * */
    DismantleExtract(): FibonacciTree<T>[]
    {
        let nodeTrees = this.root.children;
        let resArr = [];

        for (let i = 0; i < nodeTrees.length; i++)
        {
            let newTree = new FibonacciTree<T>(null);
            newTree.root = nodeTrees[i];
            newTree.root.parent = null;
            newTree.comparator = this.comparator;

            resArr.push(newTree);
        }

        return resArr;
        
    }

    /**
     * Changes root key
     * @param newKey The new key
     */
    ChangeKey(newKey: T)
    {
        if (this.root == null)
            return;

        //Value changed and no bubble down is needed
        if (this.comparator.Compare(this.Key(), newKey) == 1)
        {
            this.root.value = newKey;
            return;
        }

        this.root.value = newKey;
        this.BubbleDown(this.root);
    }

    /**
     * Bubbles down a node
     * @param node Node to bubble
     */
    private BubbleDown(node: FibonacciTreeNode<T>): void
    {
        if (node == null)
            return;
        if (node.Order() == 0)
            return;

        let lowestNode = node.children[0];
        for (let i = 0; i < node.children.length; i++)
        {
            if (this.comparator.Compare(node.children[i].value, lowestNode.value) == -1)
                lowestNode = node.children[i];
        }

        //Should we swap?
        if (this.comparator.Compare(node.value, lowestNode.value) == 1)
        {
            let temp = node.value;
            node.value = lowestNode.value;
            lowestNode.value = temp;
            this.BubbleDown(lowestNode);
        }
    }

    //--------------------------------------------------
    //---------OTHERS-----------------------------------
    //--------------------------------------------------
    //Returns order of this fibonacci tree
    Order(): number
    {
        return this.root.Order();
    }

    Clear(): void
    {
        this.root = null;
    }

}
