import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { Stack } from "../src/Stack.js";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";
import { IComparable } from "@drozdik.m/common-interfaces/IComparable";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";

let unitTest = new UnitTest("Stack");


unitTest.AddTestCase("Push, Empty, Count, Top – Number", function ()
{
    let stack1 = new Stack<number>();
    for (let i = 0; i < 10; i++)
        stack1.Push(i);
    Assert.Assert(!stack1.IsEmpty());
    Assert.Assert(stack1.Count() === 10);
    for (let i = 9; i >= 0; i--)
    {
        Assert.Assert(stack1.Top() === i);
        stack1.Pop();
    }
    Assert.Assert(stack1.IsEmpty());
    for (let i = 0; i < 10; i++)
        stack1.Push(i);
    Assert.Assert(!stack1.IsEmpty());
    stack1.Clear();
    Assert.Assert(stack1.IsEmpty());
    Assert.Assert(stack1.Top() === null);
});


unitTest.AddTestCase("Push, Empty, Count, Top – String", function ()
{
    let stack2 = new Stack<string>();
    for (let i = 0; i < 10; i++)
        stack2.Push(i.toString());
    Assert.Assert(!stack2.IsEmpty());
    Assert.Assert(stack2.Count() === 10);
    for (let i = 9; i >= 0; i--)
    {
        Assert.Assert(stack2.Top() === i.toString());
        stack2.Pop();
    }
    Assert.Assert(stack2.IsEmpty());
    for (let i = 0; i < 10; i++)
        stack2.Push(i.toString());
    Assert.Assert(!stack2.IsEmpty());
    stack2.Clear();
    Assert.Assert(stack2.IsEmpty());
    Assert.Assert(stack2.Top() === null);
});


unitTest.AddTestCase("Build, clone", function ()
{
    //Build, clone
    let stack3 = new Stack<number>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (let i = 9; i >= 0; i--)
    {
        Assert.AreEqual(stack3.Top(), i);
        stack3.Pop();
    }
    stack3.Build([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let stack4: any = stack3.Clone();
    stack4.stackArray[0] = -10;
    for (let i = 9; i >= 0; i--)
    {
        Assert.AreEqual(stack3.Top(), i);
        stack3.Pop();
    }
    for (let i = 9; i >= 0; i--)
    {
        if (i == 0)
        {
            Assert.AreEqual(stack4.Top(), -10);
            stack4.Pop();
            continue;
        }
        Assert.AreEqual(stack4.Top(), i);
        stack4.Pop();
    }

});


unitTest.AddTestCase("Clone, IComparable, IClonable", function ()
{
    //Clone & IClonable
    class FooCmp implements IComparable<FooCmp>, IClonable<FooCmp>
    {
        number: number;
        constructor(n: number)
        {
            this.number = n;
        }
        GetComparator(): IComparator<FooCmp> 
        {
            return function (a: FooCmp, b: FooCmp): number
            {
                return b.number - a.number;
            }
        }
        Clone(): FooCmp
        {
            return new FooCmp(this.number);
        }
    }
    let stack5 = new Stack<FooCmp>()
    stack5.Push(new FooCmp(1));
    let stack5Clone = stack5.Clone();
    (<any>stack5Clone).stackArray[0].number = -1;

    Assert.AreEqual(stack5.Top().number, 1);
    Assert.AreEqual(stack5Clone.Top().number, -1);
});


unitTest.Run();