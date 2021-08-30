import { RBTree } from "./rbtree";
import { Definition } from "../definition/definition";


//--------------------------------------------------
//----------MAP ITERATOR----------------------------
//--------------------------------------------------
export class MapIterator<T, E>
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    private rbtreeIterator: RBTree.RedBlackTreeIterator = null;

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    constructor(rbtreeIterator: RBTree.RedBlackTreeIterator)
    {
        this.rbtreeIterator = rbtreeIterator;
    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------
    /**
    * Moves iterator to the next node - O(1)
    */
    Next()
    {
        this.rbtreeIterator.next();
    }
    /**
    * Moves iterator to the previous node - O(1)
    */
    Previous()
    {
        this.rbtreeIterator.prev();
    }

    /**
    * Returns key of current node - O(1)
    * @returns Key of current node
    */
    Key(): T
    {
        if (Definition.IsUndefined(this.rbtreeIterator.key))
            return null;
        return this.rbtreeIterator.key;
    }

    /**
    * Returns value of current node - O(1)
    * @returns Value of current node
    */
    Value(): E
    {
        if (Definition.IsUndefined(this.rbtreeIterator.value))
            return null;
        return this.rbtreeIterator.value;
    }

    /**
    * Checks if iterator is at the end - O(1)
    * @returns True if iterator is at the end
    */
    IsAtEnd(): boolean
    {
        return this.rbtreeIterator.node === null;
    }

    /**
    * Returns currently selected node. For developers only! - O(1)
    */
    GetCurrentNode(): RBTree.RBNode
    {
        return this.rbtreeIterator.node;
    }
}