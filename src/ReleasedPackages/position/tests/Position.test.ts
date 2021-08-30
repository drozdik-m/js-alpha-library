import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { Position } from "../src/Position";

let unitTest = new UnitTest("Position");

unitTest.AddTestCase("Constructor", function ()
{
    let p = new Position(10, 20);
    Assert.AreEqual(10, p.Left());
    Assert.AreEqual(20, p.Top());
});