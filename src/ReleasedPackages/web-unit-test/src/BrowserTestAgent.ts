import { UnitTest, IResultJSON } from "@drozdik.m/unit-test";


export class BrowserTestAgent
{
    //--------------------------------------------------
    //----------ATTRIBUTES------------------------------
    //--------------------------------------------------
    private unitTest: UnitTest = null;

    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    constructor(unitTest: UnitTest)
    {
        this.unitTest = unitTest;
    }

    //--------------------------------------------------
    //----------RUN-------------------------------------
    //--------------------------------------------------
    /**
     * Runs the test 
     * @param timeout Timeout [ms] (default 60 sec)
     */
    Run()
    {
        let object = this;
        let results = this.unitTest.ResultsJSON(function (results: IResultJSON): void
        {
            object.Submit(JSON.stringify(results));
        });

        if (results.finished)
            this.Submit(JSON.stringify(results));
    }

    /**
     * Submit result string
     * @param results Result: string
     */
    private Submit(results: string)
    {
        var localAddress = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
        window.location.href = localAddress + "/test-results?results=" + results;
    }
}