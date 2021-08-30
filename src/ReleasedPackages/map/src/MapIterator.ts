import { IBidirectionalIterator } from "@drozdik.m/common-interfaces/IBidirectionalIterator";
import { KeyValuePair } from "@drozdik.m/pair/dist/KeyValuePair";
import { AVLTreeIterator } from "@drozdik.m/avl-tree/dist/src/AVLTreeIterator";

export class MapIterator<K, V> implements IBidirectionalIterator <KeyValuePair<K, V>>
{
    

    //--------------------------------------------------
    //----------VARIABLE--------------------------------
    //-------------------------------------------------
    private iterator: AVLTreeIterator<KeyValuePair<K, V>> = null;

    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    constructor(iterator: AVLTreeIterator<KeyValuePair<K, V>>)
    {
        this.iterator = iterator;
    }

    //--------------------------------------------------
    //----------VALUE-----------------------------------
    //--------------------------------------------------
    /**
     * Returns current pair
     * */
    Pair(): KeyValuePair<K, V>
    {
        return this.iterator.Value();
    }

    Value(): KeyValuePair<K, V>
    {
        if (!this.HasValue())
            return null;
        return this.iterator.Value();
    }

    PairValue(): V
    {
        if (!this.HasValue())
            return null;
        return this.iterator.Value().Value();
    }

    PairKey(): K
    {
        if (!this.HasValue())
            return null;
        return this.iterator.Value().Key();
    }

    HasValue(): boolean
    {
        return this.iterator.HasValue();
    }

    //--------------------------------------------------
    //----------MOVE------------------------------------
    //--------------------------------------------------
    Previous(): void
    {
        this.iterator.Previous();
    }

    Next(): void
    {
        this.iterator.Next();
    }

    //--------------------------------------------------
    //----------ITERATOR--------------------------------
    //--------------------------------------------------
    /**
     * Returns currently used AVL Tree iterator
     * */
    AVLTreeIterator(): AVLTreeIterator<KeyValuePair<K, V>>
    {
        return this.iterator;
    }
}