import { WindowEvents, ResizeArgs } from "@drozdik.m/window-events"
import { Event } from "@drozdik.m/event"
import { MenuResizeArgs } from "../args/MenuResizeArgs";
import { MenuStatusArgs } from "../args/MenuStatusArgs";

export class Menu
{
    private menu: HTMLElement;

    private widthBreakpoint: number;
    private widthBreaking = false;
    private isDesktopMenu = true;

    private menuOpen = false;

    //private heightBreakpint: number;
    //private isScrollTop: boolean = false;

    //Callbacks
    /*OnScrollTop: Callback = new Callback();
    OnScrollTopOnce: Callback = new Callback();
    OnScrollBottom: Callback = new Callback();
    OnScrollBottomOnce: Callback = new Callback();*/

    OnMenuOpen = new Event<Menu, MenuStatusArgs>();
    OnMenuClose = new Event<Menu, MenuStatusArgs>();

    OnDesktopMenu = new Event<Menu, MenuResizeArgs>();
    OnDesktopMenuOnce = new Event<Menu, MenuResizeArgs>();
    OnMobileMenu = new Event<Menu, MenuResizeArgs>();
    OnMobileMenuOnce = new Event<Menu, MenuResizeArgs>();

    //Toggle buttons
    //private toggleButtons: HTMLElement[] = []

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    constructor(menuElement: HTMLElement)
    {
        this.menu = menuElement;
        this.menu.classList.add("closedMenu")
        this.menu.classList.remove("openMenu")
        this.menu.classList.add("desktopMenu")
        this.menu.classList.remove("mobileMenu")
    }

    //--------------------------------------------------
    //---------GETTERS----------------------------------
    //--------------------------------------------------
    /**
     * Tells if the menu is opened
     * */
    IsOpen()
    {
        return this.menuOpen
    }

    /**
     * Tells if the menu is in a desktop mode
     * */
    IsDesktop()
    {
        return this.isDesktopMenu
    }

    /**
     * Tells if the menu is in a mobile mode
     * */
    IsMobile()
    {
        return !this.isDesktopMenu
    }

    //--------------------------------------------------
    //---------OPEN/CLOSE-------------------------------
    //--------------------------------------------------
    /**
    * Opens the menu
    */
    Open()
    {
        this.menu.classList.add("openMenu")
        this.menu.classList.remove("closedMenu")
        this.menuOpen = true;
        this.OnMenuOpen.Invoke(this, new MenuStatusArgs(this.menuOpen));
    }

    /**
    * Closes the menu
    */
    Close()
    {
        this.menu.classList.add("closedMenu")
        this.menu.classList.remove("openMenu")
        this.menuOpen = false;
        this.OnMenuClose.Invoke(this, new MenuStatusArgs(this.menuOpen));
    }

    /**
     * Closes the menu if its opened. Opens the menu if closed
     * */
    Toggle()
    {
        if (this.menuOpen)
            this.Close();
        else
            this.Open();
    }

    /**
     * Sets toggle function to a specific element/button
     * @param button
     */
    AddToggleButton(button: HTMLElement): Menu
    {
        let object = this
        button.addEventListener("click", function ()
        {
            object.Toggle();
        });
        return this;
    }

    //--------------------------------------------------
    //---------RESIZE-----------------------------------
    //--------------------------------------------------
    /**
     * Enables the desktop/mobile switcher
     * @param breakpoint The mobile/desktop treshold
     */
    SetWidthBreaking(breakpoint: number): Menu
    {
        //Set new breaking point
        this.widthBreakpoint = breakpoint;

        //Return if already on
        if (this.widthBreaking)
            return;
        this.widthBreaking = true;

        //Add the resize event
        let object = this;
        WindowEvents.OnResize.Add(function (caller, args)
        {
            object.HandleResize();
        })
        object.HandleResize()

        return this;
    }

    /**
     * Handlers window resize event
     * @param caller The window event object
     * @param args Resize args
     */
    private HandleResize()
    {
        //Mobile
        if (WindowEvents.Width() < this.widthBreakpoint)
        {
            this.OnMobileMenu.Invoke(this, new MenuResizeArgs(this.menu))
            if (this.isDesktopMenu)
            {
                this.menu.classList.add("mobileMenu")
                this.menu.classList.remove("desktopMenu")
                this.OnMobileMenuOnce.Invoke(this, new MenuResizeArgs(this.menu))
            }
            this.isDesktopMenu = false;
        }
        //Desktop
        else
        {
            this.OnDesktopMenu.Invoke(this, new MenuResizeArgs(this.menu))
            if (!this.isDesktopMenu)
            {
                this.menu.classList.add("desktopMenu")
                this.menu.classList.remove("mobileMenu")
                this.OnDesktopMenuOnce.Invoke(this, new MenuResizeArgs(this.menu))
            }
                
            this.isDesktopMenu = true;
        }
    }
}