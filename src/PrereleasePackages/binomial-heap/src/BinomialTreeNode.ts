import { IClonable } from "@drozdik.m/common-interfaces/IClonable";

export class BinomialTreeNode<T> implements IClonable<BinomialTreeNode<T>>
{
    //--------------------------------------------------
    //----------ATTRIBUTES------------------------------
    //--------------------------------------------------
    parent: BinomialTreeNode<T> = null;
    left: BinomialTreeNode<T> = null;
    child: BinomialTreeNode<T> = null;
    value: T;


    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    constructor(value: T)
    {
        this.value = value;
    }

    Clone(): BinomialTreeNode<T>
    {
        let res = new BinomialTreeNode(null);

        if (this.value != null)
        {
            if (typeof (<any>this.value).Clone != "undefined")
                res.value = (<any>this.value).Clone();
            else
                res.value = this.value;
        }

        res.parent = this.parent;
        res.left = this.left;
        res.child = this.child;
        return res;
    }
}

