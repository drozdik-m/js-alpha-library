import { IIterableBidirectionaly } from "@drozdik.m/common-interfaces/IIterableBidirectionaly";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";
import { IContainer } from "@drozdik.m/common-interfaces/IContainer";
import { ICountable } from "@drozdik.m/common-interfaces/ICountable";
import { IClearable } from "@drozdik.m/common-interfaces/IClearable";
import { IDisposable } from "@drozdik.m/common-interfaces/IDisposable";
import { IBidirectionalySearchableContainer } from "@drozdik.m/common-interfaces/IBidirectionalySearchableContainer";
import { IRemovableContainerByIterator } from "@drozdik.m/common-interfaces/IRemovableContainerByIterator";
import { IUpdatableContainerByIterator } from "@drozdik.m/common-interfaces/IUpdatableContainerByIterator";
import { IRandomAccessibleIterable } from "@drozdik.m/common-interfaces/IRandomAccessibleIterable";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { IBuildable } from "@drozdik.m/common-interfaces/IBuildable";
import { AVLTree } from "@drozdik.m/avl-tree";
import { KeyValuePair } from "@drozdik.m/pair/dist/KeyValuePair";
import { MapIterator } from "./MapIterator";
import { ComparatorHandler } from "@drozdik.m/comparator-handler";

export class Map<K, V> implements IIterableBidirectionaly<KeyValuePair<K, V>>, IClonable<Map<K, V>>,
    ICountable, IClearable, IDisposable, IBidirectionalySearchableContainer<KeyValuePair<K, V>>, IRemovableContainerByIterator<KeyValuePair<K, V>>,
    IUpdatableContainerByIterator<KeyValuePair<K, V>>, IRandomAccessibleIterable<KeyValuePair<K, V>>, IBuildable<KeyValuePair<K, V>>
{
    
   

    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    private avlTree: AVLTree<KeyValuePair<K, V>> = null;
    //private keyValueComparator: IComparator<KeyValuePair<K, V>>;

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    /**
     * Creates new instance of the object.
     * @param items Initial items in the binary search tree.
     * @param comparator Key Comparator - It automatically detects IComparable classes.
     */
    constructor(items: KeyValuePair<K, V>[] = [], comparator: IComparator<K> = null)
    {
        let keyComp = new ComparatorHandler(comparator);
        let keyValueComparator: IComparator<KeyValuePair<K, V>> = function (item1, item2)
        {
            return keyComp.Compare(item1.Key(), item2.Key());
        };
        this.avlTree = new AVLTree(items, keyValueComparator);
    }

    //--------------------------------------------------
    //---------VALUE------------------------------------
    //--------------------------------------------------
    /**
     * Inserts new pair
     * @param item New pair
     */
    private InsertPair(item: KeyValuePair<K, V>): void
    {
        this.avlTree.Insert(item);
    }

    /**
     * Creates and inserts KeyValuePair based on inserted key and value
     * @param item
     */
    InsertValue(key: K, value: V): void
    {
        this.InsertPair(new KeyValuePair(key, value));
    }

    Insert(item: KeyValuePair<K, V>): void
    {
        this.InsertPair(item)
    }

    /**
     * Finds a pair by given key and returns its iterator
     * @param item
     */
    private FindPair(item: KeyValuePair<K, V>): MapIterator<K, V>
    {
        return new MapIterator<K, V>(this.avlTree.Find(item));
    }

    /**
     * Finds value by key
     * @param key Key
     */
    FindValue(key: K): MapIterator<K, V>
    {
        return new MapIterator<K, V>(this.avlTree.Find(new KeyValuePair(key, null)));
    }

    Find(item: KeyValuePair<K, V>): MapIterator<K, V>
    {
        return this.FindValue(item.Key())
    }

    /**
     * Removes a pair by given iterator
     * @param iterator Iterator
     */
    RemoveValueAt(iterator: MapIterator<K, V>): void
    {
        if (!iterator.HasValue())
            return;

        this.avlTree.RemoveAt(iterator.AVLTreeIterator());
    }

    RemoveAt(iterator: MapIterator<K, V>): void
    {
        this.RemoveValueAt(iterator)
    }

    Remove(item: KeyValuePair<K, V>): void
    {
        this.RemoveValue(item.Key())
    }

    /**
     * Removes a pair
     * @param item Pair to remove
     */
    private RemovePair(item: KeyValuePair<K, V>): void
    {
        this.avlTree.Remove(item);
    }

    /**
     * Removes a value by given key
     * @param key Key
     */
    RemoveValue(key: K): void
    {
        this.RemovePair(new KeyValuePair<K, V>(key, null));
    }

    /**
     * Updates pair at given position
     * @param newValue New pair
     * @param iterator Iterator
     */
    private UpdatePairAt(newValue: KeyValuePair<K, V>, iterator: MapIterator<K, V>): void
    {
        this.avlTree.UpdateAt(newValue, iterator.AVLTreeIterator());
    }

    /**
     * Sets new value on iterator position
     * @param newValue
     * @param iterator
     */
    UpdateValueAt(newValue: V, iterator: MapIterator<K, V>)
    {
        if (iterator.HasValue())
            iterator.Pair().SetValue(newValue);
    }

    UpdateAt(newValue: KeyValuePair<K, V>, iterator: MapIterator<K, V>): void
    {
        this.UpdateValueAt(newValue.Value(), iterator)
    }

    /**
     * Updates value at given key position
     * @param key Key
     * @param newValue New Value
     */
    UpdateValue(key: K, newValue: V): void
    {
        this.UpdateValueAt(newValue, this.FindValue(key));
    }

    Update(oldValue: KeyValuePair<K, V>, newValue: KeyValuePair<K, V>): void
    {
        this.UpdateValue(oldValue.Key(), newValue.Value())
    }

    //--------------------------------------------------
    //---------AT---------------------------------------
    //--------------------------------------------------
    At(index: number): KeyValuePair<K, V>
    {
        return this.AtIterator(index).Pair();
    }

    AtIterator(index: number): MapIterator<K, V>
    {
        return new MapIterator<K, V>(this.avlTree.AtIterator(index));
    }

    //--------------------------------------------------
    //---------MIN-MAX----------------------------------
    //--------------------------------------------------
    FindMin(): MapIterator<K, V>
    {
        return new MapIterator<K, V>(this.avlTree.FindMin());
    }

    FindMax(): MapIterator<K, V>
    {
        return new MapIterator<K, V>(this.avlTree.FindMax());
    }

    //--------------------------------------------------
    //---------CLEARS-----------------------------------
    //--------------------------------------------------
    Dispose(): void
    {
        this.avlTree.Dispose();
        this.avlTree = null;
    }
    Clear(): void
    {
        this.avlTree.Clear();
    }

    //--------------------------------------------------
    //---------ITERATOR---------------------------------
    //--------------------------------------------------
    First(): MapIterator<K, V>
    {
        return new MapIterator<K, V>(this.avlTree.First());
    }
    Last(): MapIterator<K, V>
    {
        return new MapIterator<K, V>(this.avlTree.Last());
    }

    //--------------------------------------------------
    //---------CLONE------------------------------------
    //--------------------------------------------------
    Clone(): Map<K, V>
    {
        let res = new Map<K, V>();
        res.avlTree = this.avlTree.Clone();
        //res.keyValueComparator = this.keyValueComparator;
        return res;
    }

    //--------------------------------------------------
    //---------OTHERS-----------------------------------
    //--------------------------------------------------
    Build(items: KeyValuePair<K, V>[]): void
    {
        this.avlTree.Build(items);
    }
    Count(): number
    {
        return this.avlTree.Count();
    }
    IsEmpty(): boolean
    {
        return this.avlTree.IsEmpty();
    }
}