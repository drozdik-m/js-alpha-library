import { BinomialTree } from "@drozdik.m/binomial-heap/src/BinomialTree";
import { IMergable } from "@drozdik.m/common-interfaces/IMergable";
import { IClearable } from "@drozdik.m/common-interfaces/IClearable";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";


export class BinomialHeapTreeNode<T> implements IClearable, IClonable<BinomialHeapTreeNode<T>>
{
    next: BinomialHeapTreeNode<T> = null;
    tree: BinomialTree<T> = null;

    constructor(tree: BinomialTree<T>)
    {
        this.tree = tree;
    }

    Order(): number
    {
        return this.tree.Order();
    }

    Clear(): void
    {
        this.tree = null;
        this.next = null;
    }

    Clone(): BinomialHeapTreeNode<T>
    {
        let res = new BinomialHeapTreeNode(this.tree.Clone());
        res.next = this.next;
        return res;
    }
}