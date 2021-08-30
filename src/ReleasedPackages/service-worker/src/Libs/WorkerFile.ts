import "@drozdik.m/string-extensions/dist/EndsWith";
import "@drozdik.m/string-extensions/dist/ExtractFileExtension";
import { Map } from "@drozdik.m/map";
import { KeyValuePair } from "@drozdik.m/pair/dist/KeyValuePair";


export enum FileType
{
    UNKNOWN,
    HTML,
    STYLE,
    SCRIPT,
    IMAGE
}


export class File
{
    //--------------------------------------------------
    //---------VARIABLES--------------------------------
    //--------------------------------------------------
    private path: string;
    private fileType: FileType;

    private static formats: KeyValuePair<string, FileType>[] = [

        //IMAGES
        new KeyValuePair<string, FileType>("jpeg", FileType.IMAGE),
        new KeyValuePair<string, FileType>("jpg", FileType.IMAGE),
        new KeyValuePair<string, FileType>("png", FileType.IMAGE),
        new KeyValuePair<string, FileType>("gif", FileType.IMAGE),
        new KeyValuePair<string, FileType>("exif", FileType.IMAGE),
        new KeyValuePair<string, FileType>("tiff", FileType.IMAGE),
        new KeyValuePair<string, FileType>("svg", FileType.IMAGE),
        new KeyValuePair<string, FileType>("webp", FileType.IMAGE),
        new KeyValuePair<string, FileType>("bmp", FileType.IMAGE),
        new KeyValuePair<string, FileType>("ppm", FileType.IMAGE),
        new KeyValuePair<string, FileType>("pgm", FileType.IMAGE),
        new KeyValuePair<string, FileType>("pbm", FileType.IMAGE),
        new KeyValuePair<string, FileType>("pnm", FileType.IMAGE),
        new KeyValuePair<string, FileType>("hdr", FileType.IMAGE),
        new KeyValuePair<string, FileType>("heif", FileType.IMAGE),
        new KeyValuePair<string, FileType>("bat", FileType.IMAGE),
        new KeyValuePair<string, FileType>("bpg", FileType.IMAGE),
        new KeyValuePair<string, FileType>("cgm", FileType.IMAGE),

        //STYLES
        new KeyValuePair<string, FileType>("css", FileType.STYLE),
        new KeyValuePair<string, FileType>("scss", FileType.STYLE),

        //SCRIPTS
        new KeyValuePair<string, FileType>("js", FileType.SCRIPT),
        new KeyValuePair<string, FileType>("ts", FileType.SCRIPT),

        //HTML
        new KeyValuePair<string, FileType>("html", FileType.HTML),
        new KeyValuePair<string, FileType>("htm", FileType.HTML),
    ];
    protected static fileTypeMap: Map<string, FileType> = new Map<string, FileType>(File.formats)
    

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    constructor(path: string)
    {
        this.path = path;
        this.fileType = this.CalculateFileType(this.path);
    }

    //--------------------------------------------------
    //---------METHODS----------------------------------
    //--------------------------------------------------
    /**
     * Returns current file name
     * */
    public GetName(): string 
    {
        return this.path;
    }

    //--------------------------------------------------
    //---------FILE TYPE--------------------------------
    //--------------------------------------------------
    /**
     * Returns current file type
     * */
    public GetFileType(): FileType
    {
        return this.fileType;
    }

    /**
     * Returns FileType enum based on input file path
     * @param filePath File path
     */
    protected CalculateFileType(filePath: string): FileType
    {
        //Get variables
        let filePathLowercase = filePath.toLocaleLowerCase().split("?")[0];
        let fileExtension = filePathLowercase.ExtractFileExtension();

        //Search the map
        let mapRes = File.fileTypeMap.FindValue(fileExtension);
        if (mapRes.HasValue())
            return mapRes.PairValue()

        //Unknown type
        return FileType.UNKNOWN;
    }
}

