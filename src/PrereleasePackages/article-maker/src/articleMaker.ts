import { DialogWindow } from "@drozdik.m/dialog-window";
import { ValuePair } from "@drozdik.m/pair";
import * as $ from "jquery";
import { CommonDialogWindow } from "@drozdik.m/common-dialog-window";
import { ArticleMakerFileHandler } from "./articleMakerFileHandler";
import { ArticleMakerItem } from "./articleMakerItem";
import { ArticleMakerItem_Paragraph } from "./items/articleMakerItem_Paragraph";
import { ArticleMakerItem_TextWithSideBorder } from "./items/articleMakerItem_TextWithSideBorder";
import { ArticleMakerItem_ImportantText } from "./items/articleMakerItem_ImportantText";
import { ArticleMakerItem_Heading } from "./items/articleMakerItem_Heading";
import { ArticleMakerItem_Quotation } from "./items/articleMakerItem_Quotation";
import { ArticleMakerItem_Image } from "./items/articleMakerItem_Image";
import { ArticleMakerItem_Divider } from "./items/articleMakerItem_Divider";
import { ArticleMakerItem_UnorderedList } from "./items/articleMakerItem_UnorderedList";
import { ArticleMakerItem_OrderedList } from "./items/articleMakerItem_OrderedList";
import { ArticleMakerItem_YoutubeVideo } from "./items/articleMakerItem_YoutubeVideo";
import { ArticleMakerItem_HTML } from "./items/articleMakerItem_HTML";
import { ArticleMakerItem_File } from "./items/articleMakerItem_File";
import { ArticleMakerItem_BigLink } from "./items/articleMakerItem_BigLink";
import { ArticleMakerLanguage } from "./articleMakerLanguage";
import { ArticleMakerMessagesHandler, ArticleMakerMessage_Warning, ArticleMakerMessage_Error, ArticleMakerMessage_Success } from "./articleMakerMessageHandler";
import "../jquery/jquery-ui.min.js";
import { ArticleMakerItem_CodeSnippet } from "./items/articleMakerItem_CodeSnippet";
import { Event } from "@drozdik.m/event";
import { AnimationProperties } from "./animationProperties/animationProperties";
import { TemporaryElement } from "./temporaryElement/temporaryElement";


//--------------------------------------------------
//----------ARTICLE MAKER---------------------------
//--------------------------------------------------
export class ArticleMaker
{
    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    //Textarea and IDs
    private makerId: string = "";
    private hasTextarea: boolean = true;
    private textareaId: string = "";

    //ID restrictions
    private disallowedElements: ArticleMakerItemID[] = [];

    //Items
    private items: ArticleMakerItem[] = [];
    private idCounter: number = 0;

    //Edit dialog window
    private editDialog: DialogWindow;
    private currentlyEditedItemOrder: number = -1;

    //Preview
    private previewDialog: DialogWindow;

    //Create items
    private createDialog: DialogWindow;

    //File handler
    private fileHandlers: ValuePair<ArticleMakerFileHandler, string>[] = [];
    private imageFileHandler: ArticleMakerFileHandler;
    private filesFileHandler: ArticleMakerFileHandler;

    //Callbacks
    OnChange: Event<ArticleMaker, null> = new Event<ArticleMaker, null>();

    //Animation properties 
    private animationProperties: AnimationProperties = new AnimationProperties();

    //Messages
    messages: ArticleMakerMessagesHandler = new ArticleMakerMessagesHandler();
    private changesWereMade: boolean = false;


    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    constructor(makerId: string, disallowedElements: ArticleMakerItemID[] = [])
    {
        let object = this;
        
        //Variables
        this.makerId = makerId;
        this.textareaId = makerId + "OutputTextarea";
        this.disallowedElements = disallowedElements;

        //Find and handle textarea
        let $maker = $("#" + makerId);
        let $textarea = $maker.find("textarea");
        if ($textarea.length == 0)
            this.hasTextarea = false;
        else
            $textarea.prop("id", this.textareaId).css("display", "none");

        //File handler
        this.imageFileHandler = new ArticleMakerFileHandler(this.makerId, this.makerId + "ImageFileHandler", "articleImage");
        this.fileHandlers.push(new ValuePair<ArticleMakerFileHandler, string>(this.imageFileHandler, ArticleMakerLanguage.GetWord("FileHandler - Images heading")));
        this.filesFileHandler = new ArticleMakerFileHandler(this.makerId, this.makerId + "FilesFileHandler", "articleFile");
        this.fileHandlers.push(new ValuePair<ArticleMakerFileHandler, string>(this.filesFileHandler, ArticleMakerLanguage.GetWord("FileHandler - Files heading")));

        //Append items container
        $maker.append("<div class=\"itemsContainer\"></div>");

        //Add maker class
        $maker.addClass("articleMaker");

        //Initialize edit
        this.InitializeEdit();

        //Initialize preview
        this.InitializePreview();

        //Initialize create window
        this.InitializeCreateWindow();

        //Initialize control panel
        this.InitializeControlPanel();


        //Get text from textarea and translate it
        if (this.hasTextarea)
        {
            let textareaHTML = $textarea.prop("value");
            this.LoadHTML(textareaHTML);
        }

        //Initialize messages
        this.InitializeMessage();

        //Forbit submits
        $("#" + this.makerId + " button").click(function (e)
        {
            e.preventDefault();
        });
    }

    //--------------------------------------------------
    //---------INITIALIZATION---------------------------
    //--------------------------------------------------
    /**
     * Initialize edit interface
     */
    private InitializeEdit()
    {
        //Variables
        let $maker = $("#" + this.makerId);

        //Edit dialog window append
        $maker.append(`
            <div id="${this.makerId}EditDialog" class="dialogWindow">
                <div class="dialogBackground dialogClose">&nbsp;</div>
                <div class="dialogContent">
                    <div class="dialogCross dialogClose"><div class="line line1">&nbsp;</div><div class="line line2">&nbsp;</div></div>
                    <p class="dialogWindowHeading">${ArticleMakerLanguage.GetWord("Edit - Heading")}</p>
                    <div class="editInputsWrapper form commonForm">
                        
                    </div>
                    <div class="commonButtonWrapper">
                        <button type="button" type="button" class="commonButton commonButtonGreen confirmButton">${ArticleMakerLanguage.GetWord("Buttons - Save")}</button>
                        <button type="button" class="commonButton dialogClose">${ArticleMakerLanguage.GetWord("Buttons - Close")}</button>
                    </div>
                </div>
            </div>
        `);

        //Dialog window object
        this.editDialog = new DialogWindow(this.makerId + "EditDialog");
    }

    /**
     * Initialize preview interface
     */
    private InitializePreview()
    {
        //Variables
        let $maker = $("#" + this.makerId);

        //Preview dialog window
        $maker.append(`
            <div id="${this.makerId}PreviewDialog" class="dialogWindow articlePreviewDialogWindow">
                <div class="dialogBackground dialogClose">&nbsp;</div>
                <div class="dialogContent">
                    <div class="dialogCross dialogClose"><div class="line line1">&nbsp;</div><div class="line line2">&nbsp;</div></div>
                    <div class="article articleBlock">
                        
                    </div>
                    <div class="commonButtonWrapper">
                        <button type="button" class="commonButton dialogClose">${ArticleMakerLanguage.GetWord("Buttons - Close")}</button>
                    </div>
                </div>
            </div>
        `);

        //Dialog window object
        this.previewDialog = new DialogWindow(this.makerId + "PreviewDialog");
    }

    /**
     * Initialize creation interface
     */
    private InitializeCreateWindow()
    {
        //Variables
        let $maker = $("#" + this.makerId);

        //Generate allowed elements
        let createOptions = "";
        for (let i = 0; true; i++)
        {
            //New object
            let res = this.CreateObjectById(i);

            //At the end
            if (res == null)
                break;

            //Check if allowed and add
            if (this.disallowedElements.indexOf(i) == -1)
                createOptions += `<option value="${res.typeId}">${res.typeName}</option>"`;
        }

        //Append dialog window
        $maker.append(`
            <div id="${this.makerId}AddNewItemDialog" class="dialogWindow">
                <div class="dialogBackground dialogClose">&nbsp;</div>
                <div class="dialogContent">
                    <div class="dialogCross dialogClose"><div class="line line1">&nbsp;</div><div class="line line2">&nbsp;</div></div>
                    <p class="dialogWindowHeading">${ArticleMakerLanguage.GetWord("Create - Heading")}</p>
                    <div class="form commonForm">
                        <div class="formBlock">
                            <label for="createNewItemSelect">${ArticleMakerLanguage.GetWord("Create - New item")}</label>
                            <select id="createNewItemSelect">
                                ${createOptions}
                            </select>
                        </div>
                    </div>
                    <div class="commonButtonWrapper">
                        <button type="button" class="commonButton commonButtonGreen createSelectedItemButton dialogClose">${ArticleMakerLanguage.GetWord("Buttons - Add")}</button>
                        <button type="button" class="commonButton dialogClose">${ArticleMakerLanguage.GetWord("Buttons - Close")}</button>
                    </div>
                </div>
            </div>
        `);

        //Dialog window object
        this.createDialog = new DialogWindow(this.makerId + "AddNewItemDialog");

        //Add item
        let object = this;
        $maker.find("#" + this.makerId + "AddNewItemDialog .createSelectedItemButton").click(function ()
        {
            //Get new item id
            let itemId = $("#" + object.makerId + "AddNewItemDialog #createNewItemSelect").prop("value");

            //Create item
            let newItem = object.CreateObjectById(itemId, object.CreateDefaultName(itemId));

            //Add the item
            object.AddItem(newItem);

            //Edit the item
            object.OpenEditWindow(newItem.order);
        });
    }

    /**
     * Initialize control panel
     */
    private InitializeControlPanel()
    {
        //Variables
        let $maker = $("#" + this.makerId);

        //Control panel
        $maker.prepend(`
            <div class="controlPanel">
                <div class="controlPanelButton openCreateDialogWindowButton">
                    <div class="controlPanelButtonImage">&nbsp;</div>
                    <span class="controlPanelButtonText">${ArticleMakerLanguage.GetWord("Menu - Add")}</span>
                </div>
                <div class="controlPanelButton previewArticleButton">
                    <div class="controlPanelButtonImage">&nbsp;</div>
                    <span class="controlPanelButtonText">${ArticleMakerLanguage.GetWord("Menu - Preview")}</span>
                </div>
                <div class="controlPanelButton expandeAllButton">
                    <div class="controlPanelButtonImage">&nbsp;</div>
                    <span class="controlPanelButtonText">${ArticleMakerLanguage.GetWord("Menu - Open previews")}</span>
                </div>
                <div class="controlPanelButton contractAllButton">
                    <div class="controlPanelButtonImage">&nbsp;</div>
                    <span class="controlPanelButtonText">${ArticleMakerLanguage.GetWord("Menu - Close previews")}</span>
                </div>
                <div class="controlPanelButton deleteAllButton">
                    <div class="controlPanelButtonImage">&nbsp;</div>
                    <span class="controlPanelButtonText">${ArticleMakerLanguage.GetWord("Menu - Delete all")}</span>
                </div>
            </div>
        `);
        /*
                <div class="controlPanelButton analysisButton">
                    <div class="controlPanelButtonImage">&nbsp;</div>
                    <span class="controlPanelButtonText">Analýza</span>
                </div>
        */

        //Delete all - button
        let object = this;
        $("#" + this.makerId + " .deleteAllButton").click(function ()
        {
            CommonDialogWindow.RedConfirm(ArticleMakerLanguage.GetWord("Delete all dialog - Message"), function ()
            {
                object.RemoveAllItems();
            },  ArticleMakerLanguage.GetWord("Delete dialog - Heading"),
            ArticleMakerLanguage.GetWord("Buttons - Close"),
            ArticleMakerLanguage.GetWord("Delete dialog - Confirm"));
        });

        //Open/Close all previews - button
        $("#" + this.makerId + " .expandeAllButton").click(function ()
        {
            object.OpenAllPreviews();
        });
        $("#" + this.makerId + " .contractAllButton").click(function ()
        {
            object.CloseAllPreviews();
        });

        //Preview article - button
        $("#" + this.makerId + " .previewArticleButton").click(function ()
        {
            object.ShowPreview();
        });

        //Open add item dialog - button
        $("#" + this.makerId + " .openCreateDialogWindowButton").click(function ()
        {
            object.createDialog.Open();
        });

    }

    /**
     * Initialize messages
     */
    private InitializeMessage()
    {
        //Variables
        let $maker = $("#" + this.makerId);
        let $controlPanel = $maker.find(".controlPanel");

        //Append message wrapper
        $(`<div class="articleMakerMessagesWrapper"></div>`).insertAfter($controlPanel);

        //Add callback and behaviour
        let object = this;
        this.messages.OnChange.Add(function ()
        {
            let messagesHTML = object.messages.GenerateHTML();
            let $messageWrapper = $("#" + object.makerId).find(".articleMakerMessagesWrapper");

            //Cear and add new messages
            $messageWrapper.empty().append(messagesHTML);

            //Animate
            let originalHeight = $messageWrapper.height()
            $messageWrapper.css("height", "auto");
            let targetHeight = $messageWrapper.height();
            $messageWrapper.height(originalHeight);
            $messageWrapper.clearQueue().stop();
            $messageWrapper.animate({ height: `${targetHeight}px` }, object.animationProperties.length, object.animationProperties.easing);
        });

        //Save warning
        this.OnChange.Add(function ()
        {
            //Already shown
            if (object.changesWereMade)
                return;

            //Add change warning
            object.changesWereMade = true;
            object.messages.Add("unsavedChanges", new ArticleMakerMessage_Warning(ArticleMakerLanguage.GetWord("Unsaved changes warning")));
        });
    }

    //--------------------------------------------------
    //---------UI---------------------------------------
    //--------------------------------------------------

    /**
     * Creates default new name of an item
     * @param typeId Type ID of the element
     */
    private CreateDefaultName(typeId: number): string
    {
        let itemsCount = 0;
        for (let i = 0; i < this.items.length; i++)
        {
            if (this.items[i].typeId == typeId)
                itemsCount++;
        }
        let typeName = this.CreateObjectById(typeId).typeName;

        return typeName + " #" + (itemsCount + 1);
    }

    /**
    * Refreshes all actions
    */
    private RefreshActions()
    {
        let object = this;

        let $maker = $("#" + this.makerId);
        let $itemsWrapper = $maker.find(".itemsContainer");
        let $items = $itemsWrapper.find(".itemControlPanel");

        //Refresh open/close
        let $togglePreviewButton = $itemsWrapper.find(".itemPanelOpenOrClosePreview");
        $togglePreviewButton.off("click.articleMaker")
        $togglePreviewButton.on("click.articleMaker", function ()
        {
            let $item = $(this).closest(".itemControlPanel");
            let itemId = parseInt($item.data("itemOrderId"));

            object.TogglePreview(itemId);
        });

        //Move items
        (<any>$itemsWrapper).sortable({
            items: ".itemControlPanel",
            handle: ".itemPanelDragAndDrop",
            placeholder: "itemPanelDragAndDropPlaceholder",
            update: function ()
            {
                object.RefreshUIOrder();
                object.RefreshUI();
            }
            /*revert: 'invalid'*/
        });

        //Delete items
        let $deleteButtons = $itemsWrapper.find(".itemPanelDelete");
        $deleteButtons.off("click.articleMaker");
        $deleteButtons.on("click.articleMaker", function ()
        {
            let innerObject = this;
            CommonDialogWindow.RedConfirm(ArticleMakerLanguage.GetWord("Delete dialog - Message"), function ()
            {
                let $item = $(innerObject).closest(".itemControlPanel");
                let itemId = parseInt($item.data("itemOrderId"));

                object.RemoveItem(itemId);
            }, ArticleMakerLanguage.GetWord("Delete dialog - Heading"),
            ArticleMakerLanguage.GetWord("Buttons - Close"),
            ArticleMakerLanguage.GetWord("Delete dialog - Confirm"));
        });

        //Edit items
        let $editButtons = $itemsWrapper.find(".itemPanelEdit"); //makerId + "EditDialog"
        $editButtons.off("click.articleMaker");
        $editButtons.on("click.articleMaker", function ()
        {
            let $item = $(this).closest(".itemControlPanel");
            let itemId = parseInt($item.data("itemOrderId"));
            object.OpenEditWindow(itemId);
        });


    }

    /**
    * Refresh 
    */
    private RefreshUIOrder()
    {
        let object = this;

        //Handle UI order - read current order and swap it in the array
        let $maker = $("#" + this.makerId);
        let $itemsWrapper = $maker.find(".itemsContainer");
        let $item = $itemsWrapper.find(".itemControlPanel");
        let newItemsArray: ArticleMakerItem[] = [];
        newItemsArray.length = this.items.length;
        $item.each(function (i)
        {
            let orderId = $(this).data("itemOrderId");
            newItemsArray[i] = object.items[orderId];
        });
        this.items = newItemsArray;
    }

    /**
    * Refreshed UI by current state of item array
    */
    private RefreshUI()
    {
        let object = this;

        let $maker = $("#" + this.makerId);
        let $itemsWrapper = $maker.find(".itemsContainer");

        //Respawn items and correct order IDs
        let resultHTML = "";
        for (let i = 0; i < this.items.length; i++)
        {
            this.items[i].order = i;
            resultHTML += this.items[i].GeneratePanelHTML();
        }
        for (let i = 0; i < this.fileHandlers.length; i++)
            resultHTML += this.fileHandlers[i].first.GeneratePreviewHTML(this.fileHandlers[i].second);

        $itemsWrapper.empty().append(resultHTML);

        //Refresh actions
        this.RefreshActions();

        //Refresh textarea content
        this.UpdateTextarea();

        //Callback
        this.OnChange.Invoke(this, null);
    }

    /**
     * Open preview of an item
     * @param orderId Order ID of the item
     */
    OpenPreview(orderId: number)
    {
        if (this.items[orderId].isOpen)
            return;
        this.items[orderId].isOpen = true;

        let $maker = $("#" + this.makerId);
        let $itemsWrapper = $maker.find(".itemsContainer");
        let $item = $itemsWrapper.find(`[data-item-order-id=\"${orderId}\"]`);
        let $itemPreview = $item.find(".itemPreview");

        $item.addClass("openedItem").removeClass("closedItem")
        $itemPreview.css("display", "none").clearQueue().stop().slideToggle(this.animationProperties.length, this.animationProperties.easing);
    }

    /**
     * Close preview of an item
     * @param orderId Order ID of the item
     */
    ClosePreview(orderId: number)
    {
        if (!this.items[orderId].isOpen)
            return;
        this.items[orderId].isOpen = false;

        let $maker = $("#" + this.makerId);
        let $itemsWrapper = $maker.find(".itemsContainer");
        let $item = $itemsWrapper.find(`[data-item-order-id=\"${orderId}\"]`);
        let $itemPreview = $item.find(".itemPreview");

        $item.removeClass("openedItem").addClass("closedItem");
        $itemPreview.css("display", "block").clearQueue().stop().slideToggle(this.animationProperties.length, this.animationProperties.easing);
    }

    /**
    * Opens all previews
    */
    OpenAllPreviews()
    {
        for (let i = 0; i < this.items.length; i++)
            if (!this.items[i].isOpen)
                this.OpenPreview(i);
    }

    /**
    * Closes all previews
    */
    CloseAllPreviews()
    {
        for (let i = 0; i < this.items.length; i++)
            if (this.items[i].isOpen)
                this.ClosePreview(i);
    }

    /**
     * Opens or closes an item
     * @param orderId Order ID of the item
     */
    TogglePreview(orderId: number)
    {
        let $maker = $("#" + this.makerId);
        let $itemsWrapper = $maker.find(".itemsContainer");
        let $item = $itemsWrapper.find(`[data-item-order-id=\"${orderId}\"]`);

        if (!this.items[orderId].isOpen)
            this.OpenPreview(orderId);
        else
            this.ClosePreview(orderId);
    }

    /**
     * Opens edit window of an item
     * @param orderId Order ID of the item
     */
    OpenEditWindow(orderId: number)
    {
        this.currentlyEditedItemOrder = orderId;

        let object = this;
        let $window = $("#" + this.makerId + "EditDialog");
        let $input = $window.find(".editInputsWrapper");
        let $confirmButton = $window.find(".confirmButton");

        $input.empty();
        $input.append(this.items[orderId].GetInputsHTML());

        $confirmButton.off("click.articleMaker").on("click.articleMaker", function ()
        {
            //Not valid syntax
            if (!object.items[object.currentlyEditedItemOrder].CheckInputsSyntax())
            {
                CommonDialogWindow.Error(ArticleMakerLanguage.GetWord("Bonsai Markup - Invalid syntax - Message"),
                    ArticleMakerLanguage.GetWord("Bonsai Markup - Invalid syntax - Heading"),
                    ArticleMakerLanguage.GetWord("Buttons - Close"));
                return;
            }

            object.items[object.currentlyEditedItemOrder].SaveValues();
            object.items[object.currentlyEditedItemOrder].DestroyInputs();
            $(this).off("click.articleMaker");
            object.RefreshUI();
            object.editDialog.Close();
        });

        this.editDialog.Open();
    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------

    /**
     * Adds new item to the array
     * @param item Item to add
     */
    AddItem(item: ArticleMakerItem)
    {
        item.InsertIntoArticleMaker(this.items.length, this.idCounter++);
        this.items.push(item);
        this.RefreshUI();
    }

    /**
     * Removes an item
     * @param orderId Order ID of the item
     */
    RemoveItem(orderId: number)
    {
        this.items[orderId].Remove();

        //this.items.removeIndex(orderId);
        this.items.splice(orderId, 1);

        this.RefreshUI();
    }

    /**
    * Removes all items
    */
    RemoveAllItems()
    {
        let finalLength = this.items.length;
        for (let i = 0; i < finalLength; i++)
            this.RemoveItem(0);
        this.items = [];
        this.RefreshUI();
    }

    /**
    * Generates HTML of all elements in the article maker
    * @returns HTML
    */
    GenerateHTML(): string
    {
        let returnString = "";
        for (let i = 0; i < this.items.length; i++)
            returnString += this.items[i].GenerateHTML();
        return returnString;
    }

    /**
    * Opens dialog window with article preview
    */
    ShowPreview()
    {
        $("#" + this.makerId + " #" + this.makerId + "PreviewDialog .article").empty().append(this.GenerateHTML());
        this.previewDialog.Open();
    }

    /**
     * Removes all current elements and creates new ones from input HTML
     * @param newHTML Input HTML
     */
    LoadHTML(newHTML: string)
    {
        let object = this;

        let tempElement = new TemporaryElement();
        let $tempDiv = $("#" + tempElement.GetId());
        $tempDiv.append(newHTML);

        let $items = $tempDiv.find("[data-item-type-id]");
        $items.each(function (i)
        {
            let itemId = $(this).data("itemTypeId");
            let itemName = $(this).data("itemName");
            let itemHTML = $(this).clone().wrap("<div></div>").parent().html();

            let newItem = object.CreateObjectById(itemId, itemName);
            if (newItem != null)
            {
                newItem.ParseFromHTML(itemHTML); 
                object.AddItem(newItem);
            }
        });

        tempElement.Destroy();
    }

    /**
    * Updates textarea content
    */
    private UpdateTextarea()
    {
        let $maker = $("#" + this.makerId);
        let $textarea = $maker.find("#" + this.makerId + "OutputTextarea");
        $textarea.prop("value", this.GenerateHTML());
    }

    /**
     * Returns object by object ID
     * @param objectId Object ID
     * @param name Name of the object
     */
    private CreateObjectById(objectId: number, name: string = ""): ArticleMakerItem
    {
        if (objectId == ArticleMakerItemID.Paragraph)
            return new ArticleMakerItem_Paragraph(name, this.makerId);
        else if (objectId == ArticleMakerItemID.ImportantText)
            return new ArticleMakerItem_ImportantText(name, this.makerId);
        else if (objectId == ArticleMakerItemID.TextWithSideBorder)
            return new ArticleMakerItem_TextWithSideBorder(name, this.makerId);
        else if (objectId == ArticleMakerItemID.Heading)
            return new ArticleMakerItem_Heading(name, this.makerId);
        else if (objectId == ArticleMakerItemID.Quotation)
            return new ArticleMakerItem_Quotation(name, this.makerId);
        else if (objectId == ArticleMakerItemID.Image)
            return new ArticleMakerItem_Image(name, this.makerId, this.imageFileHandler);
        else if (objectId == ArticleMakerItemID.Divider)
            return new ArticleMakerItem_Divider(name, this.makerId);
        else if (objectId == ArticleMakerItemID.UnorderedList)
            return new ArticleMakerItem_UnorderedList(name, this.makerId);
        else if (objectId == ArticleMakerItemID.OrderedList)
            return new ArticleMakerItem_OrderedList(name, this.makerId);
        else if (objectId == ArticleMakerItemID.YoutubeVideo)
            return new ArticleMakerItem_YoutubeVideo(name, this.makerId);
        else if (objectId == ArticleMakerItemID.HTML)
            return new ArticleMakerItem_HTML(name, this.makerId);
        else if (objectId == ArticleMakerItemID.File)
            return new ArticleMakerItem_File(name, this.makerId, this.filesFileHandler);
        else if (objectId == ArticleMakerItemID.BigLink)
            return new ArticleMakerItem_BigLink(name, this.makerId, this.imageFileHandler);
        else if (objectId == ArticleMakerItemID.CodeSnippet)
            return new ArticleMakerItem_CodeSnippet(name, this.makerId);
        else
            return null;
    }
}

//Export to window
if (typeof window != "undefined")
    (<any>window).ArticleMaker = ArticleMaker;

//Item IDs
enum ArticleMakerItemID
{
    Paragraph = 0,
    ImportantText = 1,
    TextWithSideBorder = 2,
    Heading = 3,
    Quotation = 4,
    Image = 5,
    Divider = 6,
    UnorderedList = 7,
    OrderedList = 8,
    YoutubeVideo = 9,
    HTML = 10,
    File = 11,
    BigLink = 12,
    CodeSnippet = 13,
}
(<any>window).ArticleMakerItemID = ArticleMakerItemID;