import { IClonable } from "@drozdik.m/common-interfaces/IClonable";

export class FibonacciTreeNode<T> implements IClonable<FibonacciTreeNode<T>>
{
    children: FibonacciTreeNode<T>[] = [];
    parent: FibonacciTreeNode<T> = null;
    value: T = null;

    constructor(value: T)
    {
        this.value = value;
    }

    Clone(): FibonacciTreeNode<T>
    {
        let res = new FibonacciTreeNode<T>(null);

        if (this.value != null)
        {
            if (typeof (<any>this.value).Clone != "undefined")
                res.value = (<any>this.value).Clone();
            else
                res.value = this.value;
        }

        res.parent = this.parent;
        for (let i = 0; i < this.children.length; i++)
            res.children.push(this.children[i]);
        return res;
    }

    Order(): number
    {
        return this.children.length;
    }
}