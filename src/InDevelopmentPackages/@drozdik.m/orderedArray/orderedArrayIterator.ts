


//--------------------------------------------------
//----------ORDERED ARRAY ITERATOR------------------
//--------------------------------------------------
export class OrderedArrayIterator<T>
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    private array: T[] = [];
    private index: number = -1;

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    constructor(array: T[], index: number)
    {
        this.array = array;
        this.index = index;
    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------

    /**
    * Moves to a next value
    */
    Next()
    {
        this.index += 1;
    }

    /**
    * Moves to a previous element
    */
    Previous()
    {
        this.index -= 1;
    }

    /**
    * Moves to the first element
    */
    ToFirst()
    {
        this.index = 0;
    }

    /**
    * Moves to the last value
    */
    ToLast()
    {
        this.index = this.array.length - 1;
    }

    /**
    * Returns current value
    * @returns Value of current element
    */
    Value(): T
    {
        if (this.index < 0 || this.index >= this.array.length)
            return null;
        return this.array[this.index];
    }

    /**
    * Returns number of items in the iterator
    * @returns Number of items in the iterator
    */
    Size(): number
    {
        return this.array.length;
    }

    /**
    * Returns if iterator is out ouf bounds
    * @return True if iterator is out of bounds
    */
    IsAtEnd(): boolean
    {
        return (this.index < 0 || this.index >= this.array.length);
    }

    /**
     * Returns index currently saved in the iterator
     */
    Index(): number
    {
        return this.index;
    }
}