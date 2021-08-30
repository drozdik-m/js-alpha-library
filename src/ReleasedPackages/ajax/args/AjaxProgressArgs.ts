

export class AjaxProgressArgs
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    private computable: boolean;
    private loaded: number;
    private total: number;

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    /**
     * Ajax progress arguments
     * @param computable Is progress computable?
     * @param loaded How much is loaded?
     * @param total How much total will be processed?
     */
    constructor(computable: boolean = false, loaded: number = -1, total: number = -1)
    {
        this.computable = computable;
        this.loaded = loaded;
        this.total = total;
    }

    //--------------------------------------------------
    //----------INFO------------------------------------
    //--------------------------------------------------
    /**
     * Returns true if loaded and total values are awaylable, else false
     * */
    Computable(): boolean
    {
        return this.computable;
    }

    /**
     * Returns how much has been loaded
     * */
    Loaded(): number
    {
        return this.loaded;
    }

    /**
     * Returns how much total will be loaded
     * */
    Total(): number
    {
        return this.total;
    }
}