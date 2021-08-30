//--------------------------------------------------
//----------ANIMATION PROPERTIES--------------------
//--------------------------------------------------
export class AnimationProperties
{
    public length: number = 250;
    public easing: string = "easeOutCubic";
    public cssEasing: string = "cubic-bezier(0.215, 0.61, 0.355, 1)";

    /**
     * Creates new instance of an animation properties. If no parameters set, standart Bonsai animation easing and time is selected (easeOutCubic, 250ms)
     * @param length Animation length [ms]
     * @param easing Animation easing (word)
     * @param cssEasing Animation easing in css friendly format
     */
    constructor(length: number = 250, easing: string = "easeOutCubic", cssEasing: string = "cubic-bezier(0.215, 0.61, 0.355, 1)")
    {
        this.length = length;
        this.easing = easing;
        this.cssEasing = cssEasing;
    }
}
