import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { Version } from "../src/Version";

let unitTest = new UnitTest("Version");

unitTest.AddTestCase("Getters", function ()
{
    let version = new Version(1, 2, 3);
    Assert.AreEqual(1, version.Major());
    Assert.AreEqual(2, version.Minor());
    Assert.AreEqual(3, version.Patch());
});

unitTest.AddTestCase("Comparator patch", function ()
{
    let version1 = new Version(1, 2, 3);
    let version2 = new Version(1, 2, 4);
    let version3 = new Version(1, 2, 3);
    let comparator = version1.GetComparator();

    Assert.AreEqual(-1, comparator(version1, version2));
    Assert.AreEqual(1, comparator(version2, version1));
    Assert.AreEqual(0, comparator(version3, version1));
});

unitTest.AddTestCase("Comparator minor", function ()
{
    let version1 = new Version(1, 2, 3);
    let version2 = new Version(1, 3, 0);
    let version3 = new Version(1, 2, 3);
    let comparator = version1.GetComparator();

    Assert.AreEqual(-1, comparator(version1, version2));
    Assert.AreEqual(1, comparator(version2, version1));
    Assert.AreEqual(0, comparator(version3, version1));
});

unitTest.AddTestCase("Comparator major", function ()
{
    let version1 = new Version(1, 2, 0);
    let version2 = new Version(2, 1, 0);
    let version3 = new Version(1, 2, 0);
    let comparator = version1.GetComparator();

    Assert.AreEqual(-1, comparator(version1, version2));
    Assert.AreEqual(1, comparator(version2, version1));
    Assert.AreEqual(0, comparator(version3, version1));
});

unitTest.AddTestCase("Compare to", function ()
{
    let version1 = new Version(1, 2, 3);
    let version2 = new Version(1, 2, 4);
    let version3 = new Version(1, 2, 3);
    let comparator = version1.GetComparator();

    Assert.AreEqual(-1, version1.CompareTo(version2));
    Assert.AreEqual(1, version2.CompareTo(version1));
    Assert.AreEqual(0, version1.CompareTo(version3));
});

unitTest.AddTestCase("Equal", function ()
{
    let version1 = new Version(1, 2, 3);
    let version2 = new Version(1, 2, 4);
    let version3 = new Version(1, 2, 3);
    let comparator = version1.GetComparator();

    Assert.IsFalse(version1.Equals(version2));
    Assert.IsTrue(version1.Equals(version3));
    Assert.IsFalse(version2.Equals(version3));
    Assert.IsFalse(version2.Equals(version1));
    Assert.IsTrue(version3.Equals(version1));
    Assert.IsFalse(version3.Equals(version2));
});

unitTest.AddTestCase("Less than", function ()
{
    let version1 = new Version(1, 2, 3);
    let version2 = new Version(1, 2, 4);
    let version3 = new Version(1, 2, 3);
    let comparator = version1.GetComparator();

    Assert.IsTrue(version1.LessThan(version2));
    Assert.IsFalse(version1.LessThan(version3)); 
    Assert.IsFalse(version2.LessThan(version3));
    Assert.IsFalse(version2.LessThan(version1));
    Assert.IsFalse(version3.LessThan(version1));
    Assert.IsTrue(version3.LessThan(version2));
});

unitTest.AddTestCase("Greater than", function ()
{
    let version1 = new Version(1, 2, 3);
    let version2 = new Version(1, 2, 4);
    let version3 = new Version(1, 2, 3);
    let comparator = version1.GetComparator();

    Assert.IsFalse(version1.GreaterThan(version2));
    Assert.IsFalse(version1.GreaterThan(version3));
    Assert.IsTrue(version2.GreaterThan(version3));
    Assert.IsTrue(version2.GreaterThan(version1));
    Assert.IsFalse(version3.GreaterThan(version1));
    Assert.IsFalse(version3.GreaterThan(version2));
});

unitTest.AddTestCase("To string", function ()
{
    Assert.AreEqual("1.2.3", new Version(1, 2, 3).toString());
    Assert.AreEqual("3.2.1", new Version(3, 2, 1).toString());
});

unitTest.AddTestCase("From string", function ()
{
    Assert.AreEqual("1.2.3", Version.FromString("1.2.3").toString());
    Assert.AreEqual("1.2.0", Version.FromString("1.2").toString());
    Assert.AreEqual("1.0.0", Version.FromString("1").toString());

    Assert.AreEqual("1.2.3", Version.FromString("1.2.3.4.5.6").toString());
    Assert.AreEqual("1.1.-1", Version.FromString("1.1.x").toString());
    Assert.AreEqual("1.-1.-1", Version.FromString("1.x.x").toString()); 
    Assert.AreEqual("-1.-1.-1", Version.FromString("x.x.x").toString()); 
    Assert.AreEqual("-1.-1.-1", Version.FromString("y.x..").toString());
    Assert.AreEqual("-1.0.0", Version.FromString("wtf").toString());
});


unitTest.Run();

