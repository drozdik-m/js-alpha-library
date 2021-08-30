
//--------------------------------------------------
//----------LIST NODE-------------------------------
//--------------------------------------------------
export class ListNode<T>
{
    next: ListNode<T> = null;
    previous: ListNode<T> = null;
    value: T = null;

    /**
     * Creates new instance of list node
     * @param value Value of the node
     * @param next Reference to the next node
     * @param previous Reference to the previous node
     */
    constructor(value: T, next: ListNode<T> = null, previous: ListNode<T> = null)
    {
        this.value = value;
        this.next = next;
        this.previous = previous;
    }
}