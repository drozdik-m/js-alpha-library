import { IClonable } from "@drozdik.m/common-interfaces/IClonable";
import { IClearable } from "@drozdik.m/common-interfaces/IClearable";
import { ICountable } from "@drozdik.m/common-interfaces/ICountable";
import { IDisposable } from "@drozdik.m/common-interfaces/IDisposable";
import { IBuildable } from "@drozdik.m/common-interfaces/IBuildable";


//--------------------------------------------------
//----------STACK-----------------------------------
//--------------------------------------------------
export class Stack<T> implements IClonable<Stack<T>>, IBuildable<T>, IClearable, ICountable, IDisposable
{
    
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    //Array storage
    private stackArray: T[] = [];

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    /**
     * Creates new instance of the Stack
     * @param items Initial items in the stack (first attay item is at bottom of the stack)
     */
    constructor(items: T[] = [])
    {
        this.Build(items);
    }

    //--------------------------------------------------
    //----------VALUE-----------------------------------
    //--------------------------------------------------

    /**
     * Returns element on top of the stack (null if empty)
     * @returns Element on top of the stack
     */
    Top(): T
    {
        if (this.IsEmpty())
            return null;
        return this.stackArray[this.stackArray.length - 1];
    }
    /**
     * Adds new element on top of the stack
     * @param item Item to add
     */
    Push(item: T)
    {
        this.stackArray.push(item);
    }

    /**
     * Removes element on top of the stack (doesn't return it)
     */
    Pop()
    {
        this.stackArray.pop();
    }

    //--------------------------------------------------
    //----------COUNT-----------------------------------
    //--------------------------------------------------
    IsEmpty(): boolean
    {
        return this.stackArray.length == 0;
    }

    Count(): number
    {
        return this.stackArray.length;
    }

    //--------------------------------------------------
    //----------CLEAR-----------------------------------
    //--------------------------------------------------
    /**
     * Removes all elements in the stack
     */
    Clear()
    {
        this.stackArray = [];
    }

    Dispose(): void
    {
        this.Clear();
    }
   
    //--------------------------------------------------
    //----------BUILD-----------------------------------
    //--------------------------------------------------
    Build(items: T[]): void
    {
        this.Clear();
        for (let i = 0; i < items.length; i++)
            this.Push(items[i]);
    }

    //--------------------------------------------------
    //----------CLONE-----------------------------------
    //--------------------------------------------------
    Clone(): Stack<T>
    {
        let resArr: T[] = [];
        for (let i = 0; i < this.stackArray.length; i++)
        {
            if (this.stackArray[i] != null)
            {
                if (typeof (<any>this.stackArray[i]).Clone != "undefined")
                    resArr[i] = (<any>this.stackArray[i]).Clone();
                else
                    resArr[i] = this.stackArray[i];
            }
            else
                resArr[i] = null;
            
        }

        return new Stack<T>(resArr);
    }

}