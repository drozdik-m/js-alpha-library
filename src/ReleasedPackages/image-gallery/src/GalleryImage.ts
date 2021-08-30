import { GalleryImageLoadArgs } from "../args/GalleryImageLoadArgs";
import { Event } from "@drozdik.m/event";

export class GalleryImage
{
    private imageSrouce: string;
    private imageTitle: string;

    private isLoaded: boolean = false;

    private imageElement: HTMLImageElement = null;

    OnLoad = new Event<GalleryImage, GalleryImageLoadArgs>();

    constructor(imageSource: string, imageTitle: string, imageAlt: string = imageTitle)
    {
        this.imageSrouce = imageSource;
        this.imageTitle = imageTitle;
    }

    /**
     * Preloads and prepares the image
     * */
    Preload()
    {
        if (this.imageElement == null)
            this.imageElement = this.MakeResultImageElement();
    }

    /**
     * Tells if this image is already loaded
     * */
    IsLoaded()
    {
        return this.isLoaded;
    }

    /**
     * Simply creates the image element
     * */
    protected MakeResultImageElement(): HTMLImageElement
    {
        let object = this;

        let res = document.createElement("img") as HTMLImageElement;
        res.onload = function ()
        {
            object.isLoaded = true;
            object.OnLoad.Invoke(object, new GalleryImageLoadArgs());
        }
        res.src = this.imageSrouce;
        res.title = this.imageTitle;
        res.classList.add("currentGalleryImage");
        return res;
    }

    /**
     * Returns the result element that holds the image
     * */
    GetResultElement(): HTMLElement
    {
        if (this.imageElement == null)
            this.imageElement = this.MakeResultImageElement();

        let wrapper = document.createElement("div");
        wrapper.classList.add("currentGalleryImageWrapper");

        wrapper.appendChild(this.imageElement);

        let title = document.createElement("span");
        title.classList.add("currentGalleryImageTitle");
        title.innerHTML = this.imageTitle;

        wrapper.appendChild(title);

        return wrapper;
    }

    /**
     * Returns only the image element
     * */
    GetImageElement(): HTMLElement
    {
        if (this.imageElement == null)
            this.imageElement = this.MakeResultImageElement();

        return this.imageElement;
    }

    GetImageNaturalWidth(): number
    {
        if (this.imageElement != null)
            return this.imageElement.naturalWidth;
        return -1;
    }

    GetImageNaturalHeight(): number
    {
        if (this.imageElement != null)
            return this.imageElement.naturalHeight;
        return -1;
    }

    /**
     * Creates and returns a gallery image object based on a <a> elements attributes
     * @param linkElement
     */
    static FromLinkElement(linkElement: HTMLElement): GalleryImage
    {
        let imageSource = linkElement.getAttribute("href") || "";
        let imageTitle = linkElement.getAttribute("title") || "";
        return new GalleryImage(imageSource, imageTitle);
    }
}