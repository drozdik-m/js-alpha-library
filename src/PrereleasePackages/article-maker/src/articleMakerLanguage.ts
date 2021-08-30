import { LanguageDictionary } from "./languageHandler/languageDictionary";
import { LanguageHandler } from "./languageHandler/languageHandler";


//--------------------------------------------------
//----------CZECH DICTIONARY------------------------
//--------------------------------------------------
export class ArticleMakerLanguage
{
    static czech: LanguageDictionary = new LanguageDictionary("cs", {
        //File handler
        "FileHandler - Images heading": "Obrázky na nahrání",
        "FileHandler - Files heading": "Soubory na nahrání",

        //Edit dialog window
        "Edit - Heading": "Úprava položky",

        //Create dialog window
        "Create - Heading": "Úprava položky",
        "Create - New item": "Nová položka",

        //Buttons
        "Buttons - Save": "Uložit",
        "Buttons - Close": "Zavřít",
        "Buttons - Add": "Přidat",
        "Buttons - Confirm": "Potvrdit",
        "Buttons - Insert": "Vložit",

        //Menu
        "Menu - Add": "Přidat položku",
        "Menu - Preview": "Náhled",
        "Menu - Open previews": "Otevřít náhledy",
        "Menu - Close previews": "Zavřít náhledy",
        "Menu - Delete all": "Vše smazat",

        //Unsaved changes
        "Unsaved changes warning": "Pozor, máte neuložené změny",

        //Delete (all) dialog window
        "Delete dialog - Heading": "Potvrzení o smazání",
        "Delete dialog - Message": "Opravdu chcete smazat tuto položku?",
        "Delete all dialog - Message": "Opravdu chcete vymazat všechny položky?",
        "Delete dialog - Confirm": "Smazat",

        //Bonsai Markup
        "Bonsai Markup - Invalid syntax - Heading": "Nesprávná syntaxe",
        "Bonsai Markup - Invalid syntax - Message": "Nějaký ze vstupů nemá validní syntaxi značkovacího jazyka",
        "Bonsai Markup - No text selected - Heading": "Není vybrát text",
        "Bonsai Markup - No text selected - Message": "Není vybrát žádný text z daného vstupu",
        "Bonsai Markup - Bold": "Tučně",
        "Bonsai Markup - Italic": "Kurzívou",
        "Bonsai Markup - Underline": "Podtrženě",
        "Bonsai Markup - Upper index": "Horní index",
        "Bonsai Markup - Lower index": "Dolní index",
        "Bonsai Markup - Link": "Odkaz",
        "Bonsai Markup - Special characters": "Speciální znaky",
        "Bonsai Markup - Add link - Heading": "Vložit odkaz",
        "Bonsai Markup - Add link - Link - Label": "Odkaz (například https://google.com)",
        "Bonsai Markup - Add link - Title - Label": "Popis cíle (například \"Google vyhledávání\")",
        "Bonsai Markup - Add link - Target - Label": "Cíl odkazu",
        "Bonsai Markup - Add link - Target - Self": "Současné okno (\"klasický odkaz\")",
        "Bonsai Markup - Add link - Target - Blank": "Nová záložka",
        "Bonsai Markup - Add char - Heading": "Vložit speciální znak",
        "Bonsai Markup - Add char - Label": "Speciální znak na vložení",
        "Bonsai Markup - Add char - Nbsp": "Nezlomitelná mezera",
        "Bonsai Markup - Add char - Br": "Zlomení řádku",

        //Colors
        "Default": "Defaultní",
        "Green": "Zelená",
        "Grey": "Šedá",
        "Light blue": "Světle modrá",
        "Blue": "Modrá",
        "Yellow": "Žlutá",
        "Brown": "Hnědá",
        "Red": "Červená",
        "Orange": "Oranžová",
        "White": "Bílá",

        //File input
        "Files input - Current file": "Současný soubor",

        //Items
        "Item - Name": "Jméno",
        "Item - Edit": "Upravit",
        "Item - Move": "Přesunout na jinou pozici",
        "Item - Preview": "Otevřít/zavřít náhled",
        "Item - Delete": "Smazat",
        "Text": "Text",

        //Paragraph
        "Paragraph - Name": "Odstavec",

        //Important text
        "Important text - Name": "Důležitý text",

        //Text with side line
        "Text with side line - Name": "Text s postranní čárou",

        //Heading
        "Heading - Name": "Nadpis",
        "Header - Level": "Úroveň",

        //Quotation
        "Quotation - Name": "Citát",
        "Quotation - Text": "Citát",
        "Quotation - Author": "Autor",

        //Image
        "Image - Name": "Obrázek",
        "Image - Path": "Obrázek (starý se přepíše) - podporované formáty jsou jpg, jpeg, png, gif a tiff",
        "Image - Description": "Text pod obrázkem",
        "Image - Alt": "Popis obrázku pro roboty, např.: \"Chalupa na zelené louce\"",
        "Image - Alt short": "Alternativní text",

        //Sepparator
        "Divider - Name": "Oddělovač",
        "Divider - Line": "Rovná čára",
        "Divider - Transition line": "Stínovaná čára",
        "Divider - Dots": "Trojtečka",

        //Lists
        "List - Items": "Položky seznamu - Každou položku oddělte novou řádkou",

        //Unordered list
        "Unordered list - Name": "Odrážkový seznam",

        //Numberec list
        "Numberec list - Name": "Číslovaný seznam",

        //Youtube video
        "Youtube video - Name": "Youtube video",
        "Youtube video - Link": "Odkaz na youtube video",

        //HTML
        "HTML - Name": "HTML kód",
        "HTML - Code": "HTML kód",

        //File
        "File - Name": "Soubor",
        "File - Path": "Soubor (starý se přepíše)",
        "File - Title": "Jméno souboru",
        "File - Description": "Popis souboru",
        "File - Color": "Barva",

        //Big link
        "Big link - Name": "Významný odkaz",
        "Big link - Heading": "Nadpis odkazu",
        "Big link - Description": "Popis odkazu",
        "Big link - Button text": "Text tlačítka",
        "Big link - Button color": "Barva tlačítka",

        //Code snippet
        "Code snippet - Name": "Code snippet",
        "Code snippet - Code": "Kód",
        "Code snippet - Language": "Jazyk",
    });

    static english: LanguageDictionary = new LanguageDictionary("en", {
        //File handler
        "FileHandler - Images heading": "Images to upload",
        "FileHandler - Files heading": "Files to upload",

        //Edit dialog window
        "Edit - Heading": "Edit this block",

        //Create dialog window
        "Create - Heading": "Create new block",
        "Create - New item": "New block",

        //Buttons
        "Buttons - Save": "Save",
        "Buttons - Close": "Close",
        "Buttons - Add": "Add",
        "Buttons - Confirm": "Confirm",
        "Buttons - Insert": "Insert",

        //Menu
        "Menu - Add": "Add block",
        "Menu - Preview": "Preview",
        "Menu - Open previews": "Open previews",
        "Menu - Close previews": "Close previews",
        "Menu - Delete all": "Delete all",

        //Unsaved changes
        "Unsaved changes warning": "Warning! You have unsaved changes!",

        //Delete (all) dialog window
        "Delete dialog - Heading": "Delete confirmation",
        "Delete dialog - Message": "Do you really want to delete this block?",
        "Delete all dialog - Message": "Do you really want to delete all blocks?",
        "Delete dialog - Confirm": "Delete",

        //Bonsai Markup
        "Bonsai Markup - Invalid syntax - Heading": "Invalid syntax",
        "Bonsai Markup - Invalid syntax - Message": "Some input does not have valid markdown syntax",
        "Bonsai Markup - No text selected - Heading": "No text selected",
        "Bonsai Markup - No text selected - Message": "No text selected from this input",
        "Bonsai Markup - Bold": "Bold",
        "Bonsai Markup - Italic": "Italic",
        "Bonsai Markup - Underline": "Underline",
        "Bonsai Markup - Upper index": "Upper index",
        "Bonsai Markup - Lower index": "Lower index",
        "Bonsai Markup - Link": "Link",
        "Bonsai Markup - Special characters": "Special characters",
        "Bonsai Markup - Add link - Heading": "Insert link",
        "Bonsai Markup - Add link - Link - Label": "Link (f.e. https://google.com)",
        "Bonsai Markup - Add link - Title - Label": "Target description (f.e. \"Google search page\")",
        "Bonsai Markup - Add link - Target - Label": "Link target",
        "Bonsai Markup - Add link - Target - Self": "Current window (\"normal link\")",
        "Bonsai Markup - Add link - Target - Blank": "New tab",
        "Bonsai Markup - Add char - Heading": "Insert special character",
        "Bonsai Markup - Add char - Label": "Cpecial character to insert",
        "Bonsai Markup - Add char - Nbsp": "Unbreakable space",
        "Bonsai Markup - Add char - Br": "Line break",

        //Colors
        "Default": "Default",
        "Green": "Green",
        "Grey": "Grey",
        "Light blue": "Light blue",
        "Blue": "Blue",
        "Yellow": "Yellow",
        "Brown": "Brown",
        "Red": "Red",
        "Orange": "Orange",
        "White": "White",

        //File input
        "Files input - Current file": "Current file",

        //Items
        "Item - Name": "Name",
        "Item - Edit": "Edit",
        "Item - Move": "Move to different position",
        "Item - Preview": "Open/Close preview",
        "Item - Delete": "Delete",
        "Text": "Text",

        //Paragraph
        "Paragraph - Name": "Paragraph",

        //Important text
        "Important text - Name": "Important text",

        //Text with side line
        "Text with side line - Name": "Text with side-line",

        //Heading
        "Heading - Name": "Heading",
        "Header - Level": "Level",

        //Quotation
        "Quotation - Name": "Quotation",
        "Quotation - Text": "Quatation",
        "Quotation - Author": "Author",

        //Image
        "Image - Name": "Image",
        "Image - Path": "Image (the old one will get rewritten) - supported formats are: jpg, jpeg, png, gif a tiff",
        "Image - Description": "Image description",
        "Image - Alt": "Image description for robots, f.e.: \"A fish in the river\"",
        "Image - Alt short": "Alternative text",

        //Sepparator
        "Divider - Name": "Sepparator line",
        "Divider - Line": "Line",
        "Divider - Transition line": "Shadow line",
        "Divider - Dots": "Triple-dot",

        //Lists
        "List - Items": "List items - One item on a line",

        //Unordered list
        "Unordered list - Name": "Unordered list",

        //Numberec list
        "Numberec list - Name": "Numbered list",

        //Youtube video
        "Youtube video - Name": "Youtube video",
        "Youtube video - Link": "Youtube video link",

        //HTML
        "HTML - Name": "HTML code",
        "HTML - Code": "HTML code",

        //File
        "File - Name": "File",
        "File - Path": "File (the old one will be rewritten)",
        "File - Title": "File name",
        "File - Description": "File description",
        "File - Color": "Color",

        //Big link
        "Big link - Name": "Important link",
        "Big link - Heading": "Link heading",
        "Big link - Description": "Link description",
        "Big link - Button text": "Button text",
        "Big link - Button color": "Button color",

        //Code snippet
        "Code snippet - Name": "Code snippet",
        "Code snippet - Code": "Code",
        "Code snippet - Language": "Language",
    });

    static handler: LanguageHandler = new LanguageHandler([
        ArticleMakerLanguage.czech,
        ArticleMakerLanguage.english
    ]);

    /**
     * Returns word from the handler based on input key
     * @param key Input key
     */
    static GetWord(key: string): string
    {
        return ArticleMakerLanguage.handler.GetWord(key);
    }
}
