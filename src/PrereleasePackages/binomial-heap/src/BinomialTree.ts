import { BinomialTreeNode } from "./BinomialTreeNode";
import { IMergable } from "@drozdik.m/common-interfaces/IMergable";
import { IClearable } from "@drozdik.m/common-interfaces/IClearable";
import { ComparatorHandler } from "@drozdik.m/comparator-handler";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";

export class BinomialTree<T> implements IMergable<BinomialTree<T>>, IClearable, IClonable<BinomialTree<T>>
{
    //--------------------------------------------------
    //----------ATTRIBUTES------------------------------
    //--------------------------------------------------
    private root: BinomialTreeNode<T> = null;
    private order: number = 0;
    private comparator: ComparatorHandler<T>;

    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    /**
     * Creates new instance of a tree with order 1
     * @param value Root value
     * @param comparator Comparator function (for merging)
     */
    constructor(value: T, comparator: IComparator<T> = null)
    {
        this.root = new BinomialTreeNode<T>(value);
        this.comparator = new ComparatorHandler(comparator);
    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------

    /**
     * Returns key (root) value of this tree
     * */
    Key(): T
    {
        if (this.root == null)
            return null;
        return this.root.value;
    }

    /**
     * Returns order of this tree (number of root children)
     * */
    Order(): number
    {
        return this.order;
    }

    /**
     * Merges input tree into this tree. The inputted tree is destroyed in the process.
     * The input tree must be the same order as this tree.
     * @param obj Input tree
     */
    Merge(obj: BinomialTree<T>): void
    {
        //Check if both trees have the same order
        if (this.Order() != obj.Order())
            return;

        let parentTree: BinomialTree<T>;
        let childrenTree: BinomialTree<T>;
        let cmpRes = this.comparator.Compare(this.root.value, obj.root.value);

        //Get which tree will be the parent one
        if (cmpRes == -1 || cmpRes == 0)
        {
            parentTree = this;
            childrenTree = obj;
        }
        else
        {
            parentTree = obj;
            childrenTree = this;
        }

        //Redirect the parent root node references
        let parentTreeFormerChild = parentTree.root.child;
        parentTree.root.child = childrenTree.root;

        //Redirect the child root node references
        childrenTree.root.left = parentTreeFormerChild;
        childrenTree.root.parent = parentTree.root;

        //Update this trees root
        this.root = parentTree.root;

        //Clear the other tree
        obj.Clear();

        //Increase this trees order
        this.order += 1;
    }

    /**
     * Clear this tree.
     * */
    Clear(): void
    {
        this.root = null;
        this.order = -1;
    }

    /**
     * Return clone of this tree.
     * */
    Clone(): BinomialTree<T>
    {
        //New tree
        let resTree = new BinomialTree<T>(null);

        //Clone all properties
        resTree.root = this.CloneNodesRec(this.root);
        resTree.order = this.order;
        resTree.comparator = this.comparator.Clone();

        //Return result tree
        return resTree;
    }

    /**
     * Deletes the tree key and returns array of children binomial trees
     * */
    DismantleExtract(): BinomialTree<T>[]
    {
        //Order zero
        if (this.Order() == 0)
            return [];

       
        //Loop children
        let res: BinomialTree<T>[] = [];
        let current = this.root.child;
        let tempOrder = this.Order() - 1;
        while (current != null)
        {
            //Make res tree
            let resTree = new BinomialTree<T>(null);
            resTree.comparator = this.comparator;
            resTree.order = tempOrder;
            resTree.root = current;

            //Move
            current = current.left;
            tempOrder -= 1;

            //Change trees directions
            resTree.root.left = null;
            resTree.root.parent = null;

            //Save the res tree
            res.push(resTree);
        }

        //Clear this tree
        this.Clear();

        //Return reverse
        return res.reverse();
    }

    /**
     * Clone nodes (rec)
     * @param node Input node
     * @param parent Parent of inputted node
     */
    private CloneNodesRec(node: BinomialTreeNode<T>, parent: BinomialTreeNode<T> = null): BinomialTreeNode<T>
    {
        //Node is null
        if (node == null)
            return null;

        //Create new node and clone its neighbours
        let resNode = node.Clone();
        //let resNode = new BinomialTreeNode<T>(node.value);
        resNode.left = this.CloneNodesRec(resNode.left, parent);
        resNode.parent = parent;
        resNode.child = this.CloneNodesRec(resNode.child, resNode);

        //Return result node
        return resNode;
    }

    /**
     * Changes root key
     * @param newKey The new key
     */
    ChangeKey(newKey: T)
    {
        if (this.root == null)
            return;

        if (this.comparator.Compare(newKey, this.root.value) == -1)
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
    private BubbleDown(node: BinomialTreeNode<T>): void
    {
        if (node.child == null)
            return;

        //Find lowest child
        let swapNode = node.child;
        let curr: BinomialTreeNode<T> = node.child;
        while (curr != null)
        {
            if (this.comparator.Compare(curr.value, swapNode.value) == -1)
                swapNode = curr;

            curr = curr.left;
        }

        //Swap values if lowest child is lower
        if (this.comparator.Compare(node.value, swapNode.value) == 1)
        {
            let temp = node.value;
            node.value = swapNode.value;
            swapNode.value = temp;
            this.BubbleDown(swapNode);
        }

    }
}


