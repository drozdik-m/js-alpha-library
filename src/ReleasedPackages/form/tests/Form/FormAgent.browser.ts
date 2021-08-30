import { BrowserTestAgent } from "@drozdik.m/web-unit-test";
import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { Form } from "../../src/form";
import { NativeFormInput } from "../../inputs/NativeFormInput";
import { FormValidation_MustHaveValue } from "../../validation/FormValidation_MustHaveValue";

let unitTest = new UnitTest("Form");

document.body.insertAdjacentHTML("beforeend", `
        <div style="margin: 1rem;">
        <form class="form commonForm" id="form1">

            <div class="formBlock">
                <label for="name">Name</label>
                <input type="text" id="name" />
                <span class="inputDescription">This is your name (duh)</span>
            </div>

            <div class="formBlock">
                <label for="email">Email</label>
                <input type="text" id="email" />
            </div>

            <div class="formBlock recaptchaFormBlock">
                <div id="recaptcha1"></div>
            </div>

            <div class="formBlock">
                <label for="file">File</label>
                <input type="file" multiple id="file" />
            </div>

            <div class="formBlock">
                <label for="fileMulti">File multi</label>
                <input type="file" multiple id="fileMulti" />
            </div>

            <div class="formBlock checkboxFormBlock">
                <label for="terms">Terms</label>
                <input type="checkbox" id="terms" />
            </div>

            <div class="formBlock">
                <label for="pass1">Pass1</label>
                <input type="text" id="pass1" />
            </div>

            <div class="formBlock">
                <label for="pass2">Pass2</label>
                <input type="text" id="pass2" />
            </div>

            <div class="formBlock">
                <label for="city">City</label>
                <select id="city">
                    <option value="">Liberec</option>
                    <option value="">England</option>
                </select>
            </div>

            <div class="formBlock">
                <label for="message">Message</label>
                <textarea id="message"></textarea>
            </div>

            <input type="submit" value="Submit" />
            <input type="button" value="Reset" id="reset1" />
        </form>
`);


unitTest.AddSyncTestCase("Simple validation", function ()
{
    let form1 = new Form("form1")
    let input1 = new NativeFormInput(document.getElementById("name"))
    let validation1 = new FormValidation_MustHaveValue(input1, "Must have value")
    input1.AddValidation(validation1)

    validation1.Validate()
    Assert.IsFalse(input1.IsValid())
});

let browserTestAgent = new BrowserTestAgent(unitTest);
browserTestAgent.Run();