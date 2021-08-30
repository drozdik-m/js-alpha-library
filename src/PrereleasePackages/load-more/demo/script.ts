import { ImageGallery } from "../src/ImageGallery";


document.addEventListener("DOMContentLoaded", function ()
{
    let gallery = ImageGallery.FromLinksSelector("#demoImages1 a");

    let fillingToggle = false;
    document.getElementById("fillingToggle").addEventListener("click", function ()
    {
        let filling = document.getElementById("filling");

        fillingToggle = !fillingToggle;
        if (fillingToggle)
            filling.style.height = "100rem";
        else
            filling.style.height = "2rem";
    });
});