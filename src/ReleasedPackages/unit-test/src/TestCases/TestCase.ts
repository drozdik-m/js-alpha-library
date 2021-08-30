

export abstract class TestCase
{
    //--------------------------------------------------
    //----------PROPERTIES------------------------------
    //--------------------------------------------------
    private name: string = "";
     
    protected error: Error = null;
    protected success: boolean = false;
    protected useCaseFunction: Function = null;
    protected isDone: boolean = false;
    

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
        this.name = name;
        this.useCaseFunction = useCaseFunction;
    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------
    /**
     * Runs the test case function
     * */
    abstract Run(): void

    /**
     * Returns true if the test is running, else false
     * */
    abstract IsRunning(): boolean

    /**
     * Returns error is some caught, else null
     * */
    Error(): Error
    {
        return this.error;
    }

    /**
     * Returns true if test case ran successfully
     * */
    Success(): boolean
    {
        return this.success;
    }

    /**
     * Returns true if the test is done, else false
     * */
    IsDone(): boolean
    {
        return this.isDone;
    }

    /**
     * Returns name of this test case
     * */
    Name(): string
    {
        return this.name;
    }

}