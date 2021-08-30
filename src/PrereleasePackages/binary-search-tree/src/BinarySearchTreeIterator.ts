import { IBidirectionalIterator } from "@drozdik.m/common-interfaces/IBidirectionalIterator";
import { BinarySearchTreeNode } from "./BinarySearchTreeNode";

export class BinarySearchTreeIterator<T> implements IBidirectionalIterator<T>
{
    
    //--------------------------------------------------
    //----------VARIABLE--------------------------------
    //-------------------------------------------------
    private current: BinarySearchTreeNode<T> = null;

    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    constructor(node: BinarySearchTreeNode<T>)
    {
        this.current = node;
    }

    //--------------------------------------------------
    //----------VALUE-----------------------------------
    //--------------------------------------------------
    Value(): T
    {
        if (!this.HasValue())
            return null;
        return this.current.value;

    }

    HasValue(): boolean
    {
        return this.current != null;
    }

    //--------------------------------------------------
    //----------MOVE------------------------------------
    //--------------------------------------------------
    Previous(): void
    {
        this.current = this.Predecessor(this.current);
    }
    
    Next(): void
    {
        this.current = this.Successor(this.current);
    }

    /**
     * Returns predecessor node to this node
     * @param node Current node
     */
    protected Predecessor(node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T>
    {
        //Node has left child
        if (node.left != null)
            return this.FindMaxRec(node.left);

        //Climb until pop from left
        let parentNode = node.parent;
        while (parentNode != null && node == parentNode.left)
        {
            node = parentNode;
            parentNode = parentNode.parent;
        }

        return parentNode;
    }

    /**
     * Returns successor node to this node
     * @param node Current node
     */
    protected Successor(node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T>
    {
        //Node has right child
        if (node.right != null)
            return this.FindMinRec(node.right);

        //Climb until pop from right
        let parentNode = node.parent;
        while (parentNode != null && node == parentNode.right)
        {
            node = parentNode;
            parentNode = parentNode.parent;
        }

        return parentNode;
    }

    //--------------------------------------------------
    //----------MIN-MAX---------------------------------
    //--------------------------------------------------
    protected FindMinRec(node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T>
    {
        //Node is null
        if (node == null)
            return null;

        //We are at the most left
        if (node.left == null)
            return node;

        //Go deeper 0===3 (lil joke heh)
        return this.FindMinRec(node.left);
    }

    protected FindMaxRec(node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T>
    {
        //Node is null
        if (node == null)
            return null;

        //We are at the most right
        if (node.right == null)
            return node;

        //Go deeper
        return this.FindMaxRec(node.right);
    }

    //--------------------------------------------------
    //----------OTHERS----------------------------------
    //--------------------------------------------------
    /**
    * Returns currently selected node. Do not use unless you know what you are doing!
    * @returns Current node
    */
    GetCurrentNode(): BinarySearchTreeNode<T>
    {
        return this.current;
    }
}