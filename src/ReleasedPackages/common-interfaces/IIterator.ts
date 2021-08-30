

export interface IIterator <T>
{
    /**
     * Returns current nodes value.
     * */
    Value(): T;

    /**
     * Returns true if iterator has any valid value (is not out of bounds).
     * */
    HasValue(): boolean;

    /**
     * Moves the iterator to the next value.
     * */
    Next(): void;
}