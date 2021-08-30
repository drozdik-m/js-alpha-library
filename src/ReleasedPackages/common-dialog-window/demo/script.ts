import { CommonDialogWindow } from "../src/CommonDialogWindow";

document.addEventListener("DOMContentLoaded", function ()
{
    document.getElementById("info").addEventListener("click", function ()
    {
        var message = "This is info";
        CommonDialogWindow.Info(message, "This is heading", "This is button");
    });

    document.getElementById("success").addEventListener("click", function ()
    {
        var message = "This is success";
        CommonDialogWindow.Success(message, "This is heading", "This is button");
    });

    document.getElementById("error").addEventListener("click", function ()
    {
        var message = "This is error";
        CommonDialogWindow.Error(message, "This is heading", "This is button");
    });

    document.getElementById("warning").addEventListener("click", function ()
    {
        var message = "This is warning";
        CommonDialogWindow.Warning(message, "This is heading", "This is button");
    });



    document.getElementById("black").addEventListener("click", function ()
    {
        var message = "This is info";
        CommonDialogWindow.BlackConfirm(message, function ()
        {
            console.log("BLACK");
        }, "This is heading", "Close!", "Confirm!");
    });

    document.getElementById("green").addEventListener("click", function ()
    {
        var message = "This is success";
        CommonDialogWindow.GreenConfirm(message, function ()
        {
            alert("GREEN");
        }, "This is heading", "Close!", "Confirm!");
    });

    document.getElementById("red").addEventListener("click", function ()
    {
        var message = "This is error";
        CommonDialogWindow.RedConfirm(message, function ()
        {
            alert("RED");
        }, "This is heading", "Close!", "Confirm!");
    });

    document.getElementById("yellow").addEventListener("click", function ()
    {
        var message = "This is warning";
        CommonDialogWindow.YellowConfirm(message, function ()
        {
            alert("YELLOW");
        }, "This is heading", "Close!", "Confirm!");
    });
});