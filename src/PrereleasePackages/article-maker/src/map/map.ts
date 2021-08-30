import { MapIterator } from "./mapIterator";
import { ValuePair } from "@drozdik.m/pair";
import { RBTree } from "./rbtree";
import { Definition } from "../definition/definition";

//--------------------------------------------------
//----------MAP-------------------------------------
//--------------------------------------------------
export class Map<T, E>
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    size: number = 0;
    rbtree: RBTree.RedBlackTree;
    compareFunction: Function;

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    /**
     * Creates new instance of Map
     * @param compareFunction Function with parameters "a" an "b", that returns zero if a == b, positive number if a > b and negative number if a < b
     * 
     */
    constructor(compareFunction: Function = null)
    {
        //Set default compare function as this.DefaultCompare
        if (compareFunction === null)
            this.compareFunction = this.DefaultCompare;
        else
            this.compareFunction = compareFunction;

        //Create new rbtree instance
        this.rbtree = RBTree.createRBTree(this.compareFunction);
    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------
    /**
    * Tells if map is empty or not - O(1)
    * @returns True if map is empty
    */
    Empty(): boolean
    {
        return this.rbtree.length === 0;
    }

    /**
    * Returns number of element in map - O(1)
    * @returns Number of elements in map
    */
    Size(): number
    {
        return this.rbtree.length;
    }

    /**
    * Clears the map - O(1)
    */
    Clear()
    {
        this.rbtree = RBTree.createRBTree(this.compareFunction);
    }

    /**
     * Inserts new value into the map - O(log n)
     * @param key Key of the value
     * @param value The value
     */
    Insert(key: T, value: E)
    {
        this.rbtree = this.rbtree.insert(key, value);
    }

    /**
     * Inserts new value - O(log n)
     * @param pair Structure with two values, where Pair.first is key and Pair.second is the value
     */
    InsertPair(pair: ValuePair<T, E>)
    {
        this.rbtree = this.rbtree.insert(pair.first, pair.second);
    }

    /**
     * Finds node with a key - O(log n)
     * @param key Search key
     * @returns Iterator pointing to the retult node
     */
    Find(key: T): MapIterator<T, E>
    {
        let findSearch = this.rbtree.find(key);
        if (Definition.IsUndefined(findSearch.key))
            return null;
        return new MapIterator<T, E>(findSearch);
    }
    /**
     * Removes an element - O(1)
     * @param iterator Iterator, that points to removed element
     */
    Remove(iterator: MapIterator<T, E>)
    {
        this.rbtree = this.rbtree.remove(iterator.Key());
    }

    /**
     * Changes value of selected node - O(1)
     * @param value New value
     * @param
     */
    Update(iterator: MapIterator<T, E>, value: E)
    {
        iterator.GetCurrentNode().value = value;
    }

    /**
    * Returns iterator pointing to the first value - O(1)
    * @returns Iterator pointing to the first value
    */
    Begin(): MapIterator<T, E>
    {
        return new MapIterator<T, E>(this.rbtree.begin);
    }
    /**
    * Returns iterator pointing to the last value - O(1)
    * @returns Iterator pointing to the last value
    */
    End(): MapIterator<T, E>
    {
        return new MapIterator<T, E>(this.rbtree.end);
    } 

    /**
     * Default compare function
     * @param a Parameter 1
     * @param b Parameter 2
     */
    private DefaultCompare(a: any, b: any): number
    {
        if (a > b)
            return 1;
        if (a < b)
            return -1;
        return 0;
    }

    /**
    * Debug function that prints content of the map into console
    */
    Print()
    {
        //Empty map
        if (this.Size() == 0)
        {
            console.log("---Map is empty---");
            return;
        }

        //Not empty map
        console.log("---Map print begin---");
        for (let item = this.Begin(); !item.IsAtEnd(); item.Next())
            console.log(`Key: ${item.Key()}, Value: ${item.Value()}`);
        console.log("---Map print end---");
    }
}
