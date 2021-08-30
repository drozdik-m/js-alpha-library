import { BrowserTestAgent } from "@drozdik.m/web-unit-test";
import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { Ajax, AjaxParameter, AjaxResponseArgs, AjaxResponse } from "../../src/Ajax";

function Repeat(string: string): Promise<string>
{
    return fetch(`http://localhost:8888?repeat=${string}`).then(function (response)
    {
        return response.text();
    });
}

let unitTest = new UnitTest("Ajax");

unitTest.AddAsyncTestCase("Repeater localhost:8888 test", function (Done, Fail)
{
    Repeat("1234").then(function (data)
    {
        try
        {
            Assert.AreEqual("1234", data);
            Done();
        }
        catch
        {
            Fail();
        }
    });
});

unitTest.AddAsyncTestCase("Single GET", function (Done, Fail)
{
    let ajax = new Ajax();
    ajax.Get("http://localhost:8888", [
        new AjaxParameter("repeat", "1234")
    ]).Then(function (args: AjaxResponse)
    {
        try
        {
            Assert.AreEqual("1234", args.Response());
            Done();
        }
        catch
        {
            Fail();
        }
    }).Catch(function (error: Error)
    {
        Fail();
    });
});

unitTest.AddAsyncTestCase("Multiple GET", function (Done, Fail)
{
    let ajax = new Ajax();
    let responses = 30;
    let j = 0;
    for (let i = 0; i < 30; i++)
    {
        ajax.Get("http://localhost:8888", [
            new AjaxParameter("repeat", i.toString())
        ]).Then(function (args: AjaxResponse)
        {
            try
            {
                Assert.AreEqual(i, args.Response());
                responses--;
                Assert.AreEqual(j++, i);
            }
            catch
            {
                Fail();
            }
    
        }).Catch(function (error: Error)
        {
            Fail();
        });
    }

    let interval = setInterval(function ()
    {
        if (responses == 0)
        {
            clearInterval(interval);
            Done();
        }
    }, 50);
});

unitTest.AddAsyncTestCase("Non-http error GET", function (Done, Fail)
{
    let ajax = new Ajax();
    ajax.Get("http://nowhere").Then(function (args: AjaxResponse)
    {
        Fail();
    }).Catch(function (error: Error)
    {
        Done();
    });
});

unitTest.AddAsyncTestCase("Http error GET", function (Done, Fail)
{
    let ajax = new Ajax();
    ajax.Get("http://localhost:8888/error").Then(function (args: AjaxResponse)
    {
        Fail();
    }).Catch(function (error: Error)
    {
        Done();
    });
});

unitTest.AddAsyncTestCase("Success callback", function (Done, Fail)
{
    let ajax = new Ajax();
    ajax.OnSuccess.Add(function (caller: Ajax, args: AjaxResponseArgs)
    {
        try
        {
            Assert.AreEqual("1234", args.Response().Response());
            Done();
        }
        catch
        {
            Fail();
        }
        
    });
    ajax.Get("http://localhost:8888", [
        new AjaxParameter("repeat", "1234")
    ]);
});

unitTest.AddAsyncTestCase("Error callback", function (Done, Fail)
{
    let ajax = new Ajax();
    ajax.OnError.Add(function (caller: Ajax, args: AjaxResponseArgs)
    {
        try
        {
            Assert.AreEqual("500", args.Response().Status());
            Done();
        }
        catch
        {
            Fail();
        }

    });
    ajax.Get("http://localhost:8888/error", [
        new AjaxParameter("repeat", "1234")
    ]);
});


let browserTestAgent = new BrowserTestAgent(unitTest);
browserTestAgent.Run();