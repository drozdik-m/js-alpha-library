import { ListNode } from "./ListNode";
import { IBidirectionalIterator } from "@drozdik.m/common-interfaces/IBidirectionalIterator";

//--------------------------------------------------
//----------LIST ITERATOR---------------------------
//--------------------------------------------------
export class ListIterator<T> implements IBidirectionalIterator<T>
{

    private current: ListNode<T> = null;

    
    constructor(current: ListNode<T> = null)
    {
        this.current = current;
    }

    Next(): void 
    {
        if (this.current != null)
            this.current = this.current.next;
    }

    Previous(): void 
    {
        if (this.current != null)
            this.current = this.current.previous;
    }

    Value(): T
    {
        if (this.current == null)
            return null;
        return this.current.value;
    }

    HasValue(): boolean 
    {
        return this.current != null;
    }

    /**
    * Returns currently selected node. Do not use unless you know what you are doing!
    * @returns Current node
    */
    GetCurrentNode(): ListNode<T>
    {
        return this.current;
    }
}