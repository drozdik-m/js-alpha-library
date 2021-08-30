
/**
 * Class that holds important configuration values for entire web
 */
export class Configuration
{
    static siteName = "NoNameProject";
    static primaryLanguage = "cs";

    /**
     * Returns current page language (ISO shortcut)
     */
    static GetPageLanguage(): string
    {
        return document.documentElement.getAttribute("lang") || Configuration.primaryLanguage;
    }
}