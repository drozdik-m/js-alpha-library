
export interface IClonable<T>
{
    /**
     * Returns deep copy of the current object
     * */
    Clone(): T;
}