exports.__esModule = true;
//--------------------------------------------------
//----------ORDERED ARRAY ITERATOR------------------
//--------------------------------------------------
var OrderedArrayIterator = /** @class */ (function () {
    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    function OrderedArrayIterator(array, index) {
        //--------------------------------------------------
        //----------VARIABLES-------------------------------
        //--------------------------------------------------
        this.array = [];
        this.index = -1;
        this.array = array;
        this.index = index;
    }
    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------
    /**
    * Moves to a next value
    */
    OrderedArrayIterator.prototype.Next = function () {
        this.index += 1;
    };
    /**
    * Moves to a previous element
    */
    OrderedArrayIterator.prototype.Previous = function () {
        this.index -= 1;
    };
    /**
    * Moves to the first element
    */
    OrderedArrayIterator.prototype.ToFirst = function () {
        this.index = 0;
    };
    /**
    * Moves to the last value
    */
    OrderedArrayIterator.prototype.ToLast = function () {
        this.index = this.array.length - 1;
    };
    /**
    * Returns current value
    * @returns Value of current element
    */
    OrderedArrayIterator.prototype.Value = function () {
        if (this.index < 0 || this.index >= this.array.length)
            return null;
        return this.array[this.index];
    };
    /**
    * Returns number of items in the iterator
    * @returns Number of items in the iterator
    */
    OrderedArrayIterator.prototype.Size = function () {
        return this.array.length;
    };
    /**
    * Returns if iterator is out ouf bounds
    * @return True if iterator is out of bounds
    */
    OrderedArrayIterator.prototype.IsAtEnd = function () {
        return (this.index < 0 || this.index >= this.array.length);
    };
    /**
     * Returns index currently saved in the iterator
     */
    OrderedArrayIterator.prototype.Index = function () {
        return this.index;
    };
    return OrderedArrayIterator;
}());
exports.OrderedArrayIterator = OrderedArrayIterator;
