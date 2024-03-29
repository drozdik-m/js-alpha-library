﻿import { Pipeline } from "../src/Pipeline";
import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { IPipeline } from "../src/IPipeline";

function WaitSuccess(waitFor: number)
{
    return new Pipeline(function (resolve, reject)
    {
        setTimeout(function ()
        {
            resolve(waitFor, waitFor * 10, waitFor * 100);
        }, waitFor);
    });
}
function WaitError(waitFor: number)
{
    return new Pipeline(function (resolve, reject)
    {
        setTimeout(function ()
        {
            reject(new Error(waitFor.toString()));
        }, waitFor);
    });
}
function InstantSuccess(parameter: string = "")
{
    return new Pipeline(function (resolver, rejector)
    {
        resolver(parameter);
    });
}
function InstantError(parameter: string = "")
{
    return new Pipeline(function (resolver, rejector)
    {
        rejector(new Error(parameter));
    });
}
function WaitCallback(waitFor: number, callback: Function)
{
    return new Pipeline(function (resolve, reject)
    {
        setTimeout(function ()
        {
            callback();
            resolve();
        }, waitFor);
    });
}

let unitTest = new UnitTest("Pipeline");

unitTest.AddAsyncTestCase("Constructor", function (Done)
{
    WaitCallback(500, function ()
    {
        Done();
    });
});

unitTest.AddAsyncTestCase("Single then (value)", function (Done)
{
    WaitSuccess(500).Then(function (value1, value2, value3)
    {
        Assert.AreEqual(500, value1);
        Assert.AreEqual(5000, value2);
        Assert.AreEqual(50000, value3);
        Done();
    });
});

unitTest.AddAsyncTestCase("Multiple then (value)", function (Done)
{
    WaitSuccess(500).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(500, value1);
        Assert.AreEqual(5000, value2);
        Assert.AreEqual(50000, value3);
        return [1, 2, 3];
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(1, value1);
        Assert.AreEqual(2, value2);
        Assert.AreEqual(3, value3);
        return ["this", "is", "test"];
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual("this", value1);
        Assert.AreEqual("is", value2);
        Assert.AreEqual("test", value3);
        Done();
    });
});

unitTest.AddAsyncTestCase("Multiple then (value/array)", function (Done)
{
    WaitSuccess(500).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(500, value1);
        Assert.AreEqual(5000, value2);
        Assert.AreEqual(50000, value3);
        return [1, 2, 3];
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(1, value1);
        Assert.AreEqual(2, value2);
        Assert.AreEqual(3, value3);
        return "boyyy";
    }).Then(function (value: any)
    {
        Assert.AreEqual("boyyy", value);
        return "madaaam";
    }).Then(function (value: any)
    {
        Assert.AreEqual("madaaam", value);
        return [500, 5000, 50000];
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(500, value1);
        Assert.AreEqual(5000, value2);
        Assert.AreEqual(50000, value3);
        return [1, 2, 3];
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(1, value1);
        Assert.AreEqual(2, value2);
        Assert.AreEqual(3, value3);
        return "boyyy";
    }).Then(function (value: any)
    {
        Assert.AreEqual("boyyy", value);
        return "madaaam";
    }).Then(function (value: any)
    {
        Assert.AreEqual("madaaam", value);
        Done();
    });
});

unitTest.AddAsyncTestCase("Then after resolve", function (Done)
{
    InstantSuccess("Then after resolve").Then(function (value: string)
    {
        Assert.AreEqual("Then after resolve", value);
        return [1, 2, 3];
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(1, value1);
        Assert.AreEqual(2, value2);
        Assert.AreEqual(3, value3);
        return ["this", "is", "test"];
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual("this", value1);
        Assert.AreEqual("is", value2);
        Assert.AreEqual("test", value3);
        Done();
    });
});

unitTest.AddAsyncTestCase("Then with short timeout", function (Done)
{
    WaitSuccess(5).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(5, value1);
        Assert.AreEqual(50, value2);
        Assert.AreEqual(500, value3);
        return [1, 2, 3];
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(1, value1);
        Assert.AreEqual(2, value2);
        Assert.AreEqual(3, value3);
        return ["this", "is", "test"];
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual("this", value1);
        Assert.AreEqual("is", value2);
        Assert.AreEqual("test", value3);
        Done();
    });
});

unitTest.AddAsyncTestCase("Single then (pipeline)", function (Done)
{
    WaitSuccess(500).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(500, value1);
        Assert.AreEqual(5000, value2);
        Assert.AreEqual(50000, value3);
        return WaitSuccess(500).Then(function (value1: any, value2: any, value3: any)
        {
            Assert.AreEqual(500, value1);
            Assert.AreEqual(5000, value2);
            Assert.AreEqual(50000, value3);
            Done();
        });
    });
});

unitTest.AddAsyncTestCase("Multiple then (pipeline, value)", function (Done)
{
    WaitSuccess(500).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(500, value1);
        Assert.AreEqual(5000, value2);
        Assert.AreEqual(50000, value3);
        return WaitSuccess(400);
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(400, value1);
        Assert.AreEqual(4000, value2);
        Assert.AreEqual(40000, value3);
        Done();
    });

});

unitTest.AddAsyncTestCase("Multiple then in single then (pipeline)", function (Done)
{
    WaitSuccess(500).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(500, value1);
        Assert.AreEqual(5000, value2);
        Assert.AreEqual(50000, value3);
        return WaitSuccess(500).Then(function (value1: any, value2: any, value3: any)
        {
            Assert.AreEqual(500, value1);
            Assert.AreEqual(5000, value2);
            Assert.AreEqual(50000, value3);
            return [420, 4200, 42000];

        }).Then(function (value1: any, value2: any, value3: any)
        {
            Assert.AreEqual(420, value1);
            Assert.AreEqual(4200, value2);
            Assert.AreEqual(42000, value3);
            return [840, 8400, 84000];
        });
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(840, value1);
        Assert.AreEqual(8400, value2);
        Assert.AreEqual(84000, value3);
        return WaitSuccess(300);
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(300, value1);
        Assert.AreEqual(3000, value2);
        Assert.AreEqual(30000, value3);
        Done();
    });
});

unitTest.AddAsyncTestCase("Return instant success", function (Done)
{
    WaitSuccess(500).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(500, value1);
        Assert.AreEqual(5000, value2);
        Assert.AreEqual(50000, value3);
        return [1, 2, 3];
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(1, value1);
        Assert.AreEqual(2, value2);
        Assert.AreEqual(3, value3);
        return ["this!", "is", "test"];
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual("this!", value1);
        Assert.AreEqual("is", value2);
        Assert.AreEqual("test", value3);
        return InstantSuccess("ole!");
    }).Then(function (value: string)
    {
        Assert.AreEqual("ole!", value);
        return WaitSuccess(500).Then(function (value1: any, value2: any, value3: any)
        {
            Assert.AreEqual(500, value1);
            Assert.AreEqual(5000, value2);
            Assert.AreEqual(50000, value3);
            return InstantSuccess("420");

        }).Then(function (value: string)
        {
            Assert.AreEqual("420", value);
            return [840, 8400, 84000];
        });
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(840, value1);
        Assert.AreEqual(8400, value2);
        Assert.AreEqual(84000, value3);
        return InstantSuccess("300");
    }).Then(function (value: string)
    {
        Assert.AreEqual("300", value);
        Done();
    });
});

unitTest.AddAsyncTestCase("Catch but no error", function (Done)
{
    WaitSuccess(500).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(500, value1);
        Assert.AreEqual(5000, value2);
        Assert.AreEqual(50000, value3);
        return [1, 2, 3];
    }).Catch(function (error: Error)
    {
        Assert.Fail();
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(1, value1);
        Assert.AreEqual(2, value2);
        Assert.AreEqual(3, value3);
        return ["this!", "is", "test"];
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual("this!", value1);
        Assert.AreEqual("is", value2);
        Assert.AreEqual("test", value3);
        return InstantSuccess("ole!");
    }).Then(function (value: string)
    {
        Assert.AreEqual("ole!", value);
        return WaitSuccess(500).Then(function (value1: any, value2: any, value3: any)
        {
            Assert.AreEqual(500, value1);
            Assert.AreEqual(5000, value2);
            Assert.AreEqual(50000, value3);
            return [420, 4200, 42000];

        }).Catch(function ()
        {
            Assert.Fail();
        }).Then(function (value1: any, value2: any, value3: any)
        {
            Assert.AreEqual(420, value1);
            Assert.AreEqual(4200, value2);
            Assert.AreEqual(42000, value3);
            return [840, 8400, 84000];
        });
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(840, value1);
        Assert.AreEqual(8400, value2);
        Assert.AreEqual(84000, value3);
        return WaitSuccess(300);
    }).Catch(function (error: Error)
    {
        Assert.Fail();
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(300, value1);
        Assert.AreEqual(3000, value2);
        Assert.AreEqual(30000, value3);
        Done();
    }).Catch(function ()
    {
        Assert.Fail();
    });
});

unitTest.AddAsyncTestCase("Single catch (value)", function (Done)
{
    WaitError(500).Catch(function (error: Error)
    {
        Assert.AreEqual("500", error.message);
        Done();
    });
});

unitTest.AddAsyncTestCase("Single catch, some then", function (Done)
{
    WaitError(500).Then(function ()
    {
        Assert.Fail();
    }).Catch(function (error: Error)
    {
        Assert.AreEqual("500", error.message);
        Done();
    }).Then(function ()
    {
        Assert.Fail();
    });
});

unitTest.AddAsyncTestCase("Multiple catch, some then", function (Done)
{
    WaitError(500).Then(function ()
    {
        Assert.Fail();
    }).Catch(function (error: Error)
    {
        Assert.AreEqual("500", error.message);
        return new Error("400");
    }).Catch(function (error: Error)
    {
        Assert.AreEqual("400", error.message);
        return new Error("300");
    }).Then(function ()
    {
        Assert.Fail();
    }).Catch(function (error: Error)
    {
        Assert.AreEqual("300", error.message);
        Done();
    }).Then(function ()
    {
        Assert.Fail();
    });
});

unitTest.AddAsyncTestCase("Multiple catch, some then (instant)", function (Done)
{
    InstantError("500").Then(function ()
    {
        Assert.Fail();
    }).Catch(function (error: Error)
    {
        Assert.AreEqual("500", error.message);
        return new Error("400");
    }).Catch(function (error: Error)
    {
        Assert.AreEqual("400", error.message);
        return new Error("300");
    }).Then(function ()
    {
        Assert.Fail();
    }).Catch(function (error: Error)
    {
        Assert.AreEqual("300", error.message);
        Done();
    }).Then(function ()
    {
        Assert.Fail();
    });
});

unitTest.AddAsyncTestCase("Relive rejected pipeline", function (Done)
{
    WaitError(400).Then(function ()
    {
        Assert.Fail();
    }).Catch(function (error: Error)
    {
        Assert.AreEqual("400", error.message);
        return WaitSuccess(500);
    }).Catch(function ()
    {
        Assert.Fail();
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(500, value1);
        Assert.AreEqual(5000, value2);
        Assert.AreEqual(50000, value3);
        return [1, 2, 3];
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(1, value1);
        Assert.AreEqual(2, value2);
        Assert.AreEqual(3, value3);
        return WaitError(100);
    }).Then(function ()
    {
        Assert.Fail();
    }).Catch(function (error: Error)
    {
        Assert.AreEqual("100", error.message);
        return InstantSuccess("noice");
    }).Catch(function (error: Error)
    {
        Assert.Fail();
    }).Then(function (data: string)
    {
        Assert.AreEqual("noice", data);
        return InstantError("olala");
    }).Then(function ()
    {
        Assert.Fail();
    }).Catch(function (error: Error)
    {
        Assert.AreEqual("olala", error.message);
        Done();
    });
});

unitTest.AddAsyncTestCase("Recursively Relive rejected pipeline", function (Done)
{
    WaitError(400).Then(function ()
    {
        Assert.Fail();
    }).Catch(function (error: Error)
    {
        Assert.AreEqual("400", error.message);
        return WaitSuccess(500);
    }).Catch(function ()
    {
        Assert.Fail();
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(500, value1);
        Assert.AreEqual(5000, value2);
        Assert.AreEqual(50000, value3);
        return [1, 2, 3];
    }).Then(function (value1: any, value2: any, value3: any)
    {
        Assert.AreEqual(1, value1);
        Assert.AreEqual(2, value2);
        Assert.AreEqual(3, value3);
        return WaitSuccess(100).Then(function ()
        {
            return WaitError(100);
        });
    }).Then(function ()
    {
        Assert.Fail();
    }).Catch(function (error: Error)
    {
        Assert.AreEqual("100", error.message);
        return InstantSuccess("noice");
    }).Catch(function (error: Error)
    {
        Assert.Fail();
    }).Then(function (data: string)
    {
        Assert.AreEqual("noice", data);
        return InstantError("olala");
    }).Then(function ()
    {
        Assert.Fail();
    }).Catch(function (error: Error)
    {
        Assert.AreEqual("olala", error.message);
        Done();
    });
});

unitTest.AddAsyncTestCase("Single then parameter", function (Done)
{
    new Pipeline(function (resolver, rejector)
    {
        resolver("xxx");
    }).Then(function (value: string)
    {
        Assert.AreEqual(typeof "xxx", typeof value);
        Assert.AreEqual("xxx", value);
        Done();
    });

});

unitTest.AddAsyncTestCase("Static resolve", function (Done)
{
    WaitSuccess(500).Then(function (value1, value2, value3)
    {
        Assert.AreEqual(500, value1);
        Assert.AreEqual(5000, value2);
        Assert.AreEqual(50000, value3);
        return Pipeline.Resolve("xxx")
    }).Then(function (value: string)
    {
        Assert.AreEqual("xxx", value)
        Done();
    });
});

unitTest.AddAsyncTestCase("Static resolve (single)", function (Done)
{
    WaitSuccess(500).Then(function (value1, value2, value3)
    {
        Assert.AreEqual(500, value1);
        Assert.AreEqual(5000, value2);
        Assert.AreEqual(50000, value3);
        return Pipeline.Resolve("xxx")
    }).Then(function (value: string)
    {
        Assert.AreEqual(typeof "xxx", typeof value);
        Assert.AreEqual("xxx", value)
        Done();
    });
});

unitTest.AddAsyncTestCase("Static resolve (array)", function (Done)
{
    WaitSuccess(500).Then(function (value1, value2, value3)
    {
        Assert.AreEqual(500, value1);
        Assert.AreEqual(5000, value2);
        Assert.AreEqual(50000, value3);
        return Pipeline.Resolve([1, 2, 3, 4])
    }).Then(function (value: number[])
    {
        Assert.AreEqual(1, value[0]);
        Assert.AreEqual(2, value[1]);
        Assert.AreEqual(3, value[2]);
        Assert.AreEqual(4, value[3]);
        Done();
    });
});

unitTest.AddAsyncTestCase("Static reject", function (Done)
{
    WaitSuccess(500).Then(function (value1, value2, value3)
    {
        Assert.AreEqual(500, value1);
        Assert.AreEqual(5000, value2);
        Assert.AreEqual(50000, value3);
        return Pipeline.Reject(new Error("xxx"));
    }).Catch(function (value: Error)
    {
        Assert.AreEqual("xxx", value.message)
        Done();
    });
});

unitTest.AddAsyncTestCase("Typed pipeline interface", function (Done)
{
    let pipeline: IPipeline<number> = new Pipeline(function (resolve, reject)
    {
        resolve(123);
    });

    pipeline.Then(function (value: number)
    {
        Assert.AreEqual(123, value);
        Done();
    }).Then(function ()
    {

    });
});

unitTest.Run(5000);
//console.log(unitTest.ResultsJSON());