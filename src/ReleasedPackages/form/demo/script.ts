import { Form } from "../src/form";
import { NativeFormInput } from "../inputs/NativeFormInput";
import { CaptchaFormInput } from "../inputs/CaptchaFormInput";
import { FormValidation_MustHaveValue } from "../validation/FormValidation_MustHaveValue";
import { FormValidation_MustBeEmail } from "../validation/FormValidation_MustBeEmail";
import { RecaptchaV2 } from "@drozdik.m/recaptcha";
import { FormValidation_FileCountLimit } from "../validation/formValidation_FileCountLimit";
import { FormValidation_FileSizeLimit } from "../validation/formValidation_FileSizeLimit";
import { FormValidation_MaxLength } from "../validation/formValidation_MaxLength";
import { FormValidation_RegExp } from "../validation/formValidation_RegExp";
import { FormValidation_MustBeChecked } from "../validation/formValidation_MustBeChecked";
import { FormValidation_MustHaveSameValueAs } from "../validation/formValidation_MustHaveSameValueAs";


document.addEventListener("DOMContentLoaded", function ()
{
    let form = new Form("form1");

    let name = new NativeFormInput(document.getElementById("name"));
    name.AddValidation(new FormValidation_MustHaveValue(name, "Name must be filled"));
    name.AddValidation(new FormValidation_MaxLength(name, "Name must be max 5 letters", 5));
    name.AddValidation(new FormValidation_RegExp(name, "Name must contain letter 'a'", "a", "im"));
    
    let email = new NativeFormInput(document.getElementById("email"));
    email.AddValidation(new FormValidation_MustHaveValue(email, "Email must be filled"));
    email.AddValidation(new FormValidation_MustBeEmail(email, "Email must be email (duh)"));

    let captcha = new CaptchaFormInput(document.getElementById("recaptcha1"),
        new RecaptchaV2("recaptcha1", "6LcTYRAUAAAAAPPL_zx6mJBG9shbysJXwLepTBgt"));

    let file = new NativeFormInput(document.getElementById("file"));
    file.AddValidation(new FormValidation_FileSizeLimit(file, "Files must be below 1 MB", 1000000));
    file.AddValidation(new FormValidation_MustHaveValue(file, "File must be chozen"));

    let fileMulti = new NativeFormInput(document.getElementById("fileMulti"));
    fileMulti.AddValidation(new FormValidation_FileSizeLimit(fileMulti, "Files must be below 2 MB", 2000000));
    fileMulti.AddValidation(new FormValidation_FileCountLimit(fileMulti, "You can upload max. 5 files", 5));

    let terms = new NativeFormInput(document.getElementById("terms"));
    terms.AddValidation(new FormValidation_MustBeChecked(terms, "Terms must be checked"));

    let pass1 = new NativeFormInput(document.getElementById("pass1"));
    let pass2 = new NativeFormInput(document.getElementById("pass2"));
    pass1.AddValidation(new FormValidation_MustHaveSameValueAs(pass1, pass2, "Passwords must be the same"));

    form.AddInput(name);
    form.AddInput(email);
    form.AddInput(captcha);
    form.AddInput(file);
    form.AddInput(fileMulti);
    form.AddInput(terms);
    form.AddInput(pass1);
    form.AddInput(pass2);
    form.AddInput(new NativeFormInput(document.getElementById("city")));
    form.AddInput(new NativeFormInput(document.getElementById("message")));

    form.OnSubmit.Add(function ()
    {
        console.log("submit");
    });
    form.OnValidSubmit.Add(function ()
    {
        console.log("valid submit");
    });
    form.OnInvalidSubmit.Add(function ()
    {
        console.log("invalid submit");
    });

    document.getElementById("reset1").addEventListener("click", function ()
    {
        form.Reset();
        console.log("Reset");
    });
});