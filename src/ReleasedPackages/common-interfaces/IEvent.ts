
/**
 * Function for events.
 * Caller is the object that called the event (this).
 * Event arguments is object wrapper with important arguments.
 * */
export interface IEvent<T,V>
{
    (caller: T, eventArguments: V): void
}