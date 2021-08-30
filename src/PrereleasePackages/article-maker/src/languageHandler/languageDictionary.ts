
//--------------------------------------------------
//----------LANGUAGE DICTIONARY---------------------

import { Definition } from "../definition/definition";

//--------------------------------------------------
export class LanguageDictionary
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    languageShortcut: string;
    words: any;


    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    constructor(languageShortcut: string, words: any)
    {
        this.languageShortcut = languageShortcut;
        this.words = words;
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
        let content = this.words[name];

        //Exception
        if (Definition.IsUndefined(content))
        {
            console.error(`LanguageDictionary(${this.languageShortcut}).GetWord(${name}) - word for "${name}" not found`);
            content = "";
        }

        return content;
    }

    /**
     * Sets a word by name
     * @param name Name of the word
     */
    SetWord(name: string, newContent: string)
    {
        //Exception
        if (Definition.IsUndefined(this.words[name]))
        {
            console.error(`LanguageDictionary(${this.languageShortcut}).SetWord(${name}, ${newContent}) - word for "${name}" not found`);
            return;
        }

        this.words[name] = newContent;
    }
}