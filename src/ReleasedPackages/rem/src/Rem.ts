import { WindowEvents } from "@drozdik.m/window-events";

//--------------------------------------------------
//----------REM-------------------------------------
//--------------------------------------------------
export class Rem
{
    private static inPx: number = 16;

    constructor()
    {

    }

    /**
    * Refreshed cached size of rem in px
    */
    static Recalculate()
    {
        var body = document.body;
        var createdDiv = document.createElement('div');

        createdDiv.style.cssText = 'display:inline-block; padding:0; line-height:1; position:absolute; visibility:hidden; font-size:1em';

        createdDiv.appendChild(document.createTextNode('M'));
        body.appendChild(createdDiv);
        var fs = createdDiv.offsetHeight;
        body.removeChild(createdDiv);

        this.inPx = fs;
    }

    /**
    * Returns rem size in px
    * @returns rem in px
    */
    static InPx(): number
    {
        return Rem.inPx;
    }
}

WindowEvents.OnLoad.Add(function(){
    Rem.Recalculate();
});