import { LoadingAnimation } from "../src/LoadingAnimation";

document.addEventListener('DOMContentLoaded', function ()
{

    /*LoadingAnimation.Show();
    setTimeout(function ()
    {
        LoadingAnimation.Show()
    }, 1000);
    setTimeout(function ()
    {
        LoadingAnimation.Show()
    }, 2000);

    setTimeout(function ()
    {
        LoadingAnimation.Hide()
    }, 3000);
    setTimeout(function ()
    {
        LoadingAnimation.Hide()
    }, 4000);
    setTimeout(function ()
    {
        LoadingAnimation.Show()
    }, 5000);*/
    

    let toggle1 = true;
    setInterval(function ()
    {
        if (toggle1)
            LoadingAnimation.Show();
        else
            LoadingAnimation.Hide();
        toggle1 = !toggle1;
    }, 2000);

    let loadingAnimation = new LoadingAnimation(document.getElementById("loadingScreenTestTarget"));
    let toggle2 = false;
    setInterval(function ()
    {
        if (toggle2)
            loadingAnimation.Show();
        else
            loadingAnimation.Hide();
        toggle2 = !toggle2;
    }, 2000);
});

