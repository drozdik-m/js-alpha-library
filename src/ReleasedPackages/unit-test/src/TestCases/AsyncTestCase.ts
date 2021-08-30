import { TestCase } from "./TestCase";

export class AsyncTestCase extends TestCase
{
    
    //--------------------------------------------------
    //----------PROPERTIES------------------------------
    //--------------------------------------------------
    private callbackFunction: Function = null;
    private isRunning = false;
    
    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    /**
     * Creates new instance of AsyncTestCase
     * @param name Name of the test case
     * @param useCaseFunction Function to run
     * @param callbackFunction Function called on test case done
     */
    constructor(name: string, useCaseFunction: Function, callbackFunction: Function)
    {
        super(name, useCaseFunction);
        this.callbackFunction = callbackFunction;
        this.Done = this.Done.bind(this);
        this.Fail = this.Fail.bind(this);
    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------
    Run()
    {
        try
        {
            this.useCaseFunction(this.Done, this.Fail);
        }
        catch (error)
        {
            this.error = error;
            this.success = false;
        }
        
        this.isRunning = true;
    }

    /**
     * Success callback
     * */
    Done()
    {
        this.isDone = true;
        this.isRunning = false;
        this.success = true;
        this.callbackFunction();
    }

    /**
     * Fail callback
     * */
    Fail()
    {
        this.isDone = true;
        this.isRunning = false;
        this.success = false;
        this.callbackFunction();
    }

    IsRunning(): boolean
    {
        return this.isRunning;
    }
}