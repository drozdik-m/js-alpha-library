

export interface IMergable<T>
{
    /**
     * Merges the input object into this object
     * @param obj The other object
     */
    Merge(obj: T): void;
}