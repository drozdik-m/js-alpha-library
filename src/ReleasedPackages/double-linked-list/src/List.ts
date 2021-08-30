import { ListNode } from "./ListNode";
import { ListIterator } from "./ListIterator";
import { ComparatorHandler } from "@drozdik.m/comparator-handler";
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


//--------------------------------------------------
//----------LIST------------------------------------
//--------------------------------------------------
export class List<T> implements IIterableBidirectionaly<T>, IClonable<List<T>>, IContainer<T>, IBuildable<T>,
    ICountable, IClearable, IDisposable, IBidirectionalySearchableContainer<T>, IRemovableContainerByIterator<T>,
    IUpdatableContainerByIterator<T>, IRandomAccessibleIterable<T>
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    private count: number = 0;
    private front: ListNode<T> = null;
    private back: ListNode<T> = null;
    private comparator: ComparatorHandler<T> = null;

    //(back)item---item---item---item(front)

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    /**
     * Creates new instance of List.
     * @param items Initial items in the List.
     * @param comparator Comparator for search functions. It automatically detects IComparable classes.
     */
    constructor(items: T[] = [], comparator: IComparator<T> = null)
    {
        for (let i = 0; i < items.length; i++)
            this.Insert(items[i]);

        this.comparator = new ComparatorHandler<T>(comparator);
    }

    //--------------------------------------------------
    //----------ITERATOR--------------------------------
    //--------------------------------------------------
    First(): ListIterator<T>
    {
        return new ListIterator<T>(this.back);
    }
    Last(): ListIterator<T>
    {
        return new ListIterator<T>(this.front);
    }

    //--------------------------------------------------
    //----------COUNT-----------------------------------
    //--------------------------------------------------
    Count(): number
    {
        return this.count;
    }
    IsEmpty(): boolean
    {
        return this.Count() == 0;
    }

    //--------------------------------------------------
    //----------CLEARS----------------------------------
    //--------------------------------------------------
    Dispose(): void
    {
        this.count = -1;
        this.front = null;
        this.back = null;
        this.comparator.Dispose();
    }
    Clear(): void
    {
        this.count = 0;
        this.front = null;
        this.back = null;
    }

    //--------------------------------------------------
    //----------INDEXES---------------------------------
    //--------------------------------------------------
    AtIterator(index: number): ListIterator<T>
    {
        let curr = this.back;
        for (let i = 0; i < index; i++)
        {
            //Return "not found"
            if (curr == null)
                return new ListIterator<T>(null);

            //Move
            curr = curr.next;
        }

        return new ListIterator<T>(curr);
    }
    At(index: number): T
    {
        let res = this.AtIterator(index);
        if (res == null)
            return null;
        return res.Value();
    }

    //--------------------------------------------------
    //----------CLONE-----------------------------------
    //--------------------------------------------------
    Clone(): List<T>
    {
        let resArr: T[] = [];
        for (let it = this.First(); it.HasValue(); it.Next())
        {
            if (it.Value() != null)
            {
                if (typeof (<any>it.Value()).Clone != "undefined")
                    resArr.push((<any>it.Value()).Clone());
                else
                    resArr.push(it.Value());
            }
            else
                resArr.push(null);
            
        }

        let res = new List<T>(resArr);
        res.comparator = this.comparator.Clone();

        return res;
    }

    //--------------------------------------------------
    //----------FIND------------------------------------
    //--------------------------------------------------
    Find(item: T): ListIterator<T>
    {
        for (let it = this.First(); it.HasValue(); it.Next())
        {
            if (this.comparator.Compare(it.Value(), item) == 0)
                return new ListIterator(it.GetCurrentNode());
        }

        return new ListIterator(null);
    }

    //--------------------------------------------------
    //----------UPDATE----------------------------------
    //--------------------------------------------------
    UpdateAt(newValue: T, iterator: ListIterator<T>): void
    {
        iterator.GetCurrentNode().value = newValue;
    }
    Update(oldValue: T, newValue: T): void
    {
        let it = this.Find(oldValue);

        if (it != null)
            it.GetCurrentNode().value = newValue;
    }

    //--------------------------------------------------
    //----------INSERT----------------------------------
    //--------------------------------------------------
    Insert(item: T): void
    {
        this.InsertFront(item);
    }

    /**
    * Adds first node - O(1)
    * @param value Value to add
    */
    private AddFirst(value: T)
    {
        //Create new node
        let newNode = new ListNode<T>(value);

        //Add it
        this.front = newNode;
        this.back = newNode;
        this.count++;
    }

    /**
     * Inserts a node after position selected by the iterator - O(1)
     * @param value Value to add
     * @param iterator Position iterator
     */
    InsertAfter(value: T, iterator: ListIterator<T>)
    {
        //Nulls
        if (iterator == null)
            return;
        let addAfterNode = iterator.GetCurrentNode();
        if (addAfterNode == null)
            return;

        //New nodes next
        let newNodesNext = null;
        if (addAfterNode.next != null)
            newNodesNext = addAfterNode.next;

        //New nodes previous
        let newNodesPrevious = addAfterNode;

        //New node
        let newNode = new ListNode(value, newNodesNext, newNodesPrevious);

        //Redirect pointers to the new node
        addAfterNode.next = newNode;
        if (newNodesNext != null)
            newNodesNext.previous = newNode;

        //Change "back" if new node is the last one
        if (newNode.next == null)
            this.front = newNode;
    }

    /**
     * Inserts a node before position selected by iterator - O(1)
     * @param value Value to add
     * @param iterator Position iterator
     */
    InsertBefore(value: T, iterator: ListIterator<T>)
    {
        //Nulls
        if (iterator == null)
            return;
        let addBeforeNode = iterator.GetCurrentNode();
        if (addBeforeNode == null)
            return;

        //New nodes next
        let newNodesNext = addBeforeNode;

        //New nodes previous
        let newNodesPrevious = null;
        if (addBeforeNode.previous != null)
            newNodesPrevious = addBeforeNode.previous;

        //New node
        let newNode = new ListNode(value, newNodesNext, newNodesPrevious);

        //Redirect pointers to the new node
        addBeforeNode.previous = newNode;
        if (newNodesPrevious != null)
            newNodesPrevious.next = newNode;

        //Change "back" if new node is the last one
        if (newNode.previous == null)
            this.back = newNode;
    }

    /**
     * Adds an element to the front - O(1)
     * @param value Value to save
     */
    InsertFront(value: T)
    {
        //If there is 0 elements
        if (this.IsEmpty())
        {
            this.AddFirst(value);
            return;
        }

        //Create new element
        let newNode = new ListNode<T>(value, null, this.front);

        //Redirect front element
        this.front.next = newNode;

        //Change front to the new node
        this.front = newNode;

        //Increase size
        this.count += 1;
    }

    /**
     * Adds an element to the back - O(1)
     * @param value Value to save
     */
    InsertBack(value: T)
    {
        //If there is 0 elements
        if (this.IsEmpty())
        {
            this.AddFirst(value);
            return;
        }

        //Create new element
        let newNode = new ListNode<T>(value, this.back, null);

        //Redirect back element
        this.back.previous = newNode;

        //Change back to the new node
        this.back = newNode;

        //Increase size
        this.count += 1;
    }

    //--------------------------------------------------
    //----------REMOVE----------------------------------
    //--------------------------------------------------

    RemoveAt(iterator: ListIterator<T>)
    {
        //Nulls
        if (iterator == null)
            return;
        let elementToRemove = iterator.GetCurrentNode();
        if (elementToRemove == null)
            return;

        //Corrent back and front
        if (this.back == elementToRemove)
            this.back = elementToRemove.next;
        if (this.front == elementToRemove)
            this.front = elementToRemove.previous;

        //Redirect previous element
        if (elementToRemove.previous != null)
            elementToRemove.previous.next = elementToRemove.next;

        //Redirect next element
        if (elementToRemove.next != null)
            elementToRemove.next.previous = elementToRemove.previous;

        this.count -= 1;
    }
    Remove(item: T): void
    {
        this.RemoveAt(this.Find(item));
    }

    //--------------------------------------------------
    //----------BUILD-----------------------------------
    //--------------------------------------------------
    Build(items: T[]): void
    {
        for (let i = 0; i < items.length; i++)
            this.InsertFront(items[i]);
    }
}





