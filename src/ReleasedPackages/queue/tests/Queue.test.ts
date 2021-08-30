import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { Queue } from "../src/Queue";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";

let unitTest = new UnitTest("Queue");

unitTest.AddTestCase("Enqueue, Front, Back", function ()
{
    let queue1 = new Queue<number>();

    Assert.IsNull(queue1.Front());
    Assert.IsNull(queue1.Back());

    queue1.Enqueue(0);

    Assert.AreEqual(0, queue1.Front());
    Assert.AreEqual(0, queue1.Back());

    queue1.Enqueue(1);

    Assert.AreEqual(0, queue1.Front());
    Assert.AreEqual(1, queue1.Back());

    queue1.Enqueue(2);

    Assert.AreEqual(0, queue1.Front());
    Assert.AreEqual(2, queue1.Back());
});


unitTest.AddTestCase("Dequeue", function ()
{
    let queue1 = new Queue<number>();

    Assert.IsNull(queue1.Front());
    Assert.IsNull(queue1.Back());

    Assert.IsNull(queue1.Dequeue());

    queue1.Enqueue(0);
    queue1.Enqueue(1);
    queue1.Enqueue(2);

    Assert.AreEqual(0, queue1.Dequeue());
    Assert.AreEqual(1, queue1.Dequeue());
    Assert.AreEqual(2, queue1.Dequeue());
    Assert.IsNull(queue1.Dequeue());
});

unitTest.AddTestCase("Clear", function ()
{
    let queue1 = new Queue<number>();
    queue1.Enqueue(0);
    queue1.Enqueue(1);
    queue1.Enqueue(2);

    queue1.Clear();

    Assert.IsNull(queue1.Front());
    Assert.IsNull(queue1.Back());
    Assert.IsNull(queue1.Dequeue());
});

unitTest.AddTestCase("Dispose", function ()
{
    let queue1 = new Queue<number>();
    queue1.Enqueue(0);
    queue1.Enqueue(1);
    queue1.Enqueue(2);

    queue1.Dispose();

    Assert.IsNull(queue1.Front());
    Assert.IsNull(queue1.Back());
    Assert.IsNull(queue1.Dequeue());
});

unitTest.AddTestCase("Count", function ()
{
    let queue1 = new Queue<number>();

    Assert.AreEqual(0, queue1.Count());

    queue1.Enqueue(0);
    Assert.AreEqual(1, queue1.Count());

    queue1.Enqueue(1);
    Assert.AreEqual(2, queue1.Count());

    queue1.Enqueue(2);
    Assert.AreEqual(3, queue1.Count());
});

unitTest.AddTestCase("Clone", function ()
{
    let queue1 = new Queue<number>();

    queue1.Enqueue(0);
    queue1.Enqueue(1);
    queue1.Enqueue(2);

    let queue2 = queue1.Clone();

    Assert.AreEqual(0, queue1.Dequeue());
    Assert.AreEqual(1, queue1.Dequeue());
    Assert.AreEqual(2, queue1.Dequeue());
    Assert.IsNull(queue1.Dequeue());

    Assert.AreEqual(0, queue2.Dequeue());
    Assert.AreEqual(1, queue2.Dequeue());
    Assert.AreEqual(2, queue2.Dequeue());
    Assert.IsNull(queue2.Dequeue());
});

unitTest.AddTestCase("Clone, IClonable", function ()
{
    class FooCmp implements IClonable<FooCmp>
    {
        number: number;
        constructor(n: number)
        {
            this.number = n;
        }

        Clone(): FooCmp
        {
            return new FooCmp(this.number);
        }
    }

    let queue1 = new Queue<FooCmp>();

    queue1.Enqueue(new FooCmp(0));
    queue1.Enqueue(new FooCmp(1));
    queue1.Enqueue(new FooCmp(2));

    let queue2 = queue1.Clone();

    queue1.Front().number = 10;

    Assert.AreEqual(10, queue1.Dequeue().number);
    Assert.AreEqual(1, queue1.Dequeue().number);
    Assert.AreEqual(2, queue1.Dequeue().number);
    Assert.IsNull(queue1.Dequeue());

    Assert.AreEqual(0, queue2.Dequeue().number);
    Assert.AreEqual(1, queue2.Dequeue().number);
    Assert.AreEqual(2, queue2.Dequeue().number);
    Assert.IsNull(queue2.Dequeue());
});

unitTest.AddTestCase("All in one", function ()
{
    //Numbers
    let queue1 = new Queue<number>();
    for (let i = 0; i < 10; i++)
        queue1.Enqueue(i);
    Assert.Assert(queue1.Back() === 9);
    Assert.Assert(!queue1.IsEmpty());
    Assert.Assert(queue1.Count() === 10);
    for (let i = 0; i < 10; i++)
    {
        Assert.Assert(queue1.Front() === i);
        queue1.Dequeue();
    }
    Assert.Assert(queue1.IsEmpty());
    for (let i = 0; i < 10; i++)
        queue1.Enqueue(i);
    Assert.Assert(!queue1.IsEmpty());
    queue1.Clear()
    Assert.Assert(queue1.IsEmpty());
    Assert.Assert(queue1.Front() === null);
    Assert.Assert(queue1.Back() === null);
    queue1.Enqueue(1);
    Assert.Assert(queue1.Front() === 1);
    Assert.Assert(queue1.Back() === 1);
    queue1.Dequeue();
    Assert.Assert(queue1.IsEmpty());
    Assert.Assert(queue1.Front() === null);
    Assert.Assert(queue1.Back() === null);

    //Strings
    let queue2 = new Queue<string>();
    for (let i = 0; i < 10; i++)
        queue2.Enqueue(i.toString());
    Assert.Assert(queue2.Back() === "9");
    Assert.Assert(!queue2.IsEmpty());
    Assert.Assert(queue2.Count() === 10);
    for (let i = 0; i < 10; i++)
    {
        Assert.Assert(queue2.Front() === i.toString());
        queue2.Dequeue();
    }
});

unitTest.Run();