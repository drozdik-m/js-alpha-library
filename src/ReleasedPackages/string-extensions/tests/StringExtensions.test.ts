import { UnitTest, Assert } from "@drozdik.m/unit-test";
import "../AllExtensions";

let unitTest = new UnitTest("String Extensions");

unitTest.AddTestCase("IsEmail", function ()
{
    Assert.IsTrue("yo@aa.bb".IsEmail());
    Assert.IsTrue("yo@test.nic".IsEmail());
    Assert.IsTrue(!"test@a.b".IsEmail());
    Assert.IsTrue(!"@sdf.cu".IsEmail());
    Assert.IsTrue(!"test@.bruh".IsEmail());
    Assert.IsTrue(!"test@test.".IsEmail());
    Assert.IsTrue(!"test@.".IsEmail());
    Assert.IsTrue(!"test@".IsEmail());
    Assert.IsTrue(!"test".IsEmail());
});

unitTest.AddTestCase("EndsWith", function ()
{
    let string1 = "abcdefgaa";
    Assert.IsTrue(string1.EndsWith("abcdefgaa"));
    Assert.IsTrue(string1.EndsWith("fgaa"));
    Assert.IsTrue(string1.EndsWith(""));
    Assert.IsFalse(string1.EndsWith("abcdefgaaa"));
    Assert.IsFalse(string1.EndsWith("g"));
});


unitTest.AddTestCase("ExtractFileExtension", function ()
{
    Assert.AreEqual("", "".ExtractFileExtension());
    Assert.AreEqual("", ".".ExtractFileExtension());
    Assert.AreEqual("", "asdav".ExtractFileExtension());
    Assert.AreEqual("", "asdav.".ExtractFileExtension());
    Assert.AreEqual("", "asdav.dsfgdf.".ExtractFileExtension());

    Assert.AreEqual("dsfgdf", ".dsfgdf".ExtractFileExtension());
    Assert.AreEqual("dsfgdf", "asdav.dsfgdf".ExtractFileExtension());
    Assert.AreEqual("asff", "asdav.dsfgdf.asd.asff".ExtractFileExtension());
});

unitTest.AddTestCase("ReplaceAll", function ()
{
    const string1 = "abcdefgaa";
    Assert.IsTrue(string1.ReplaceAll("a", "b") === "bbcdefgbb");
    Assert.IsTrue(string1.ReplaceAll("aa", "b") === "abcdefgb");
    Assert.IsTrue(string1.ReplaceAll("aaa", "b") === "abcdefgaa");
});

unitTest.AddTestCase("ExtractYoutubeId", function ()
{
    //EXTRACT YOUTUBE ID
    Assert.IsTrue("https://www.youtube.com/watch?v=jzhjHrerCLw".ExtractYoutubeId() === "jzhjHrerCLw");
    Assert.IsTrue("https://www.youtube.com/watch?v=jzhjHrerCLw&t=10".ExtractYoutubeId() === "jzhjHrerCLw");
});

unitTest.AddTestCase("ExtractNameFromPath", function ()
{
    //EXTRACT FILE NAME
    Assert.IsTrue("C:\\sum folder\\file.png".ExtractNameFromPath() == "file.png");
    Assert.IsTrue("file.png".ExtractNameFromPath() == "file.png");
});



unitTest.Run();