exports.__esModule = true;
var orderedArrayIterator_1 = require("./orderedArrayIterator");
//--------------------------------------------------
//----------ORDERED ARRAY---------------------------
//--------------------------------------------------
var OrderedArray = /** @class */ (function () {
    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    function OrderedArray(comparator) {
        if (comparator === void 0) { comparator = null; }
        //--------------------------------------------------
        //----------VARIABLES-------------------------------
        //--------------------------------------------------
        this.array = [];
        this.comparator = this.DefaultComparator;
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
    OrderedArray.prototype.Insert = function (item) {
        //Check if item is already in
        if (this.BinarySearch(item) != -1)
            return;
        //Empty array
        if (this.array.length == 0) {
            this.array.push(item);
            return;
        }
        //Insert the item
        this.array.push(item);
        var insertedItemIndex = this.array.length - 1;
        //Loop until inserted item is at the first place
        while (insertedItemIndex != 0) {
            //Compare inserted and previous element
            if (this.comparator(this.array[insertedItemIndex - 1], this.array[insertedItemIndex]) > 0) {
                //Swap
                var temp = this.array[insertedItemIndex - 1];
                this.array[insertedItemIndex - 1] = this.array[insertedItemIndex];
                this.array[insertedItemIndex] = temp;
                insertedItemIndex -= 1;
            }
            //Inserted item is at its place
            else {
                break;
            }
        }
    };
    /**
     * Finds an item and returns iterator pointing to it. Returns null if not found. - O(log n)
     * @param item Item to find
     */
    OrderedArray.prototype.Find = function (item) {
        //Find item
        var findResult = this.BinarySearch(item);
        //Item not found
        if (findResult == -1)
            return null;
        //Item found, return iterator
        return new orderedArrayIterator_1.OrderedArrayIterator(this.array, findResult);
    };
    /**
     * Searches the array and returns position of searched element. Return -1 if not found.
     */
    OrderedArray.prototype.BinarySearch = function (item) {
        //Empty array
        if (this.array.length == 0)
            return -1;
        return this.BinarySearchRecursive(0, this.array.length - 1, item);
    };
    /**
     * Searches the array and returns position of searched element. Returns -1 if not found.
     */
    OrderedArray.prototype.BinarySearchRecursive = function (from, to, searchedItem) {
        //Is there a space for searching?
        if (to >= from) {
            var mid = Math.floor(from + (to - from) / 2);
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
    };
    /**
    * Returs iterator at first position - O(1)
    */
    OrderedArray.prototype.Begin = function () {
        return new orderedArrayIterator_1.OrderedArrayIterator(this.array, 0);
    };
    /**
    * Returns iterator at last position - O(1)
    */
    OrderedArray.prototype.End = function () {
        return new orderedArrayIterator_1.OrderedArrayIterator(this.array, this.array.length - 1);
    };
    /**
     * Removes a node - O(1)
     * @param iterator Target node
     */
    OrderedArray.prototype.Remove = function (iterator) {
        //Exception
        if (iterator.IsAtEnd()) {
            console.error("OrderedArray.Remove(...) - iterator is at the end");
            return;
        }
        //Remove the item
        this.array.removeIndex(iterator.Index());
    };
    /**
    * Checks is array is empty - O(1)
    * @returns True if array is empty
    */
    OrderedArray.prototype.Empty = function () {
        return this.array.length === 0;
    };
    /**
    * Removes all elements - O(1)
    */
    OrderedArray.prototype.Clear = function () {
        this.array = [];
    };
    /**
    * Returns number of elements in the array
    * @returns Number of elements in the array
    */
    OrderedArray.prototype.Size = function () {
        return this.array.length;
    };
    /**
     * Default comparator function
     * @param a Item #1
     * @param b Item #2
     */
    OrderedArray.prototype.DefaultComparator = function (a, b) {
        if (a > b)
            return 1;
        if (a < b)
            return -1;
        return 0;
    };
    /**
    * Debug functions that prints whole array - O(n)
    */
    OrderedArray.prototype.Print = function () {
        //Empty array
        if (this.array.length === 0) {
            console.log("---List empty---");
            return;
        }
        //Print elements
        console.log("------------------");
        for (var i = 0; i < this.array.length; i++)
            console.log("[" + i + "] - " + this.array[i]);
        console.log("------------------");
    };
    return OrderedArray;
}());
exports.OrderedArray = OrderedArray;
