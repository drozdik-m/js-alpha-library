
export interface IMaxHeap<T>
{
    /**
     * Inserts new item into the heap
     * */
    Insert(item: T): void;

    /**
     * Deletes maximum
     * */
    DeleteMax(): void;

    /**
     * Returns maximum
     * */
    Max(): T;

    /**
     * Deletes and return Max()
     * */
    ExtractMax(): T;
}

