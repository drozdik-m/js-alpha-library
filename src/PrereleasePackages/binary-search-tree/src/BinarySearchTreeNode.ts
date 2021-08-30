import { ICountable } from "@drozdik.m/common-interfaces/ICountable";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";


export class BinarySearchTreeNode<T> implements IClonable<BinarySearchTreeNode<T>>
{
    //--------------------------------------------------
    //----------VARIABLE--------------------------------
    //--------------------------------------------------
    //Nodes
    parent: BinarySearchTreeNode<T> = null;
    left: BinarySearchTreeNode<T> = null;
    right: BinarySearchTreeNode<T> = null;

    //Values
    value: T;
    count: number = 1;

    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    constructor(value: T)
    {
        this.value = value;
    }

    //--------------------------------------------------
    //----------UPDATE----------------------------------
    //--------------------------------------------------
    Update(): void
    {
        this.UpdateCount();
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
    //----------CLONE-----------------------------------
    //--------------------------------------------------
    Clone(): BinarySearchTreeNode<T>
    {
        let res = new BinarySearchTreeNode<T>(null);

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
        return res;
    }
}