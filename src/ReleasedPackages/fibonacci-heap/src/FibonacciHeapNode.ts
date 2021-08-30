import { FibonacciTree } from "./FibonacciTree";
import { IClearable } from "@drozdik.m/common-interfaces/IClearable";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";


export class FibonacciHeapNode<T> implements IClearable, IClonable<FibonacciHeapNode<T>>
{
    next: FibonacciHeapNode<T> = null;
    previous: FibonacciHeapNode<T> = null;
    tree: FibonacciTree<T> = null;

    constructor(tree: FibonacciTree<T>)
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
        this.previous = null;
    }

    Clone(): FibonacciHeapNode<T>
    {
        let res = new FibonacciHeapNode(this.tree.Clone());
        res.next = this.next;
        res.previous = this.previous;
        return res;
    }
}