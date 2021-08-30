import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";
import { IMergable } from "@drozdik.m/common-interfaces/IMergable";
import { ICountable } from "@drozdik.m/common-interfaces/ICountable";
import { IBuildable } from "@drozdik.m/common-interfaces/IBuildable";
import { IDisposable } from "@drozdik.m/common-interfaces/IDisposable";
import { ComparatorHandler } from "@drozdik.m/comparator-handler";

export abstract class BinaryHeap<T> implements IClonable<BinaryHeap<T>>, IMergable<BinaryHeap<T>>, ICountable, IBuildable<T>, IDisposable
{
    //--------------------------------------------------
    //----------ATTRIBUTES------------------------------
    //--------------------------------------------------
    protected comparator: ComparatorHandler<T>;
    protected heapArray: T[] = [];

    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    constructor(comparator: IComparator<T> = null)
    {
        this.comparator = new ComparatorHandler<T>(comparator);
    }

    //--------------------------------------------------
    //----------ORIENTATION-----------------------------
    //--------------------------------------------------
    /**
     * Returns index of left son
     * @param index Source index
     */
    private LeftSon(index: number): number
    {
        index = (index + 1) * 2;
        if (index > this.heapArray.length)
            return null;
        return --index;
    }

    /**
     * Returns index of right son
     * @param index Source index
     */
    private RightSon(index: number): number
    {
        index = ((index + 1) * 2) + 1;
        if (index > this.heapArray.length)
            return null;
        return --index;
    }

    /**
     * Returns index of parent
     * @param index Source index
     */
    private Parent(index: number): number
    {
        if (index == 0)
            return null;

        index = Math.floor(++index / 2);
        if (index > this.heapArray.length)
            return null;

        return --index;
    }

    /**
     * Tests if source is left or right child
     * @param index Source index
     */
    private IsLeftChild(index: number): boolean
    {
        if (index == 0)
            return false;
        return ++index % 2 == 0;
    }

    /**
     * Tests if source is left or right child
     * @param index Source index
     */
    private IsRightChild(index: number): boolean
    {
        if (index == 0)
            return false;
        return ++index % 2 == 1;
    }

    //--------------------------------------------------
    //----------BUBBLING--------------------------------
    //--------------------------------------------------

    private BubbleUp(index: number): void
    {
        let parent = this.Parent(index);

        //No parent
        if (parent == null)
            return;

        //Compare parent
        if (this.ComparatorWrapper(this.heapArray[parent], this.heapArray[index]) == 1)
        {
            let parentValue = this.heapArray[parent];
            this.heapArray[parent] = this.heapArray[index];
            this.heapArray[index] = parentValue;
            this.BubbleUp(parent);
        }
    }

    private BubbleDown(index: number): void
    {
        let sonLeft = this.LeftSon(index);
        let sonRight = this.RightSon(index);

        let chosenChild = null;

        //No children
        if (sonLeft == null && sonRight == null)
            return;

        //Only right child
        if (sonLeft == null)
            chosenChild = sonRight;

        //Only left child
        if (sonRight == null)
            chosenChild = sonLeft;

        //Two children
        else
            chosenChild = (this.ComparatorWrapper(this.heapArray[sonLeft], this.heapArray[sonRight]) == -1) ? sonLeft : sonRight;

        //Check if should swap, if so, do the swap and continue
        if (this.ComparatorWrapper(this.heapArray[index], this.heapArray[chosenChild]) == 1)
        {
            let indexValue = this.heapArray[index];
            this.heapArray[index] = this.heapArray[chosenChild];
            this.heapArray[chosenChild] = indexValue;
            this.BubbleDown(chosenChild);
        }
    }

    //--------------------------------------------------
    //----------METHODS---------------------------------
    //--------------------------------------------------
    protected CloneHeap(): BinaryHeap<T>
    {
        let res = this.GetEmptyHeap();
        for (let i = 0; i < this.heapArray.length; i++)
        {
            if (this.heapArray[i] != null)
            {
                if (typeof (<any>this.heapArray[i]).Clone != "undefined")
                    res.heapArray.push((<any>this.heapArray[i]).Clone());
                else
                    res.heapArray.push(this.heapArray[i]);
            }
            else
                res.heapArray.push(null);
        }
        return res;
    }

    /**
     * Returns empty heap copy.
     * */
    protected abstract GetEmptyHeap(): BinaryHeap<T>;

    abstract Clone(): BinaryHeap<T>;

    /**
     * Wraps comparator so the heap is easily transfarable to min/max heap
     * @param a Parameter 1
     * @param b Parameter 2
     */
    protected abstract ComparatorWrapper(a: T, b: T): number;

    protected InsertValue(item: T): void
    {
        this.heapArray.push(item);
        this.BubbleUp(this.heapArray.length - 1);
    }

    protected Value(): T
    {
        if (this.heapArray.length > 0)
            return this.heapArray[0];
        return null;
    }

    protected DeleteValue(): void
    {
        if (this.heapArray.length <= 0)
            return;

        this.heapArray[0] = this.heapArray[this.heapArray.length - 1];
        this.heapArray.pop();
        this.BubbleDown(0);
    } 

    protected ExtractValue(): T
    {
        let value = this.Value();
        this.DeleteValue();
        return value;
    }

    Merge(obj: BinaryHeap<T>): void
    {
        let newHeapArray = this.heapArray.concat(obj.heapArray);
        this.Build(newHeapArray);
    }

    Count(): number
    {
        return this.heapArray.length;
    }

    IsEmpty(): boolean
    {
        return this.Count() == 0;
    }

    Dispose(): void
    {
        this.comparator.Dispose();
        this.comparator = null;
        this.Clear();
    }

    Build(items: T[]): void
    {
        this.Clear();

        if (items.length == 0)
            return;

        this.heapArray = items;
        for (let i = Math.ceil((this.heapArray.length - 1) / 2); i >= 0; i--)
            this.BubbleDown(i);
    }

    Clear(): void
    {
        this.heapArray = [];
    }

    ChangeKey(newKey: T): void
    {
        //Change key
        let currentKey = this.heapArray[0];
        this.heapArray[0] = newKey;

        //Bubble down if key changed the wrong way
        if (this.ComparatorWrapper(newKey, currentKey) == 1)
            this.BubbleDown(0);
    }
}
