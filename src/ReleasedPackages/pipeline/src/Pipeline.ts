import { IExecutor, IResolver, IRejector } from "./PipelineDelegates";
import { IRunner, ICatcher } from "./Observer/ObserverDelegates";
import { PipelineState } from "./PipelineStates";
import { Observer } from "./Observer/Observer";
import { ObserverType } from "./Observer/ObserverType";
import { IPipeline } from "./IPipeline";

export { IPipeline }

export class Pipeline
{
    //Executor
    private executor: IExecutor = null;

    //Observers
    private observers: Observer[] = [];
    private observerServiced: number = 0;

    //Result and error
    private result: any[] = [];

    //State
    private state: PipelineState = PipelineState.Inactive;

    /**
     * Constructs a new pipeline.
     * @param executor Executor function that calls rejector or resolver on any a/sync operations finish
     */
    constructor(executor: IExecutor)
    {
        this.executor = executor;
        this.Resolve = this.Resolve.bind(this);
        this.Reject = this.Reject.bind(this);
        this.Execute();
    }

    /**
     * Executes executor and changes pipeline state
     * @param resolve Resolver (called on success)
     * @param reject Rejector (called on error)
     */
    private Execute(resolve: IResolver = this.Resolve, reject: IRejector = this.Reject): void
    {
        if (this.state != PipelineState.Inactive)
            return;
        this.state = PipelineState.Waiting;
        this.executor(resolve, reject);
    }

    /**
     * Callback for success async operations
     * @param results Results
     */
    private Resolve (...result: any[]): void
    {
        //Change pipeline state
        this.state = PipelineState.Resolved;

        //Save the result
        this.SetResult(result);

        //Call observers
        for (let i = this.observerServiced; i < this.observers.length; i++)
        {
            //Update serviced observers
            this.observerServiced = i;

            //Skip catchers
            if (this.observers[i].GetType() == ObserverType.Catcher)
                continue;

            //Call current observer
            let res = this.HandleObserverFunction(this.observers[i].GetFunction() as IRunner);
            if (res instanceof Pipeline)
            {
                this.observerServiced += 1;
                break;
            }
        }
    }

    /**
     * Callback for error async operations
     * @param results Results
     */
    private Reject(error: Error): any
    {
        //Change pipeline state
        this.state = PipelineState.Rejected;

        //Save the result
        this.SetResult(error);

        //Call observers
        for (let i = this.observerServiced; i < this.observers.length; i++)
        {
            //Update serviced observers
            this.observerServiced = i;
            
            //Skip catchers
            if (this.observers[i].GetType() == ObserverType.Runner)
                continue;
            
            //Call current observer
            let res = this.HandleObserverFunction(this.observers[i].GetFunction() as ICatcher);
            if (res instanceof Pipeline)
            {
                this.observerServiced += 1;
                break;
            }
        }
    }

    /**
     * Handles running and responsing to observer function
     * @param observerFunction Observer function
     */
    private HandleObserverFunction(observerFunction: Function): any
    {
        let observerResult = observerFunction.apply(this, this.result);

        //The result is another pipeline
        if (observerResult instanceof Pipeline)
        {
            //Subscribe to recured pipeline
            let returnedPipeline = observerResult as Pipeline;
            let object = this;
            this.state = PipelineState.Waiting;
            returnedPipeline.Then(function (...data: any[])
            {
                setTimeout(function ()
                {
                    object.Resolve.apply(object, data);
                }, 0);
            }).Catch(function (error: Error)
            {
                setTimeout(function ()
                {
                    object.Reject.apply(object, [error]);
                }, 0);
            });
        }

        //The result is a value, pass it
        else
            this.SetResult(observerResult);

        return observerResult;
    }

    /**
     * Sets new value to pass to the next observer
     * @param newValue The new value
     */
    private SetResult(newValue: any)
    {
        if (newValue instanceof Array)
            this.result = newValue;
        else
            this.result = [newValue];
    }

    /**
     * Runs code after previous sync/async pipeline/observer finished
     * @param observerFunction Observer function to run
     */
    Then(observerFunction: IRunner): Pipeline
    {
        //Add observer to the queue
        if (this.state == PipelineState.Waiting || this.state == PipelineState.Inactive)
            this.observers.push(new Observer(observerFunction, ObserverType.Runner));

        //Executor already resolved
        else if (this.state == PipelineState.Resolved)
            this.HandleObserverFunction(observerFunction);

        //Executor errored
        //else if (this.state == PipelineState.Rejected) 

        return this;
    }

    /**
     * Runs code when this pipeline is rejected
     * @param catcherFunction Catcher function to run
     */
    Catch(catcherFunction: ICatcher): Pipeline
    {
        //Add observer to the queue
        if (this.state == PipelineState.Waiting || this.state == PipelineState.Inactive)
            this.observers.push(new Observer(catcherFunction, ObserverType.Catcher));

        //Executor already resolved
        //else if (this.state == PipelineState.Resolved)

        //Executor errored
        else if (this.state == PipelineState.Rejected) 
            this.HandleObserverFunction(catcherFunction);

        return this;
    }


    /**
     * Creates rejected pipeline base on an error
     * @param error The error
     */
    static Reject(error: Error): Pipeline
    {
        return new Pipeline(function (resolve, reject)
        {
            reject(error);
        });
    }

    /**
     * Creates resolved pipeline that returns a result
     * @param result The result to return
     */
    static Resolve(...result: any[])
    {
        return new Pipeline(function (resolve, reject)
        {
            if (result.length == 1)
                resolve(result[0]);
            else
                resolve(result);

        });
    }
}

