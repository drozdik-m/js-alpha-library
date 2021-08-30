import { List } from "@drozdik.m/double-linked-list";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";
import { ICountable } from "@drozdik.m/common-interfaces/ICountable";
import { IClearable } from "@drozdik.m/common-interfaces/IClearable";
import { IDisposable } from "@drozdik.m/common-interfaces/IDisposable";


export class Queue<T> implements IClonable <Queue<T>>, ICountable, IClearable, IDisposable
{
    //--------------------------------------------------
    //----------ATTRIBUTES------------------------------
    //--------------------------------------------------
    //List storage
    queueList: List<T> = new List<T>();

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    constructor()
    {

    }

    //--------------------------------------------------
    //----------FIRST AND LAST--------------------------
    //--------------------------------------------------
    /**
    * Returns the first element in the queue
    * @returns Value at the front
    */
    Front(): T
    {
        if (this.IsEmpty())
            return null;
        return this.queueList.First().Value();
    }

    /**
    * Returns the last element in the queue
    * @returns Value at the back
    */
    Back(): T
    {
        if (this.IsEmpty())
            return null;
        return this.queueList.Last().Value();
    }

    //--------------------------------------------------
    //----------INSERT/REMOVE---------------------------
    //--------------------------------------------------

    /**
     * Adds item to the queue (to the back)
     * @param value Value to add
     */
    Enqueue(value: T)
    {
        this.queueList.Insert(value);
    }

    /**
    * Removes the first element in the queue (the front one)
    */
    Dequeue(): T
    {
        if (!this.IsEmpty())
        {
            let res = this.queueList.First().Value();
            this.queueList.RemoveAt(this.queueList.First());
            return res;
        }
            this.queueList.RemoveAt(this.queueList.First());
        return null;
    }


    //--------------------------------------------------
    //----------CLEAR AND DISPOSE-----------------------
    //--------------------------------------------------
    Clear(): void
    {
        this.queueList.Clear();
    }
    Dispose(): void
    {
        this.Clear();
    }

    //--------------------------------------------------
    //----------COUNT-----------------------------------
    //--------------------------------------------------
    Count(): number
    {
        return this.queueList.Count();
    }
    IsEmpty(): boolean
    {
        return this.queueList.IsEmpty();
    }

    //--------------------------------------------------
    //----------CLONE-----------------------------------
    //--------------------------------------------------
    Clone(): Queue<T>
    {
        let res = new Queue<T>();
        res.queueList = this.queueList.Clone();
        return res;
    }
}