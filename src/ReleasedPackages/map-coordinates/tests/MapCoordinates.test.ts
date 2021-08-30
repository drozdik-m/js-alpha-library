import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { MapCoordinates } from "../src/mapCoordinates";

let unitTest = new UnitTest("MapCoordinates");

unitTest.AddTestCase("Constructor", function ()
{
    let mc = new MapCoordinates(10, 20);

    Assert.AreEqual(10, mc.GetLat());
    Assert.AreEqual(20, mc.GetLng());
});

unitTest.Run();