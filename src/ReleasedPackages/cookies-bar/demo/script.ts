import { CookiesBar } from "../src/CookiesBar";
import { CookiesController } from "@drozdik.m/cookies-controller";

document.addEventListener("DOMContentLoaded", function ()
{
    let controller = new CookiesController;
    let bar = new CookiesBar(document.getElementById("cookiesBar"), controller);
});


