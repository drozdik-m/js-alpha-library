import { ObserverType } from "./ObserverType";



export class Observer
{
    private observerFunction: Function;
    private observerType: ObserverType;

    /**
     * Observer class
     * @param observerFunction Observer function
     * @param observerType Observer type (observer, catcher)
     */
    constructor(observerFunction: Function, observerType: ObserverType)
    {
        this.observerFunction = observerFunction;
        this.observerType = observerType;
    }

    /**
     * Returns function to run
     * */
    GetFunction(): Function
    {
        return this.observerFunction;
    }

    /**
     * Returns type of the observer
     * */
    GetType(): ObserverType
    {
        return this.observerType;
    }
}