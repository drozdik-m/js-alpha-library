import { GalleryImage } from "./GalleryImage";
import { LoadingAnimation } from "@drozdik.m/loading-animation";
import { Rem } from "@drozdik.m/rem";
import { WindowEvents } from "@drozdik.m/window-events";
import { DimensionsHelper } from "@drozdik.m/dimensions-helper";

export class ImageGallery
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    protected images: GalleryImage[] = [];
    protected currentImageIndex: number = 0;

    public showAnimationLength = 250;
    public showTimeout: number = null;

    protected isOpen = false;


    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    constructor(images: GalleryImage[])
    {
        ImageGallery.EnsureEnvironment();
        this.images = images;

        if (this.images.length == 0)
            console.warn("Gallery recieved empty image array");

        let object = this;
        ImageGallery.GetArrowLeft().addEventListener("click", function (e)
        {
            if (!object.isOpen)
                return;

            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            object.Previous();
        });
        ImageGallery.GetArrowRight().addEventListener("click", function (e)
        {
            if (!object.isOpen)
                return;

            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            object.Next();
        });
        ImageGallery.GetBackground().addEventListener("click", function (e)
        {
            if (!object.isOpen)
                return;

            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            object.Close();
        });
        ImageGallery.GetClose().addEventListener("click", function (e)
        {
            if (!object.isOpen)
                return;

            e.preventDefault ? e.preventDefault() : (e.returnValue = false);
            object.Close();
        });

        WindowEvents.OnResize.Add(function ()
        {
            if (object.isOpen)
                object.ResizeCurrentImage();
        })

    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------
    /**
     * Moves to the next in the gallery
     * */
    Next()
    {
        this.ShowImage(this.currentImageIndex + 1);
    }

    /**
     * Moves to the previous in the gallery
     * */
    Previous()
    {
        this.ShowImage(this.currentImageIndex - 1);
    }

    /**
     * Tells if the gallery is at the last image
     * */
    IsAtLast(): boolean
    {
        return this.currentImageIndex == this.images.length - 1;
    }

    /**
     * Tells if the gallery is at the last image
     * */
    IsAtFirst(): boolean
    {
        return this.currentImageIndex == 0;
    }

    /**
     * Opens the gallery if not. Show a gallery image. 
     * @param index Index of the gallery image to show. 
     */
    ShowImage(index: number)
    {
        //Check for zero condition
        if (this.images.length == 0)
            return;

        index = (index + this.images.length) % this.images.length;
        this.currentImageIndex = index;
        //console.log("current: " + this.currentImageIndex);

        if (!this.isOpen)
            this.Open();

        //Set end/start classes
        let imageGallery = ImageGallery.GetImageGallery();
        imageGallery.classList.remove("atLast");
        imageGallery.classList.remove("atFirst");
        if (this.IsAtLast())
            imageGallery.classList.add("atLast");
        if (this.IsAtFirst())
            imageGallery.classList.add("atFirst");

        //Load and prerender images
        let image = this.images[this.currentImageIndex];
        //this.PrerenderImage(index + 1);
        //this.PrerenderImage(index + 2);
        //this.PrerenderImage(index - 1);

        //Add loading
        if (image.IsLoaded())
        {
            ImageGallery.GetLoadingAnimation().Hide();
            this.AppendImage(image);
        }
        else
        {
            ImageGallery.GetImageGalleryTarget().innerHTML = "";
            //LoadingAnimation.Show();
            ImageGallery.GetLoadingAnimation().Show();
            image.Preload();
            let object = this;
            let targetImageId = this.currentImageIndex;
            image.OnLoad.Add(function ()
            {
                if (object.currentImageIndex != targetImageId)
                    return;
                object.AppendImage(image);
                //LoadingAnimation.Hide();
                ImageGallery.GetLoadingAnimation().Hide();
            });
        }
    }

    /**
     * Appends an image into the DOM
     * @param image Image to append
     */
    private AppendImage(image: GalleryImage)
    {
        //Append it
        let appendTarget = ImageGallery.GetImageGalleryTarget();
        appendTarget.innerHTML = "";
        appendTarget.appendChild(image.GetResultElement());

        //Counter
        let counter = document.createElement("span")
        counter.innerHTML = `${this.currentImageIndex + 1}/${this.images.length}`
        counter.classList.add("currentGalleryImageNumber");
        appendTarget.querySelector(".currentGalleryImageWrapper").appendChild(counter);

        this.ResizeCurrentImage();
    }

    /**
     * Resizes current image into proper shape
     * */
    protected ResizeCurrentImage()
    {
        let image = this.images[this.currentImageIndex];

        if (!image)
            return;

        //CALCULATE IMAGE SIZE
        //Calculate ratios
        let widthMargin = Rem.InPx() * 2;
        let heightMargin = Rem.InPx() * 4;
        let screenNaturalWidth = WindowEvents.Width();
        let screenNaturalHeight = WindowEvents.Height();
        let screenWidth = WindowEvents.Width() - (widthMargin * 2);
        let screenHeight = WindowEvents.Height() - (heightMargin * 2);
        let imageNaturalWidth = image.GetImageNaturalWidth();
        let imageNaturalHeight = image.GetImageNaturalHeight();

        //let imageWidthRatio = imageNaturalWidth;
        let imageHeightRatio = imageNaturalHeight;
        let ratioCorrection = imageNaturalWidth / screenNaturalWidth;
        //let screenWidthRatio = screenNaturalWidth * ratioCorrection;
        let screenHeightRatio = screenNaturalHeight * ratioCorrection;

        //console.log("imageWidthRatio " + imageWidthRatio);
        //console.log("imageHeightRatio " + imageHeightRatio);
        //console.log("screenWidthRatio " + screenWidthRatio);
        //console.log("screenHeightRatio " + screenHeightRatio);

        //Compare height ratios (width are the same)
        let imageElement = image.GetImageElement();
        //let resizedElement = ImageGallery.GetResizeTarget();
        if (imageHeightRatio < screenHeightRatio)
        {
            //Use width as correct resize axis
            if (imageNaturalWidth < screenWidth)
            {
                //Image is smaller than screen
                imageElement.style.width = imageNaturalWidth + "px";
                imageElement.style.height = "auto";
            }
            else
            {
                //Image is bigger than screen
                imageElement.style.width = screenWidth + "px";
                imageElement.style.height = "auto";
            }
        }
        else
        {
            //Use height as correct resize axis
            //Use width as correct resize axis
            if (imageNaturalHeight < screenHeight)
            {
                //Image is smaller than screen
                imageElement.style.height = imageNaturalHeight + "px";
                imageElement.style.width = "auto";
            }
            else
            {
                //Image is bigger than screen
                imageElement.style.height = screenHeight + "px";
                imageElement.style.width = "auto";
            }
        }

        //Center the image
        let imageResizeHelper = new DimensionsHelper(imageElement);
        let resizeTarget = ImageGallery.GetResizeTarget();
        let resizeTargetHelper = new DimensionsHelper(resizeTarget);

        resizeTargetHelper.SetHeight(imageResizeHelper.Height());
        resizeTargetHelper.SetWidth(imageResizeHelper.Width());

        let offsetLeft = (screenNaturalWidth - resizeTargetHelper.Width()) / 2;
        let offsetTop = (screenNaturalHeight - resizeTargetHelper.Height()) / 2;
        resizeTarget.style.top = (offsetTop / 2) + "px";
        resizeTarget.style.left = offsetLeft + "px";
    }

    /**
     * Invoked prerender method in a gallery image
     * @param index Target gallery image index
     */
    protected PrerenderImage(index: number)
    {
        index = (index + this.images.length) % this.images.length;
        this.images[index].Preload();
    }

    /**
     * Opens the gallery at an image
     * @param index The initial image index
     */
    Open()
    {
        if (this.isOpen)
            return;

        this.isOpen = true;

        if (this.showTimeout != null)
            clearTimeout(this.showTimeout);

        ImageGallery.GetImageGallery().style.display = "block";
        this.ResizeCurrentImage();

        setTimeout(function ()
        {
            let gallery = ImageGallery.GetImageGallery();
            gallery.classList.add("open");
            gallery.classList.remove("closed");
        }, 1);
    }

    /**
     * Closes the image gallery
     * */
    Close()
    {
        if (!this.isOpen)
            return;

        this.isOpen = false;

        let gallery = ImageGallery.GetImageGallery();
        gallery.classList.remove("open");
        gallery.classList.add("close");

        if (this.showTimeout != null)
            clearTimeout(this.showTimeout);
        let object = this;
        this.showTimeout = setTimeout(function ()
        {
            ImageGallery.GetImageGallery().style.display = "none";
            object.showTimeout = null;
        }, this.showAnimationLength);
    }

    /*
     * Tells if this image gallery is open
     * */
    IsOpen(): boolean
    {
        return this.isOpen;
    }

    //--------------------------------------------------
    //----------FACTORY---------------------------------
    //--------------------------------------------------
    /**
     * Creates an image gallery based on selector to all links/gallery images.
     * @param selector Selector to gallery images as links
     */
    public static FromLinksSelector(selector: string): ImageGallery
    {
        let links = document.querySelectorAll(selector);
        let images: GalleryImage[] = [];

        //Add to gallery image array
        for (let i = 0; i < links.length; i++)
        {
            
            if (links.item(i).tagName != "A")
                console.warn("One of elements from FromLinksSelector is not link");
            images.push(GalleryImage.FromLinkElement(links.item(i) as HTMLElement));
        }

        let res = new ImageGallery(images);

        //Setup events
        for (let i = 0; i < links.length; i++)
        {
            links[i].addEventListener("click", function (e)
            {
                e.preventDefault ? e.preventDefault() : (e.returnValue = false);
                res.ShowImage(i);
            });
        }

        return res;
    }

    //--------------------------------------------------
    //----------ENVIRONMENT-----------------------------
    //--------------------------------------------------
    private static environmentInitiated = false;
    private static imageGalleryTarget: HTMLElement = null;
    private static imageGallery: HTMLElement = null;
    private static arrowLeft: HTMLElement = null;
    private static arrowRight: HTMLElement = null;
    private static close: HTMLElement = null;
    private static background: HTMLElement = null;
    private static resizeTarget: HTMLElement = null;
    private static loadingAnimation: LoadingAnimation = null;

    /**
     * Ensures that there is suitable environment created for ImageGallery functionality
     * */
    static EnsureEnvironment()
    {
        if (ImageGallery.environmentInitiated)
            return;
        let environmentHTML = `<div id="imageGallery">
        <div id="imageGalleryBackground">&nbsp;</div>
        <div id="imageGalleryCenteringWrapper">

            <div id="imageGalleryTarget"></div>
            <button type="button" id="imageGalleryLeft">
                Previous
                <div class="icon">&nbsp;</div>
            </button>
            <button type="button" id="imageGalleryRight">
                Next
                <div class="icon">&nbsp;</div>
            </button>
            <button type="button" id="imageGalleryClose">
                Close
                <div class="icon">&nbsp;</div>
            </button>
        </div>
    </div>`;

        //Target example:
        /*
                <div class="currentGalleryImageWrapper">
                    <img class="currentGalleryImage" src="images/test1.jpgx " />
                    <span class="currentGalleryImageTitle">Image title</span>
                    <span class="currentGalleryImageNumber">5/10</span>
                </div>
         */

        document.body.insertAdjacentHTML("beforeend", environmentHTML);
        ImageGallery.environmentInitiated = true;
    }

    /**
     * Returns target for image operations and appending
     * */
    static GetImageGalleryTarget(): HTMLElement
    {
        if (ImageGallery.imageGalleryTarget == null)
        {
            ImageGallery.EnsureEnvironment();
            ImageGallery.imageGalleryTarget = document.getElementById("imageGalleryTarget")
        }
        return ImageGallery.imageGalleryTarget;
    }

    /**
    * Returns the container for resizing
    * */
    static GetResizeTarget(): HTMLElement
    {
        if (ImageGallery.resizeTarget == null)
        {
            ImageGallery.EnsureEnvironment();
            ImageGallery.resizeTarget = document.getElementById("imageGalleryCenteringWrapper");
        }
        return ImageGallery.resizeTarget;
    }

    /**
     * Returns button for closing the gallery
     * */
    static GetClose(): HTMLElement
    {
        if (ImageGallery.close == null)
        {
            ImageGallery.EnsureEnvironment();
            ImageGallery.close= document.getElementById("imageGalleryClose");
        }
        return ImageGallery.close;
    }

    /**
    * Returns the image gallery environment root div
    * */
    static GetImageGallery(): HTMLElement
    {
        if (ImageGallery.imageGallery == null)
        {
            ImageGallery.EnsureEnvironment();
            ImageGallery.imageGallery = document.getElementById("imageGallery")
        }
        return ImageGallery.imageGallery;
    }

    /**
     * Return environment arrow to the left
     * */
    static GetArrowLeft(): HTMLElement
    {
        if (ImageGallery.arrowLeft == null)
        {
            ImageGallery.EnsureEnvironment();
            ImageGallery.arrowLeft = document.getElementById("imageGalleryLeft")
        }

        return ImageGallery.arrowLeft;
    }

    /**
     * Return environment arrow to the right
     * */
    static GetArrowRight(): HTMLElement
    {
        if (ImageGallery.arrowRight == null)
        {
            ImageGallery.EnsureEnvironment();
            ImageGallery.arrowRight = document.getElementById("imageGalleryRight")
        }

        return ImageGallery.arrowRight;
    }

    /**
     * Return environment background
     * */
    static GetBackground(): HTMLElement
    {
        if (ImageGallery.background == null)
        {
            ImageGallery.EnsureEnvironment();
            ImageGallery.background = document.getElementById("imageGalleryBackground");
        }

        return ImageGallery.background;
    }

    /**
    * Returns the loading animation
    * */
    static GetLoadingAnimation(): LoadingAnimation
    {
        if (!ImageGallery.loadingAnimation)
        {
            let centeringWrapper = ImageGallery.GetResizeTarget();
            ImageGallery.loadingAnimation = new LoadingAnimation(centeringWrapper);
        }
        return ImageGallery.loadingAnimation;
    }
}