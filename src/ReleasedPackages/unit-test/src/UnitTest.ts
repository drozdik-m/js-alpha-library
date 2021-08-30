import { UnitTestFailedError } from "./Errors/UnitTestFailedError";
import { SyncTestCase } from "./TestCases/SyncTestCase";
import { AsyncTestCase } from "./TestCases/AsyncTestCase";
import { TestCase } from "./TestCases/TestCase";
import { Assert } from "./Assert";
import { IResultJSON, ITestCaseResultJSON } from "./Interfaces/ResultJSON";

export { UnitTest, Assert, IResultJSON, ITestCaseResultJSON };

/**
 * Unit test
 */
class UnitTest
{
    //--------------------------------------------------
    //----------ATTRIBUTES------------------------------
    //--------------------------------------------------
    private testName: string = "";
    private testCases: TestCase[] = [];

    //Async
    private awaitingAsync: number = 0;
    private asyncCallbackFunction: Function = null;
    private checkInterval: number = -1;


    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    /**
     * Create new unit test
     * @param testName Test name
     */
    constructor(testName: string)
    {
        this.testName = testName;
        this.AsyncTestCaseCallback = this.AsyncTestCaseCallback.bind(this);
    }

    //--------------------------------------------------
    //----------TEST CASE-------------------------------
    //--------------------------------------------------

    /**
     * Creates and saves new sync test case
     * @param name Test case name
     * @param testFunction Test case function
     */
    AddTestCase(name: string, testFunction: SyncTestFunction): void
    {
        let newTestFunction = new SyncTestCase(name, testFunction);
        this.testCases.push(newTestFunction);
    }

    /**
     * Creates and saves new sync test case
     * @param name Test case name
     * @param testFunction Test case function
     */
    AddSyncTestCase(name: string, testFunction: SyncTestFunction)
    {
        let newTestFunction = new SyncTestCase(name, testFunction);
        this.testCases.push(newTestFunction);
    }

    /**
     * Creates and save new async test case
     * @param name Test case name
     * @param testFunction Test case function
     */
    AddAsyncTestCase(name: string, testFunction: AsyncTestFunction)
    {
        let newTestFunction = new AsyncTestCase(name, testFunction, this.AsyncTestCaseCallback);
        this.testCases.push(newTestFunction);
        this.awaitingAsync += 1;
    }

    /**
     * Callback function for async test cases
     * */
    private AsyncTestCaseCallback()
    {
        this.awaitingAsync -= 1;
        if (this.awaitingAsync <= 0)
            if (this.asyncCallbackFunction != null)
                this.asyncCallbackFunction(this.ResultsJSON());
    }

    /**
     * Runs added test cases and logs result (sync and async)
     * @param timeout Time to timeout [ms] (default is 60 sec)
     */
    Run(timeout: number = 60000)
    {
        let results = this.ResultsJSON(function (results: IResultJSON): void
        {
            UnitTest.ShowResults(results);
            this.ClearTimeout();
        });

        if (results.finished)
            UnitTest.ShowResults(results);
        else
            this.StartTimeout(timeout);
    }

    /**
     * Start counting timeout
     * @param timeout
     */
    StartTimeout(timeout: number)
    {
        if (this.checkInterval != -1)
            clearInterval(this.checkInterval);

        let intervalDelay = 100;
        let object = this;
        this.checkInterval = setInterval(function ()
        {
            timeout -= intervalDelay;
            if (timeout <= 0)
            {
                clearInterval(object.checkInterval);
                throw new UnitTestFailedError("Timeout (did you forget to call Done() function?)");
            }
        }, intervalDelay);
    }

    /**
     * Clear timeout
     * */
    ClearTimeout()
    {
        if (this.checkInterval != -1)
            clearInterval(this.checkInterval);
    }

    /**
     * Logs passed results JSON
     * @param results IResultJSON
     */
    static ShowResults(results: IResultJSON)
    {
        console.log(`\nUnit test %s`, results.name);
        console.group();
        for (let i = 0; i < results.testCases.length; i++)
        {
            if (!results.testCases[i].finished)
            {
                console.log("%s - UNFINISHED", results.testCases[i].name)
            }

            //Test case success \u2713 
            else if (results.testCases[i].success)
            {
                console.log("%s - PASSED", results.testCases[i].name);
            }

            //Test case failed \u2717 
            else
            {
                console.log("%s - FAILED", results.testCases[i].name);
                console.log(`  -> Error: ${results.testCases[i].errorMessage}`);
            }
        }
        console.groupEnd();
        console.log(`Unit test ${!results.finished ? "UNFINISHED" : (results.success ? "PASSED" : "FAILED")}`);

        //console.log(results);
        if (results.success != true)
            throw new UnitTestFailedError(`Unit test ${results.name} FAILED`);
        if (results.finished != true)
            throw new UnitTestFailedError(`Unit test ${results.name} UNFINISHED`);
    }

    /**
     * Returns results in JSON format
     * @param callback If some async functions has been present, returns complete JSON here
     */
    ResultsJSON(callback: ResultCallbackJSON = null): IResultJSON
    {
        //Set variables
        let success = true;
        let finished = true;
        let resultJSON: IResultJSON = {} as IResultJSON;
        resultJSON.testCases = [];

        //Set name
        resultJSON.name = this.testName;

        //Save callback
        if (callback != null)
            this.asyncCallbackFunction = callback;

        //Get results
        for (let i = 0; i < this.testCases.length; i++)
        {
            let testCaseResultJSON = {} as ITestCaseResultJSON;
            testCaseResultJSON.name = this.testCases[i].Name();

            //Run
            if (!this.testCases[i].IsDone() && !this.testCases[i].IsRunning())
                this.testCases[i].Run();

            //Success?
            if (this.testCases[i].Success())
            {
                //Test case success
                testCaseResultJSON.success = true;
                testCaseResultJSON.errorMessage = "";
            }
            else
            {
                success = false;
                testCaseResultJSON.success = false;
                testCaseResultJSON.errorMessage =
                    (this.testCases[i].Error() == null ? "" : this.testCases[i].Error().message);
            }

            //Finished?
            testCaseResultJSON.finished = true;
            if (!this.testCases[i].IsDone())
            {
                testCaseResultJSON.finished = false;
                finished = false;
            }
                

            //Add test case results
            resultJSON.testCases[i] = testCaseResultJSON;
        }

        //Final success and finished
        resultJSON.success = success;
        resultJSON.finished = finished;

        return resultJSON;
    }
}


interface ResultCallbackJSON
{
    (results: IResultJSON): any
}

interface SyncTestFunction
{
    (): void
}

interface AsyncTestFunction
{
    (Done: Function, Fail: Function): void
}