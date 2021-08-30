import { DialogWindow } from "../src/DialogWindow";

document.addEventListener("DOMContentLoaded", function ()
{
    let dialog1 = new DialogWindow("dialogWindow1");
    let dialog2 = new DialogWindow("dialogWindow2");
    dialog2.OnUpdate.Add(function ()
    {
        console.log("Dialog 2 - update");
    });
});