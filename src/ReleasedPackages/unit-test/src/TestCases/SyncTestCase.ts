import { TestCase } from "./TestCase";


export class SyncTestCase extends TestCase
{
    //--------------------------------------------------
    //----------PROPERTIES------------------------------
    //--------------------------------------------------

    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    /**
     * Creates new instance of TestCase
     * @param name Name of the test case
     * @param useCaseFunction Function to run
     */
    constructor(name: string, useCaseFunction: Function)
    {
        super(name, useCaseFunction);
    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------
    
    Run()
    {
        try
        {
            this.useCaseFunction();
            this.success = true;
        }
        catch (error)
        {
            this.success = false;
            this.error = error;
        }
        
        this.isDone = true;
    }

    IsRunning(): boolean
    {
        return false;
    }
}