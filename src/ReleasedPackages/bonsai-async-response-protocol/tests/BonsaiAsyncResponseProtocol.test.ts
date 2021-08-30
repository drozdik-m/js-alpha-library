import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { BonsaiAsyncResponseProtocolMessage } from "../src/BonsaiAsyncResponseProtocolMessage";

let unitTest = new UnitTest("Bonsai Async Response Protocol");

unitTest.AddTestCase("FromJSON simple", function ()
{
    let message = BonsaiAsyncResponseProtocolMessage.FromJSON(`{
        "protocol": "barp",
        "version": "1.0.0",
        "status": {
            "hasErrors": false
        },
        "content": "this-is-content"
    }`);

    Assert.AreEqual("1.0.0", message.GetVersion().toString());
    Assert.IsFalse(message.HasErrors());
    Assert.IsTrue(message.GetContent().IsDefined());
    Assert.IsFalse(message.GetContent().IsEmpty());
    Assert.AreEqual("this-is-content", message.GetContent().Content());
    Assert.IsTrue(message.GetInfoChannel().IsEmpty());
    Assert.IsTrue(message.GetErrorsChannel().IsEmpty());
    Assert.IsTrue(message.GetWarningsChannel().IsEmpty());
    Assert.IsTrue(message.GetSuccessesChannel().IsEmpty());
    
});

unitTest.AddTestCase("FromJSON wrong version", function ()
{
    try
    {
        let message = BonsaiAsyncResponseProtocolMessage.FromJSON(`{
            "protocol": "barp",
            "status": {
                "hasErrors": false
            },
            "content": "this-is-content"
        }`);
        Assert.Fail();
    }
    catch{

    }
    try
    {
        let message = BonsaiAsyncResponseProtocolMessage.FromJSON(`{
            "protocol": "barp",
            "version": "0.0.0",
            "status": {
                "hasErrors": false
            },
            "content": "this-is-content"
        }`);
        Assert.Fail();
    }
    catch{

    }
});

unitTest.AddTestCase("FromJSON wrong protocol", function ()
{
    try
    {
        let message = BonsaiAsyncResponseProtocolMessage.FromJSON(`{
            "protocol": "XxX",
            "version": "0.0.0",
            "status": {
                "hasErrors": false
            },
            "content": "this-is-content"
        }`);
        Assert.Fail();
    }
    catch{

    }

    try
    {
        let message = BonsaiAsyncResponseProtocolMessage.FromJSON(`{
            "version": "1.0.0",
            "status": {
                "hasErrors": false
            },
            "content": "this-is-content"
        }`);
        Assert.Fail();
    }
    catch{

    }
});

unitTest.AddTestCase("FromJSON missing error flag or status", function ()
{
    try
    {
        let message = BonsaiAsyncResponseProtocolMessage.FromJSON(`{
            "protocol": "barp",
            "version": "1.0.0",
            "status": {
            
            },
            "content": "this-is-content"
        }`);
        Assert.Fail();
    }
    catch{

    }

    try
    {
        let message = BonsaiAsyncResponseProtocolMessage.FromJSON(`{
            "protocol": "barp",
            "version": "1.0.0",
            "content": "this-is-content"
        }`);
        Assert.Fail();
    }
    catch{

    }
});

unitTest.AddTestCase("FromJSON channels", function ()
{
    let message = BonsaiAsyncResponseProtocolMessage.FromJSON(`{
        "protocol": "barp",
        "version": "1.0.0",
        "status": {
            "hasErrors": false,
            "infos": {
                "messages": ["1", "2"],
                "content": "this-is-content"
            },
            "successes": {
                "messages": ["1", "2"],
                "content": "this-is-content"
            },
            "warnings": {
                "messages": ["1", "2"],
                "content": "this-is-content"
            },
            "errors": {
                "messages": ["1", "2"],
                "content": "this-is-content"
            }
        }
    }`);

    Assert.AreEqual("1.0.0", message.GetVersion().toString());
    Assert.IsFalse(message.HasErrors());
    Assert.IsFalse(message.GetContent().IsDefined());
    Assert.IsTrue(message.GetContent().IsEmpty());

    Assert.IsFalse(message.GetInfoChannel().IsEmpty());
    Assert.IsFalse(message.GetErrorsChannel().IsEmpty());
    Assert.IsFalse(message.GetWarningsChannel().IsEmpty());
    Assert.IsFalse(message.GetSuccessesChannel().IsEmpty());

    Assert.AreEqual("infos", message.GetInfoChannel().Get().GetChannelName());
    Assert.AreEqual("this-is-content", message.GetInfoChannel().Get().GetContent());
    Assert.AreEqual("1", message.GetInfoChannel().Get().GetMessages()[0]);
    Assert.AreEqual("2", message.GetInfoChannel().Get().GetMessages()[1]);

    Assert.AreEqual("errors", message.GetErrorsChannel().Get().GetChannelName());
    Assert.AreEqual("this-is-content", message.GetErrorsChannel().Get().GetContent());
    Assert.AreEqual("1", message.GetErrorsChannel().Get().GetMessages()[0]);
    Assert.AreEqual("2", message.GetErrorsChannel().Get().GetMessages()[1]);

    Assert.AreEqual("successes", message.GetSuccessesChannel().Get().GetChannelName());
    Assert.AreEqual("this-is-content", message.GetSuccessesChannel().Get().GetContent());
    Assert.AreEqual("1", message.GetSuccessesChannel().Get().GetMessages()[0]);
    Assert.AreEqual("2", message.GetSuccessesChannel().Get().GetMessages()[1]);

    Assert.AreEqual("warnings", message.GetWarningsChannel().Get().GetChannelName());
    Assert.AreEqual("this-is-content", message.GetWarningsChannel().Get().GetContent());
    Assert.AreEqual("1", message.GetWarningsChannel().Get().GetMessages()[0]);
    Assert.AreEqual("2", message.GetWarningsChannel().Get().GetMessages()[1]);
});

unitTest.AddTestCase("FromJSON wrong channels", function ()
{
    try
    {
        let message = BonsaiAsyncResponseProtocolMessage.FromJSON(`{
        "protocol": "barp",
        "version": "1.0.0",
        "status": {
                "hasErrors": false,
                "infos": {
                    "content": "this-is-content"
                }
            },
            "content": "this-is-content"
        }`);
        Assert.Fail();
    }
    catch {

    }

    try
    {
        let message = BonsaiAsyncResponseProtocolMessage.FromJSON(`{
        "protocol": "barp",
        "version": "1.0.0",
        "status": {
                "hasErrors": false,
                "successes": {
                    "content": "this-is-content"
                }
            },
            "content": "this-is-content"
        }`);
        Assert.Fail();
    }
    catch {

    }

    try
    {
        let message = BonsaiAsyncResponseProtocolMessage.FromJSON(`{
        "protocol": "barp",
        "version": "1.0.0",
        "status": {
                "hasErrors": false,
                "warnings": {
                    "content": "this-is-content"
                }
            },
            "content": "this-is-content"
        }`);
        Assert.Fail();
    }
    catch {

    }

    try
    {
        let message = BonsaiAsyncResponseProtocolMessage.FromJSON(`{
        "protocol": "barp",
        "version": "1.0.0",
        "status": {
                "hasErrors": false,
                "errors": {
                    "content": "this-is-content"
                }
            },
            "content": "this-is-content"
        }`);
        Assert.Fail();
    }
    catch {

    }

    
});

unitTest.Run();

