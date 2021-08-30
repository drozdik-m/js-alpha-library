import { ResizeArgs } from "@drozdik.m/window-events";
import { GalleryImage } from "../src/GalleryImage";

export class ImageGalleryArgs
{
    private currentImage: GalleryImage;

    constructor(currentImage: GalleryImage)
    {
        this.currentImage = currentImage;
    }

    GetCurrentImage(): GalleryImage
    {
        return this.currentImage;
    }
}