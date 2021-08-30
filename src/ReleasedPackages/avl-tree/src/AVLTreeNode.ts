import { IClonable } from "@drozdik.m/common-interfaces/IClonable";

export class AVLTreeNode<T> implements IClonable<AVLTreeNode<T>>
{
    //--------------------------------------------------
    //----------VARIABLE--------------------------------
    //--------------------------------------------------
    //Nodes
    parent: AVLTreeNode<T> = null;
    left: AVLTreeNode<T> = null;
    right: AVLTreeNode<T> = null;

    //Values
    value: T;
    count: number = 1;
    depth: number = 1;
    sign: number = 0;

    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    constructor(value: T)
    {
        this.value = value;
        //this.Update();
    }

    //--------------------------------------------------
    //----------UPDATE----------------------------------
    //--------------------------------------------------
    Update(): void
    {
        this.UpdateCount();
        this.UpdateDepth();
        this.UpdateSign();
        this.UpdateChildrensParent();
    }

    //--------------------------------------------------
    //----------PARENT----------------------------------
    //--------------------------------------------------
    UpdateChildrensParent(): void
    {
        if (this.left != null)
            this.left.parent = this;
        if (this.right != null)
            this.right.parent = this;
    }

    //--------------------------------------------------
    //----------COUNT-----------------------------------
    //--------------------------------------------------
    /**
     * Returns number of nodes in this (sub)tree (including this one, thus minimum is 1)
     * */
    Count(): number
    {
        return this.count;
    }

    /**
     * Returns number of nodes in left subtree. Zero if left subtree is null.
     * */
    CountLeft(): number
    {
        return (this.left == null) ? 0 : this.left.Count();
    }

    /**
     * Returns number of nodes in right subtree. Zero if right subtree is null.
     * */
    CountRight(): number
    {
        return (this.right == null) ? 0 : this.right.Count();
    }

    /**
     * Updates count number from it's children
     * */
    UpdateCount(): void
    {
        this.count = this.CountLeft() + this.CountRight() + 1;
    }

    //--------------------------------------------------
    //----------DEPTH-----------------------------------
    //--------------------------------------------------
    /**
     * Returns depth of this nodes tree. Zero if no children.
     * */
    Depth(): number
    {
        return this.depth;
    }

    /**
     * Returns depth of left subtree. Zero if left subtree is null.
     * */
    DepthLeft(): number
    {
        return (this.left == null) ? 0 : this.left.depth;
    }

    /**
     * Returns depth of right subtree. Zero if right subtree is null.
     * */
    DepthRight(): number
    {
        return (this.right == null) ? 0 : this.right.depth;
    }

    /**
     * Updates depth number from it's children
     * */
    UpdateDepth(): void
    {
        let depthLeft = this.DepthLeft();
        let depthRight = this.DepthRight();

        let higherDepth = (depthLeft > depthRight) ? depthLeft : depthRight;

        this.depth = higherDepth + 1;
    }

    /**
     * Updates sign number from it's children
     * */
    UpdateSign(): void
    {
        this.sign = this.DepthRight() - this.DepthLeft();
    }

    //--------------------------------------------------
    //----------CLONE-----------------------------------
    //--------------------------------------------------
    Clone(): AVLTreeNode<T>
    {
        let res = new AVLTreeNode<T>(null);

        //IClonable
        if (this.value != null)
        {
            if (typeof (<any>this.value).Clone != "undefined")
                res.value = (<any>this.value).Clone();
            else
                res.value = this.value;
        }

        res.left = this.left;
        res.right = this.right;
        res.parent = this.parent;
        res.count = this.count;
        res.depth = this.depth;
        res.sign = this.sign;
        return res;
    }
}
