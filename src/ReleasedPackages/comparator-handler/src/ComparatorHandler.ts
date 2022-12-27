import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { IComparable } from "@drozdik.m/common-interfaces/IComparable";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";
import { IDisposable } from "@drozdik.m/common-interfaces/IDisposable";
import { DefaultComparator } from "@drozdik.m/default-comparator";

/**
 * Class for easy handling of comparators. If explicit comparator is set, automatic
 * recognition of IComparable interface is turned off (on by default). It can be also turned
 * off manually. The class starts with default comparator for primitive types.
 * */
export class ComparatorHandler<T> implements IClonable<ComparatorHandler<T>>, IDisposable
{
    //--------------------------------------------------
    //----------ATTRIBUTES------------------------------
    //--------------------------------------------------
    /**
     * Default comparator function.
     * Returns -1 if a < b
     * Returns 0 if a == b
     * Returns 1 if a > b
     * @param a Item #1
     * @param b Item #2
     */
    private DefaultComparator: IComparator<T> = function (a: T, b: T): number
    {
        return DefaultComparator<T>(a, b);
    };
    private comparator: IComparator<T> = this.DefaultComparator;
    protected automaticIComparableRecognition = true;

    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    /**
     * Creates new instance of ConparatorHandler. If explicit comparator is set,
     * automatic recognition of IEcomparable if turned off.
     * @param comparator Explicit comparator
     */
    constructor(comparator: IComparator<T> = null)
    {
        if (comparator != null)
            this.SetComparator(comparator);
    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------
    Clone(): ComparatorHandler<T>
    {
        let newComparatorHandler = new ComparatorHandler<T>();
        newComparatorHandler.comparator = this.comparator;
        newComparatorHandler.automaticIComparableRecognition = this.automaticIComparableRecognition;
        return newComparatorHandler;
    }

    /**
     * Sets new comparator to use and turns off the automatic IComparable recognition.
     * @param newComparator? The new comparator (nullable)
     */
    SetComparator(newComparator?: IComparator<T>): void
    {
        if (newComparator == null)
            return;

        this.comparator = newComparator;
        this.automaticIComparableRecognition = false;
    }

    /**
     * Set the automatic recognition on/off
     * @param OnOff True for on, false for off
     */
    SetAutomaticIComparableRecognition(OnOff: boolean)
    {
        this.automaticIComparableRecognition = OnOff;
    }

    /**
     * If automatic IComparable recognition is on, tries to find new comparator.
     * @param item Item to dig in
     */
    private AutomaticIComparableRecognition(item: T): void
    {
        //Is turned off 
        if (!this.automaticIComparableRecognition)
            return;

        //Check if T has GetComparator() method
        if (typeof (<any>item).GetComparator != "undefined")
            this.comparator = (<IComparable<T>>(<any>item)).GetComparator();
    }

    /**
     * Comparator function. If no explicit comparator has been set and automatic IComparable recognition
     * is on, the comparator function is set to a.GetComparator().
     * Returns -1 if a < b
     * Returns 0 if a == b
     * Returns 1 if a > b
     * @param a Item #1
     * @param b Item #2
     */
    Compare(a: T, b: T): number
    {
        //Fish for new comparator
        this.AutomaticIComparableRecognition(a);

        //Do the compare
        let res = this.comparator(a, b);
        if (res < 0)
            return -1;
        else if (res > 0)
            return 1;
        return 0;
    }

    Dispose(): void
    {
        this.comparator = null;
    }
}


