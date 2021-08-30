import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { Event } from "../src/Event";

let unitTest = new UnitTest("Event");


class Foo
{
    id: number;
    constructor(id: number = 5) {
        this.id = id;
    }
}
class Args
{
    value: any;
    constructor(value: any) {
        this.value = value;
    }
}

unitTest.AddTestCase("Add, Invoke", function () {

    let event = new Event<Foo, Args>();
    let counter = 0;
    event.Invoke(null, null);

    Assert.AreEqual(0, counter);

    event.Add(function (caller: Foo, args: Args) {
        counter++;
        Assert.IsNull(caller);
        Assert.IsNull(args);
    });

    event.Invoke(null, null);
    Assert.AreEqual(1, counter);

    event.Add(function (caller: Foo, args: Args) {
        counter++;
        Assert.IsNull(caller);
        Assert.IsNull(args);
    });

    event.Invoke(null, null);
    Assert.AreEqual(3, counter);

});

unitTest.AddTestCase("Remove", function () {

    let event = new Event<Foo, Args>();
    let counter = 0;
    event.Invoke(null, null);

    Assert.AreEqual(0, counter);

    event.Add(function (caller: Foo, args: Args) {
        counter++;
        Assert.IsNull(caller);
        Assert.IsNull(args);
    });

    function NullCallback (caller: Foo, args: Args) {
        counter++;
        Assert.IsNull(caller);
        Assert.IsNull(args);
    }

    event.Invoke(null, null);
    Assert.AreEqual(1, counter);

    event.Add(NullCallback);

    event.Invoke(null, null);
    Assert.AreEqual(3, counter);

    for (let i = 1; i < 4; i++)
    {
        event.Remove(NullCallback);
        event.Invoke(null, null);
        Assert.AreEqual(3 + i, counter);
    }
});

unitTest.AddTestCase("Invoke with args", function ()
{

    let event = new Event<Foo, Args>();

    let counter = 0;

    event.Add(function (caller: Foo, args: Args)
    {
        counter += args.value;
        Assert.IsNull(caller);
    });

    event.Invoke(null, new Args(1));
    Assert.AreEqual(1, counter);

    event.Invoke(null, new Args(4));
    Assert.AreEqual(5, counter);

    event.Add(function (caller: Foo, args: Args)
    {
        counter += args.value;
        Assert.IsNull(caller);
    });
    event.Invoke(null, new Args(2));
    Assert.AreEqual(9, counter);
});

unitTest.AddTestCase("Count, Empty, Clear", function ()
{

    let event = new Event<Foo, Args>();

    Assert.AreEqual(0, event.Count());
    Assert.IsTrue(event.IsEmpty());

    event.Add(function (caller: Foo, args: Args)
    {

    });

    Assert.AreEqual(1, event.Count());
    Assert.IsFalse(event.IsEmpty());

    event.Add(function (caller: Foo, args: Args)
    {
        
    });

    Assert.AreEqual(2, event.Count());
    Assert.IsFalse(event.IsEmpty());

    event.Clear();
    Assert.AreEqual(0, event.Count());
    Assert.IsTrue(event.IsEmpty());
});


unitTest.Run();