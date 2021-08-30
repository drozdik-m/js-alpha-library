import { ValuePair } from "@drozdik.m/pair";
import { Event } from "@drozdik.m/event";
import { List } from "@drozdik.m/double-linked-list";

//--------------------------------------------------
//----------ARTICLE MAKER MESSAGE HANDLER-----------
//--------------------------------------------------
export class ArticleMakerMessagesHandler
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    //Messages
    private messages: List<ValuePair<string, ArticleMakerMessage>> = new List<ValuePair<string, ArticleMakerMessage>>();

    //Callbacks
    OnChange: Event<ArticleMakerMessagesHandler, null> = new Event<ArticleMakerMessagesHandler, null>();

    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    constructor()
    {
           
    }


    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------

    /**
     * Adds new message
     * @param message The message
     */
    Add(id: string, message: ArticleMakerMessage)
    {
        this.messages.InsertFront(new ValuePair<string, ArticleMakerMessage>(id, message));
        this.OnChange.Invoke(this, null);
    }

    /**
     * Removes a message
     * @param id ID of the message
     */
    Remove(id: string)
    {
        //Iterate messages and find target element
        for (let item = this.messages.First(); item.HasValue(); item.Next())
        {
            //Found the target element
            if (item.Value().first === id)
            {
                this.messages.RemoveAt(item);
                this.OnChange.Invoke(this, null);
                return;
            }
        }

        console.error(`ArticleMakerMessageHandler() - message with ID "${id}" not found`);
    }

    /**
     * Returns count of currently stored messages
     */
    Count(): number
    {
        return this.messages.Count();
    }

    /**
     * Generates HTML of all the panels
     */
    GenerateHTML(): string
    {
        let finalHTML = "";
        for (let item = this.messages.First(); item.HasValue(); item.Next())
            finalHTML += item.Value().second.GenerateHTML();
        return finalHTML;
    }

}

//--------------------------------------------------
//----------ARTICLE MAKER MESSAGE-------------------
//--------------------------------------------------
abstract class ArticleMakerMessage
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    protected abstract typeClass: string;
    protected message: string;

    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    constructor(message: string)
    {
        this.message = message;
    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------
    /**
     * Generates message HTML
     */
    GenerateHTML(): string
    {
        return `
            <div class="articleMakerMessage ${this.typeClass}">
                <span>${this.message}</span>
            </div>
        `;
    }
}

export class ArticleMakerMessage_Error extends ArticleMakerMessage
{
    typeClass = "articleMakerMessageError";
}
(window as any).ArticleMakerMessage_Error = ArticleMakerMessage_Error;

export class ArticleMakerMessage_Warning extends ArticleMakerMessage
{
    typeClass = "articleMakerMessageWarning";
}
(window as any).ArticleMakerMessage_Warning = ArticleMakerMessage_Warning;

export class ArticleMakerMessage_Success extends ArticleMakerMessage
{
    typeClass = "articleMakerMessageSuccess";
}
(window as any).ArticleMakerMessage_Success = ArticleMakerMessage_Success;

//--------------------------------------------------
//----------ARTICLE MAKER MESSAGE SETTINGS----------
//--------------------------------------------------
enum ArticleMakerMessageType
{
    Error = 0,
    Warning = 1,
    Success = 2
}