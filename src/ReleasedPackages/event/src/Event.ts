import { IClearable } from "@drozdik.m/common-interfaces/IClearable";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";
import { IDisposable } from "@drozdik.m/common-interfaces/IDisposable";
import { ICountable } from "@drozdik.m/common-interfaces/ICountable";
import { IEvent } from "@drozdik.m/common-interfaces/IEvent";
import { List } from "@drozdik.m/double-linked-list";
 
export class Event<C,A> implements IClearable, IClonable<Event<C,A>>, IDisposable, ICountable
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    private callbacks = new List<IEvent<C, A>>();

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    constructor()
    {

    }

    //--------------------------------------------------
    //---------EVENTS-----------------------------------
    //--------------------------------------------------
    /**
     * Adds function to be called on event trigger
     * @param item Function to add
     */
    Add(item: IEvent<C,A>): void
    {
        this.callbacks.InsertBack(item);
    }

    /**
     * Removes functions to be triggered (only first occurence)
     * @param item  Function to remove
     */
    Remove(item: IEvent<C, A>): void
    {
        this.callbacks.Remove(item);
    }

    /**
     * Calls all added functions
     * @param caller Caller object
     * @param args Arguments
     */
    Invoke(caller: C, args: A): void
    {
        for (let it = this.callbacks.First(); it.HasValue(); it.Next())
            it.Value()(caller, args);
    }

    //--------------------------------------------------
    //---------CLONE------------------------------------
    //--------------------------------------------------
    Clone(): Event<C,A>
    {
        let res = new Event<C, A>();
        res.callbacks = this.callbacks.Clone();
        return res;
    }

    //--------------------------------------------------
    //---------COUNTS-----------------------------------
    //--------------------------------------------------
    Count(): number
    {
        return this.callbacks.Count();
    }
    IsEmpty(): boolean
    {
        return this.Count() == 0;
    }

    //--------------------------------------------------
    //---------CLEARS-----------------------------------
    //--------------------------------------------------
    Dispose(): void
    {
        this.callbacks.Dispose();
    }
    Clear(): void
    {
        this.callbacks.Clear();
    }
}