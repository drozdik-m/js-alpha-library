import { OrderedArrayIterator } from "./orderedArrayIterator";

//--------------------------------------------------
//----------ORDERED ARRAY---------------------------
//--------------------------------------------------
export class OrderedArray <T>
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    private array: T[] = [];
    private comparator: Function = this.DefaultComparator;

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    constructor(comparator: Function = null)
    {
        this.comparator = comparator;
        if (this.comparator == null)
            this.comparator = this.DefaultComparator;
    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------

    /**
     * Inserts an item into the array - O(n)
     * @param item Item to insert
     */
    Insert(item: T): void
    {
        //Check if item is already in
        if (this.BinarySearch(item) != -1)
            return;

        //Empty array
        if (this.array.length == 0)
        {
            this.array.push(item);
            return;
        }

        //Insert the item
        this.array.push(item);
        let insertedItemIndex = this.array.length - 1;

        //Loop until inserted item is at the first place
        while (insertedItemIndex != 0)
        {
            //Compare inserted and previous element
            if (this.comparator(this.array[insertedItemIndex - 1], this.array[insertedItemIndex]) > 0)
            {
                //Swap
                let temp = this.array[insertedItemIndex - 1];
                this.array[insertedItemIndex - 1] = this.array[insertedItemIndex];
                this.array[insertedItemIndex] = temp;
                insertedItemIndex -= 1;
            }
            //Inserted item is at its place
            else
            {
                break;
            }
        }

    }

    /**
     * Finds an item and returns iterator pointing to it. Returns null if not found. - O(log n)
     * @param item Item to find
     */
    Find(item: T): OrderedArrayIterator<T>
    {
        //Find item
        let findResult = this.BinarySearch(item);

        //Item not found
        if (findResult == -1)
            return null;

        //Item found, return iterator
        return new OrderedArrayIterator(this.array, findResult);
    }

    /**
     * Searches the array and returns position of searched element. Return -1 if not found.
     */
    private BinarySearch(item: T): number
    {
        //Empty array
        if (this.array.length == 0)
            return -1;

        return this.BinarySearchRecursive(0, this.array.length - 1, item);
    }

    /**
     * Searches the array and returns position of searched element. Returns -1 if not found.
     */
    private BinarySearchRecursive(from: number, to: number, searchedItem: T): number
    {
        //Is there a space for searching?
        if (to >= from)
        {
            let mid = Math.floor(from + (to - from) / 2);

            //Check if the element is in the middle 
            if (this.comparator(this.array[mid], searchedItem) == 0)
                return mid;

            //If element is smaller than mid, search the left subarray
            if (this.comparator(this.array[mid], searchedItem) > 0)
                return this.BinarySearchRecursive(from, mid - 1, searchedItem);

            //If element is higher than mid, search the right subarray
            return this.BinarySearchRecursive(mid + 1, to, searchedItem);
        }

        //Element not found
        return -1;
    }

    /**
    * Returs iterator at first position - O(1)
    */
    Begin(): OrderedArrayIterator<T>
    {
        return new OrderedArrayIterator<T>(this.array, 0);
    }
    /**
    * Returns iterator at last position - O(1)
    */
    End(): OrderedArrayIterator<T>
    {
        return new OrderedArrayIterator<T>(this.array, this.array.length - 1);
    }

    /**
     * Removes a node - O(1)
     * @param iterator Target node
     */
    Remove(iterator: OrderedArrayIterator<T>)
    {
        //Exception
        if (iterator.IsAtEnd())
        {
            console.error("OrderedArray.Remove(...) - iterator is at the end");
            return;
        }

        //Remove the item
        this.array.removeIndex(iterator.Index());
    }

    /**
    * Checks is array is empty - O(1)
    * @returns True if array is empty
    */
    Empty(): boolean
    {
        return this.array.length === 0;
    }

    /**
    * Removes all elements - O(1)
    */
    Clear()
    {
        this.array = [];
    }

    /**
    * Returns number of elements in the array
    * @returns Number of elements in the array
    */
    Size(): number
    {
        return this.array.length;
    }

    /**
     * Default comparator function
     * @param a Item #1
     * @param b Item #2
     */
    private DefaultComparator(a: any, b: any): number
    {
        if (a > b)
            return 1;
        if (a < b)
            return -1;
        return 0;
    }

    /**
    * Debug functions that prints whole array - O(n)
    */
    Print() {

        //Empty array
        if (this.array.length === 0)
        {
            console.log("---List empty---");
            return;
        }

        //Print elements
        console.log("------------------");

        for (let i = 0; i < this.array.length; i++)
            console.log(`[${i}] - ${this.array[i]}`);    
        console.log("------------------");
    }
}
