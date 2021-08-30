import { BrowserTestAgent } from "@drozdik.m/web-unit-test";
import { UnitTest, Assert } from "@drozdik.m/unit-test";

import { ValuePair } from "@drozdik.m/pair";
import { List } from "@drozdik.m/double-linked-list";
import { BonsaiMarkupElement_Unpaired } from "../src/bonsaiMarkup/bonsaiMarkupElement_Unpaired";
import { BonsaiMarkupSettings } from "../src/bonsaiMarkup/bonsaiMarkupSettings";
import { BonsaiMarkupElement_Paired } from "../src/bonsaiMarkup/bonsaiMarkupElement_Paired";
import { BonsaiMarkupElement_Link } from "../src/bonsaiMarkup/bonsaiMarkupElement_Link";
import { BonsaiMarkup } from "../src/bonsaiMarkup/bonsaiMarkup";


let unitTest = new UnitTest("Bonsai Markup");

unitTest.AddSyncTestCase("Unpaired syntax", function ()
{
    let unpairedSyntax1 = new BonsaiMarkupElement_Unpaired("&&", "<br />");
    Assert.IsTrue(unpairedSyntax1.ToHTML("test && test") === "test <br /> test");
    Assert.IsTrue(unpairedSyntax1.ToHTML("test&&test") === "test<br />test");
    Assert.IsTrue(unpairedSyntax1.ToHTML("&& test && test &&") === "<br /> test <br /> test <br />");
    Assert.IsTrue(unpairedSyntax1.ToHTML(`${BonsaiMarkupSettings.escapeCharMarkup}&& test && test &&`) === `${BonsaiMarkupSettings.escapeCharHTML}&& test <br /> test <br />`);
    Assert.IsTrue(unpairedSyntax1.ToHTML(`test ${BonsaiMarkupSettings.escapeCharMarkup}&& test`) === `test ${BonsaiMarkupSettings.escapeCharHTML}&& test`);
    Assert.IsTrue(unpairedSyntax1.ToHTML(`test${BonsaiMarkupSettings.escapeCharMarkup}&&test`) === `test${BonsaiMarkupSettings.escapeCharHTML}&&test`);
    Assert.IsTrue(unpairedSyntax1.ToHTML(`test/${BonsaiMarkupSettings.escapeCharMarkup}&&test`) === `test/${BonsaiMarkupSettings.escapeCharHTML}&&test`);
    Assert.IsTrue(unpairedSyntax1.ToHTML("t<>est&&tes<>t") === "t<>est<br />tes<>t");
    Assert.IsTrue(unpairedSyntax1.ToHTML("test &&& test") === "test <br />& test");

    Assert.IsTrue(unpairedSyntax1.ToMarkup("test <br /> test") === "test && test");
    Assert.IsTrue(unpairedSyntax1.ToMarkup("test<br />test") === "test&&test");
    Assert.IsTrue(unpairedSyntax1.ToMarkup("<br /> test <br /> test <br />") === "&& test && test &&");
    Assert.IsTrue(unpairedSyntax1.ToMarkup("test<br />test") === "test&&test");
    Assert.IsTrue(unpairedSyntax1.ToMarkup(`${BonsaiMarkupSettings.escapeCharHTML}&& test <br /> test <br />`) === `${BonsaiMarkupSettings.escapeCharMarkup}&& test && test &&`);
    Assert.IsTrue(unpairedSyntax1.ToMarkup(`test ${BonsaiMarkupSettings.escapeCharHTML}&& test`) === `test ${BonsaiMarkupSettings.escapeCharMarkup}&& test`);
    Assert.IsTrue(unpairedSyntax1.ToMarkup(`test${BonsaiMarkupSettings.escapeCharHTML}&&test`) === `test${BonsaiMarkupSettings.escapeCharMarkup}&&test`);
    Assert.IsTrue(unpairedSyntax1.ToMarkup(`test${BonsaiMarkupSettings.escapeCharHTML}${BonsaiMarkupSettings.escapeCharHTML}&&test`) === `test/${BonsaiMarkupSettings.escapeCharMarkup}&&test`);
    Assert.IsTrue(unpairedSyntax1.ToMarkup("t<>est<br />tes<>t") === "t<>est&&tes<>t");
    Assert.IsTrue(unpairedSyntax1.ToMarkup("test <br />& test") === "test &&& test");
});



unitTest.AddSyncTestCase("Paired syntax", function ()
{
    //PAIRED SYNTAX
    let pairedSyntax1 = new BonsaiMarkupElement_Paired(new ValuePair<string, string>("**", "**"), new ValuePair<string, string>("<strong>", "</strong>"));
    Assert.IsTrue(pairedSyntax1.ToHTML(`** test ** <>test ** ${BonsaiMarkupSettings.escapeCharMarkup}** test< **`) === `<strong> test </strong> <>test <strong> ${BonsaiMarkupSettings.escapeCharHTML}** test< </strong>`);
    Assert.IsTrue(pairedSyntax1.ToMarkup(`<strong> test </strong> <>test <strong> ${BonsaiMarkupSettings.escapeCharHTML}** test< </strong>`) === `** test ** <>test ** ${BonsaiMarkupSettings.escapeCharMarkup}** test< **`);

    let pairedSyntax2 = new BonsaiMarkupElement_Paired(new ValuePair<string, string>("!*", "**"), new ValuePair<string, string>("<strong>", "</strong>"));
    Assert.IsTrue(pairedSyntax2.ToHTML(`!* test ** <>test !* ${BonsaiMarkupSettings.escapeCharMarkup}!* test< !*`) === `<strong> test </strong> <>test <strong> ${BonsaiMarkupSettings.escapeCharHTML}!* test< </strong>`);
    Assert.IsTrue(pairedSyntax2.ToMarkup(`<strong> test </strong> <>test <strong> ${BonsaiMarkupSettings.escapeCharHTML}!* test< </strong>`) === `!* test ** <>test !* ${BonsaiMarkupSettings.escapeCharMarkup}!* test< **`);   
});

unitTest.AddSyncTestCase("Link", function ()
{
    let linkMarkup1 = new BonsaiMarkupElement_Link();
    Assert.IsTrue(linkMarkup1.ToHTML("basic text") == "basic text");
    Assert.IsTrue(linkMarkup1.ToHTML(`test ${BonsaiMarkupSettings.escapeCharMarkup}@@ test`) == `test ${BonsaiMarkupSettings.escapeCharHTML}@@ test`);
    Assert.IsTrue(linkMarkup1.ToHTML(`test ${BonsaiMarkupSettings.escapeCharMarkup}@@ test @@link@@`) == `test ${BonsaiMarkupSettings.escapeCharHTML}@@ test <a>link</a>`);
    Assert.IsTrue(linkMarkup1.ToHTML(`test ${BonsaiMarkupSettings.escapeCharMarkup}@@ test @@[google.com]link@@`) == `test ${BonsaiMarkupSettings.escapeCharHTML}@@ test <a href="google.com" title="Link: google.com" target="_blank">link</a>`);
    Assert.IsTrue(linkMarkup1.ToHTML(`test ${BonsaiMarkupSettings.escapeCharMarkup}@@ test @@[google.com]{Google odkaz}link@@`) == `test ${BonsaiMarkupSettings.escapeCharHTML}@@ test <a href="google.com" title="Google odkaz" target="_blank">link</a>`);
    Assert.IsTrue(linkMarkup1.ToHTML(`test ${BonsaiMarkupSettings.escapeCharMarkup}@@ test @@[google.com]{Google odkaz}|_self|link@@`) == `test ${BonsaiMarkupSettings.escapeCharHTML}@@ test <a href="google.com" title="Google odkaz" target="_self">link</a>`);
    Assert.IsTrue(linkMarkup1.ToHTML(`@@link1@@ and ${BonsaiMarkupSettings.escapeCharMarkup}@@ @@link2@@`) == `<a>link1</a> and ${BonsaiMarkupSettings.escapeCharHTML}@@ <a>link2</a>`);
    Assert.IsTrue(linkMarkup1.ToHTML("@@|your mum|{title}[url]sum link@@") == `<a href="url" title="title" target="your mum">sum link</a>`);

    Assert.IsTrue(linkMarkup1.ToMarkup("basic text") == "basic text");
    Assert.IsTrue(linkMarkup1.ToMarkup(`test ${BonsaiMarkupSettings.escapeCharHTML}@@ test`) == `test ${BonsaiMarkupSettings.escapeCharMarkup}@@ test`);
    Assert.IsTrue(linkMarkup1.ToMarkup(`test ${BonsaiMarkupSettings.escapeCharHTML}@@ test <a>link</a>`) == `test ${BonsaiMarkupSettings.escapeCharMarkup}@@ test @@link@@`);
    Assert.IsTrue(linkMarkup1.ToMarkup(`test ${BonsaiMarkupSettings.escapeCharHTML}@@ test <a href="google.com" title="Link: google.com" target="_blank">link</a>`) == `test ${BonsaiMarkupSettings.escapeCharMarkup}@@ test @@[google.com]{Link: google.com}|_blank|link@@`);
    Assert.IsTrue(linkMarkup1.ToMarkup(`test ${BonsaiMarkupSettings.escapeCharHTML}@@ test <a href="google.com" title="Google odkaz" target="_blank">link</a>`) == `test ${BonsaiMarkupSettings.escapeCharMarkup}@@ test @@[google.com]{Google odkaz}|_blank|link@@`);
    Assert.IsTrue(linkMarkup1.ToMarkup(`test ${BonsaiMarkupSettings.escapeCharHTML}@@ test <a href="google.com" title="Google odkaz" target="_self">link</a>`) == `test ${BonsaiMarkupSettings.escapeCharMarkup}@@ test @@[google.com]{Google odkaz}|_self|link@@`);
    Assert.IsTrue(linkMarkup1.ToMarkup(`<a>link1</a> and ${BonsaiMarkupSettings.escapeCharHTML}@@ <a>link2</a>`) == `@@link1@@ and ${BonsaiMarkupSettings.escapeCharMarkup}@@ @@link2@@`);
    Assert.IsTrue(linkMarkup1.ToMarkup(`<a target="your mum"   href="url" title="title" >sum link</a>`) == "@@[url]{title}|your mum|sum link@@");
});

unitTest.AddSyncTestCase("Syntax check", function ()
{
    //SYNTAX CHECK
    Assert.IsTrue(BonsaiMarkup.ValidateMarkup(`**test**`));
    Assert.IsTrue(BonsaiMarkup.ValidateMarkup(`**test__test__**`));
    Assert.IsTrue(BonsaiMarkup.ValidateMarkup(`____`));
    Assert.IsTrue(!BonsaiMarkup.ValidateMarkup(`test ** test__test**__`));
    Assert.IsTrue(!BonsaiMarkup.ValidateMarkup(`**__**__`));
    Assert.IsTrue(!BonsaiMarkup.ValidateMarkup(`__**__**`));
    Assert.IsTrue(BonsaiMarkup.ValidateMarkup(`sum ** rundum @@tuxt@@ **`));
    Assert.IsTrue(!BonsaiMarkup.ValidateMarkup(`sum ** rundum tuxt@@ **`));
    Assert.IsTrue(!BonsaiMarkup.ValidateMarkup(`test ** test`));
});

unitTest.AddSyncTestCase("To html", function ()
{
    Assert.IsTrue(BonsaiMarkup.ToHTML("** test **") === "<strong> test </strong>");
    Assert.IsTrue(BonsaiMarkup.ToHTML("**__test__**") === "<strong><em>test</em></strong>");
    Assert.IsTrue(BonsaiMarkup.ToHTML("**__test<>test__**") === "<strong><em>test&lt;&gt;test</em></strong>");
    Assert.IsTrue(BonsaiMarkup.ToHTML(`${BonsaiMarkupSettings.escapeCharMarkup}** **__test<>test__**`) === `${BonsaiMarkupSettings.escapeCharHTML}** <strong><em>test&lt;&gt;test</em></strong>`);
    Assert.IsTrue(BonsaiMarkup.ToHTML("@@[google.com]**test**@@") === `<a href="google.com" title="Link: google.com" target="_blank"><strong>test</strong></a>`);
});

unitTest.AddSyncTestCase("To markup", function ()
{
    //TO MARKUP
    Assert.IsTrue(BonsaiMarkup.ToMarkup("<strong> test </strong>") === "** test **");
    Assert.IsTrue(BonsaiMarkup.ToMarkup("<strong><em>test</em></strong>") === "**__test__**");
    Assert.IsTrue(BonsaiMarkup.ToMarkup("<strong><em>test&lt;&gt;test</em></strong>") === "**__test<>test__**");
    Assert.IsTrue(BonsaiMarkup.ToMarkup(`${BonsaiMarkupSettings.escapeCharHTML}** <strong><em>test&lt;&gt;test</em></strong>`) === `${BonsaiMarkupSettings.escapeCharMarkup}** **__test<>test__**`);
    Assert.IsTrue(BonsaiMarkup.ToMarkup(`<a href="google.com" title="Link: google.com" target="_blank"><strong>test</strong></a>`) === "@@[google.com]{Link: google.com}|_blank|**test**@@");
});