import { FibonacciHeap } from "./FibonacciHeap";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";
import { IMinHeap } from "@drozdik.m/common-interfaces/IMinHeap";
import { IMaxHeap } from "@drozdik.m/common-interfaces/IMaxHeap";


export class MinHeap<T> extends FibonacciHeap<T> implements IMinHeap<T>, IClonable<MinHeap<T>>
{
    protected ComparatorWrapper(a: T, b: T): number 
    {
        return this.comparator.Compare(a, b);
    }

    Insert(item: T): void
    {
        this.InsertValue(item);
    }

    DeleteMin(): void
    {
        this.DeleteValue();
    }

    Min(): T 
    {
        return this.Value();
    }

    ExtractMin(): T
    {
        return this.ExtractValue();
    }

    protected GetEmptyHeap(): FibonacciHeap<T>
    {
        let res = new MinHeap<T>();
        res.comparator = this.comparator;
        res.comparatorFunction = this.comparatorFunction;
        return res;
    }

    Clone(): MinHeap<T>
    {
        return <MinHeap<T>>(this.CloneHeap());
    }

    /**
     * Changes value of the key
     * @param newKey new key value
     */
    ChangeKey(newKey: T): void
    {
        this.ChangeValue(newKey);
    }

}


export class MaxHeap<T> extends FibonacciHeap<T> implements IMaxHeap<T>, IClonable<MaxHeap<T>>
{
    protected ComparatorWrapper(a: T, b: T): number 
    {
        let res = this.comparator.Compare(a, b);
        if (res == -1)
            return 1;
        else if (res == 1)
            return -1;
        return 0;
    }

    Insert(item: T): void
    {
        this.InsertValue(item);
    }

    DeleteMax(): void
    {
        this.DeleteValue();
    }

    Max(): T 
    {
        return this.Value();
    }

    ExtractMax(): T
    {
        return this.ExtractValue();
    }

    protected GetEmptyHeap(): FibonacciHeap<T>
    {
        let res = new MaxHeap<T>();
        res.comparator = this.comparator;
        res.comparatorFunction = this.comparatorFunction;
        return res;
    }

    Clone(): MaxHeap<T>
    {
        return <MaxHeap<T>>(this.CloneHeap());
    }

    /**
     * Changes value of the key
     * @param newKey new key value
     */
    ChangeKey(newKey: T): void
    {
        this.ChangeValue(newKey);
    }

}