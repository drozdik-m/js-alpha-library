import { IMinHeap } from "@drozdik.m/common-interfaces/IMinHeap";
import { IMaxHeap } from "@drozdik.m/common-interfaces/IMaxHeap";
import { BinaryHeap } from "./BinaryHeap";

export class MinHeap<T> extends BinaryHeap<T> implements IMinHeap<T>
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

    protected GetEmptyHeap(): MinHeap<T>
    {
        let res = new MinHeap<T>();
        res.comparator = this.comparator.Clone();
        return res;
    }

    Clone(): MinHeap<T>
    {
        return <MinHeap<T>>this.CloneHeap();
    }
}

export class MaxHeap<T> extends BinaryHeap<T> implements IMaxHeap<T>
{
    protected ComparatorWrapper(a: T, b: T): number
    {
        let res = this.comparator.Compare(a, b);
        if (res < 0)
            return 1;
        else if (res > 0)
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

    protected GetEmptyHeap(): MaxHeap<T>
    {
        let res = new MaxHeap<T>();
        res.comparator = this.comparator.Clone();
        return res;
    }

    Clone(): MaxHeap<T>
    {
        return <MaxHeap<T>>this.CloneHeap();
    }
}



