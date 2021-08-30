import { LanguageDictionary } from "./languageDictionary";
import { Configuration } from "../configuration/configuration";

//--------------------------------------------------
//----------LANGUAGE HANDLER------------------------
//--------------------------------------------------
export class LanguageHandler
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    pageLangunage = Configuration.GetPageLanguage();

    languageDictionaries: LanguageDictionary[] = [];
    currentDictionary: LanguageDictionary = null;
    defaultDictionary: LanguageDictionary = null;

    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    constructor(languageDictionaries: LanguageDictionary[])
    {
        //Exceptions
        if (languageDictionaries.length == 0)
        {
            console.error("LanguageHandler(...) - Empty array of language dictionaries");
            return;
        }

        //Pick current dictionary
        for (let i = 0; i < languageDictionaries.length; i++)
        {
            //Default dictionary
            if (languageDictionaries[i].languageShortcut == Configuration.primaryLanguage)
            {
                this.defaultDictionary = languageDictionaries[i];
            }

            //Target dictionary
            if (languageDictionaries[i].languageShortcut == this.pageLangunage)
            {
                this.currentDictionary = languageDictionaries[i];
                break;
            }
            
        }

        //Exceptions
        if (this.currentDictionary == null && this.defaultDictionary != null)
            console.log("LanguageHandler(...) - Target dictionary not found, default dictionary has been used");
        else if (this.currentDictionary == null && this.defaultDictionary == null)
        {
            console.error("LanguageHandler(...) - Target or default dictionary has not been found");
            return;
        }
    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------

    /**
     * Returns a word by name
     * @param name Name of the word
     */
    GetWord(name: string)
    {
        return this.currentDictionary.GetWord(name);
    }

    /**
     * Sets a word by name
     * @param name Name of the word
     */
    SetWord(name: string, newContent: string)
    {
        this.currentDictionary.SetWord(name, newContent);
    }
}



