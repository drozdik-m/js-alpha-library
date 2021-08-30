import { ICatcher, ISimpleRunner } from "./Observer/ObserverDelegates";

export interface IPipeline<TValue>
{
    /**
     * Runs code after previous sync/async pipeline/observer finished
     * @param observerFunction Observer function to run
     */
    Then(observerFunction: ISimpleRunner<TValue>): IPipeline<any>

    /**
     * Runs code when this pipeline is rejected
     * @param catcherFunction Catcher function to run
     */
    Catch(catcherFunction: ICatcher): IPipeline<any>
}

