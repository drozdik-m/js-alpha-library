import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { UUID } from "../src/UUID";


const unitTest = new UnitTest("UUID");

unitTest.AddTestCase("Uniqueness test", function ()
{
    const results: string[] = [];
    let i = 0;

    for (; i < 1000; i++)
        results.push(UUID.Create().ToString());

    const uniqueArray = results.filter(function (value, index, self)
    {
        return self.indexOf(value) === index;
    });

    Assert.AreEqual(1000, uniqueArray.length);
});


unitTest.Run();