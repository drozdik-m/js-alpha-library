import { ILerpFunction, EaseOutCubic } from "@drozdik.m/lerp";
import { Event } from "@drozdik.m/event";
import { AnimationArgs } from "../args/AnimationArgs";

export class Animation
{
    //--------------------------------------------------
    //----------PROPERTIES------------------------------
    //--------------------------------------------------
    //Settings
    private duration: number;
    private easing: ILerpFunction;

    //Tech settings
    private currentFrame = 0;
    private fps = 75;
    private frameTimeout = -1;

    //Cache from/to
    private from: number;
    private to: number;

    //Events
    OnStart = new Event<Animation, AnimationArgs>();
    OnRender = new Event<Animation, AnimationArgs>();
    OnFrame = new Event<Animation, AnimationArgs>();
    OnEnd = new Event<Animation, AnimationArgs>();

    

    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    /**
     * Controller for handling lerp functions 
     * @param from Value to animate from
     * @param to Value to animate to
     * @param duration Duration of the animation [ms]
     * @param easing Easing/lerp function
     */
    constructor(duration: number = 250, easing: ILerpFunction = EaseOutCubic)
    {
        this.duration = duration;
        this.easing = easing;
    }

    //--------------------------------------------------
    //----------CONTROLS--------------------------------
    //--------------------------------------------------

    /**
     * Invokes Stop and starts playing the animation
     * @param from Initial value
     * @param to Target value
     */
    StopAndStart(from: number, to: number): Animation
    {
        this.Stop();
        return this.Start(from, to);
    }

    /**
     * Plays an animation
     * @param from Initial value
     * @param to Target value
     */
    Start(from: number, to: number): Animation
    {
        let object = this;
        let totalFrames = (object.duration / 1000) * object.fps;
        let framesDelay = 1000 / object.fps;
        //let framesAddition = totalFrames / object.fps;
        
        this.from = from;
        this.to = to;

        //Start event
        this.OnStart.Invoke(this, new AnimationArgs(from));
        this.OnRender.Invoke(this, new AnimationArgs(from));

        let animationFrame = function ()
        {
            //Calculate interpolation value
            object.currentFrame += 1;
            let interpolationValue = object.easing(from, to, object.currentFrame, totalFrames);

            //Continue
            if (object.currentFrame < totalFrames)
                object.frameTimeout = setTimeout(animationFrame, framesDelay);

            //Callback event
            object.OnRender.Invoke(object, new AnimationArgs(interpolationValue));
            object.OnFrame.Invoke(object, new AnimationArgs(interpolationValue));

            //Finish
            if (object.currentFrame >= totalFrames)
                object.FinishAnimation(to);
        }
        animationFrame();
        return this;
    }

    /**
     * Method that handles animation finishing
     * @param to Target value
     */
    private FinishAnimation(to: number)
    {
        this.OnRender.Invoke(this, new AnimationArgs(to));
        this.OnEnd.Invoke(this, new AnimationArgs(to));
    }

    /**
     * Stop and resets the current animation
     * */
    Stop(): Animation
    {
        if (this.frameTimeout != -1)
        {
            clearTimeout(this.frameTimeout);
            this.frameTimeout = -1;
        }
        this.currentFrame = 0;
        return this;
    }

    /**
     * Pauses the current animation
     * */
    Pause(): Animation
    {
        if (this.frameTimeout != -1)
        {
            clearTimeout(this.frameTimeout);
            this.frameTimeout = -1;
        }
        return this;
    }

    /**
     * Continues last paused animation (only if previous animation were played)
     * */
    Continue(): Animation
    {
        return this.Start(this.from, this.to);
    }


}


/*

 function Interpolate(from: number, to: number, lerp: ILerpFunction, callback: Function)
{
    //let interpolationValue = 0.01;
    let targetVal = to;
    let currentFrame = 0;
    let duration = 1000;
    let timeBetweenFrames = 10;

    let animationFrame = function ()
    {
        //console.log("Frame: " + currentFrame);

        currentFrame += timeBetweenFrames;
        let interpolationValue = lerp(from, targetVal, currentFrame, duration);

        //console.log("   value: " + interpolationValue);

        if (currentFrame < duration)
            setTimeout(animationFrame, timeBetweenFrames);
        else
            callback(interpolationValue);
    }
    animationFrame();
}

 
 */