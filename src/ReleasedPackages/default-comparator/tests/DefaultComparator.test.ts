import { DefaultComparator } from "../src/DefaultComparator";
import { UnitTest, Assert } from "@drozdik.m/unit-test";

let unitTest = new UnitTest("Default comparator");


unitTest.AddTestCase("Number", function ()
{
    Assert.AreEqual(DefaultComparator<number>(1, 1), 0);
    Assert.AreEqual(DefaultComparator<number>(1, 2), -1);
    Assert.AreEqual(DefaultComparator<number>(1, 3), -1);
    Assert.AreEqual(DefaultComparator<number>(1, 0), 1);
    Assert.AreEqual(DefaultComparator<number>(1, -1), 1);
});

unitTest.AddTestCase("String", function ()
{
    Assert.AreEqual(DefaultComparator<string>("ab", "a"), 1);
    Assert.AreEqual(DefaultComparator<string>("a", "b"), -1);
    Assert.AreEqual(DefaultComparator<string>("a", "a"), 0);
});


unitTest.Run();