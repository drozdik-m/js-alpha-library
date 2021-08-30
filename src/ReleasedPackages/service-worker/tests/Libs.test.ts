import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { File, FileType } from "../src/Libs/WorkerFile";

let unitTest = new UnitTest("Service worker libs");

unitTest.AddTestCase("File type", function ()
{
    Assert.AreEqual(FileType.IMAGE, new File("xxx.jpg").GetFileType())
    Assert.AreEqual(FileType.STYLE, new File("xxx.css").GetFileType())
    Assert.AreEqual(FileType.SCRIPT, new File("xxx.js").GetFileType())
    Assert.AreEqual(FileType.HTML, new File("xxx.html").GetFileType())
    Assert.AreEqual(FileType.UNKNOWN, new File("xxx.asdasda").GetFileType())
});

unitTest.Run();