import { IIterableBidirectionaly } from "@drozdik.m/common-interfaces/IIterableBidirectionaly";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";
import { IContainer } from "@drozdik.m/common-interfaces/IContainer";
import { ICountable } from "@drozdik.m/common-interfaces/ICountable";
import { IClearable } from "@drozdik.m/common-interfaces/IClearable";
import { IDisposable } from "@drozdik.m/common-interfaces/IDisposable";
import { IBidirectionalySearchableContainer } from "@drozdik.m/common-interfaces/IBidirectionalySearchableContainer";
import { IRemovableContainerByIterator } from "@drozdik.m/common-interfaces/IRemovableContainerByIterator";
import { IUpdatableContainerByIterator } from "@drozdik.m/common-interfaces/IUpdatableContainerByIterator";
import { IRandomAccessibleIterable } from "@drozdik.m/common-interfaces/IRandomAccessibleIterable";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { IBuildable } from "@drozdik.m/common-interfaces/IBuildable";
import { BinarySearchTreeNode } from "./BinarySearchTreeNode";
import { ComparatorHandler } from "@drozdik.m/comparator-handler";
import { BinarySearchTreeIterator } from "./BinarySearchTreeIterator";

export class BinarySearchTree<T> implements IIterableBidirectionaly<T>, IClonable<BinarySearchTree<T>>, IContainer<T>,
    ICountable, IClearable, IDisposable, IBidirectionalySearchableContainer <T>, IRemovableContainerByIterator <T>,
    IUpdatableContainerByIterator <T>, IRandomAccessibleIterable <T>, IBuildable<T>
{

    //--------------------------------------------------
    //----------VARIABLES-------------------------------
    //--------------------------------------------------
    private comparator: ComparatorHandler<T> = null;
    private root: BinarySearchTreeNode<T> = null;

    //--------------------------------------------------
    //---------CONSTRUCTOR------------------------------
    //--------------------------------------------------
    /**
     * Creates new instance of the object.
     * @param items Initial items in the binary search tree.
     * @param comparator Comparator - It automatically detects IComparable classes.
     */
    constructor(items: T[] = [], comparator: IComparator<T> = null)
    {
        this.comparator = new ComparatorHandler<T>(comparator);
        this.Build(items);
    }

    //--------------------------------------------------
    //---------VALUE------------------------------------
    //--------------------------------------------------
    Insert(item: T): void
    {
        this.root = this.InsertRec(item, this.root);
        this.root.parent = null;
    }

    /**
     * Recursive insert method
     * @param value Value to insert
     * @param node Current node
     */
    private InsertRec(value: T, node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T>
    {
        //Bottom reached, return new node
        if (node == null)
            return new BinarySearchTreeNode<T>(value);

        //Go to left subtree
        if (this.comparator.Compare(value, node.value) == -1)
        {
            node.left = this.InsertRec(value, node.left);
            node.Update();
        }

        //Go to right subtree
        else if (this.comparator.Compare(value, node.value) == 1)
        {
            node.right = this.InsertRec(value, node.right);
            node.Update();
        }

        //This value already exists
        return node;
    }

    Find(item: T): BinarySearchTreeIterator<T>
    {
        return new BinarySearchTreeIterator(this.FindNode(item));
    }

    /**
     * Return node by inserted value
     * @param item
     */
    private FindNode(item: T): BinarySearchTreeNode<T>
    {
        return this.FindRec(item, this.root);
    }
    /**
     * Recursive function for searching
     * @param value Value
     * @param node Current/Initial node
     */
    private FindRec(value: T, node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T>
    {
        //Bottom reached, not found, return null
        if (node == null)
            return null;
        
        //Go left
        if (this.comparator.Compare(node.value, value) == 1)
            return this.FindRec(value, node.left);

        //Go right
        else if (this.comparator.Compare(node.value, value) == -1)
            return this.FindRec(value, node.right);

        //Found the node
        return node;
    }

    RemoveAt(iterator: BinarySearchTreeIterator<T>): void
    {
        if (!iterator.HasValue())
            return;

        this.root = this.DeleteRec(iterator.Value(), this.root);
        if (this.root != null)
            this.root.parent == null;
    }
    Remove(item: T): void
    {
        this.RemoveAt(this.Find(item));
    }
    /**
     * Recursive function sor deleting
     * @param value Value to delete
     * @param node Current node/Initial node
     */
    private DeleteRec(value: T, node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T>
    {
        //At the bottom
        if (node == null)
            return null;

        //Go left
        if (this.comparator.Compare(value, node.value) == -1)
            node.left = this.DeleteRec(value, node.left);

        //Go right
        else if (this.comparator.Compare(value, node.value) == 1)
            node.right = this.DeleteRec(value, node.right);

        //Found the node
        else
        {
            //No children
            if (node.left == null && node.right == null)
                return null;

            //Child on right side
            else if (node.left == null)
                return node.right;

            //Child on left side
            else if (node.right == null)
                return node.left;

            //Two children
            let successor = this.FindMinRec(node.right);
            node.value = successor.value;
            node.right = this.DeleteRec(successor.value, node.right);
        }

        //Climbing up
        node.Update();
        return node;

    }

    UpdateAt(newValue: T, iterator: BinarySearchTreeIterator<T>): void
    {
        //No value
        if (!iterator.HasValue())
            return;

        //New value already exists
        if (this.Find(newValue).HasValue())
            return;

        //Delete current node
        this.RemoveAt(iterator);

        //Insert node with new value
        this.Insert(newValue);
    }
    Update(oldValue: T, newValue: T): void
    {
        this.UpdateAt(newValue, this.Find(oldValue));
    }

    //--------------------------------------------------
    //---------AT---------------------------------------
    //--------------------------------------------------
    At(index: number): T
    {
        return this.AtIterator(index).Value();
    }

    AtIterator(index: number): BinarySearchTreeIterator<T>
    {
        //Index out of bounds
        if (index > this.Count() - 1 || index < 0)
            return new BinarySearchTreeIterator<T>(null);

        return new BinarySearchTreeIterator<T>(this.AtRec(index, this.root));
    }

    /**
     * Recursive function for finding nth index
     * @param index Index
     * @param node Initial/Current node
     */
    private AtRec(index: number, node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T>
    {
        //Reached the end (should not occur)
        if (node == null)
            return null;

        //Found the node
        if (node.CountLeft() == index)
            return node;

        //Go left
        if (node.CountLeft() > index)
            return this.AtRec(index, node.left);

        //Go right
        else
            return this.AtRec(index - node.CountLeft() - 1, node.right);
    }

    //--------------------------------------------------
    //---------MIN-MAX----------------------------------
    //--------------------------------------------------
    FindMin(): BinarySearchTreeIterator<T>
    {
        return new BinarySearchTreeIterator<T>(this.FindMinRec(this.root));
    }
    private FindMinRec(node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T>
    {
        //Node is null
        if (node == null)
            return null;

        //We are at the most left
        if (node.left == null)
            return node;

        //Go deeper 0===3 (lil joke heh)
        return this.FindMinRec(node.left);
    }

    FindMax(): BinarySearchTreeIterator<T>
    {
        return new BinarySearchTreeIterator<T>(this.FindMaxRec(this.root));
    }
    private FindMaxRec(node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T>
    {
        //Node is null
        if (node == null)
            return null;

        //We are at the most right
        if (node.right == null)
            return node;

        //Go deeper
        return this.FindMaxRec(node.right);
    }
    
    //--------------------------------------------------
    //---------CLEARS-----------------------------------
    //--------------------------------------------------
    Dispose(): void
    {
        this.Clear();
        this.comparator.Dispose();
    }
    Clear(): void
    {
        this.root = null;
    }

    //--------------------------------------------------
    //---------ITERATOR---------------------------------
    //--------------------------------------------------
    First(): BinarySearchTreeIterator<T>
    {
        return this.FindMin();
    }
    Last(): BinarySearchTreeIterator<T>
    {
        return this.FindMax();
    }

    //--------------------------------------------------
    //---------CLONE------------------------------------
    //--------------------------------------------------
    Clone(): BinarySearchTree<T>
    {
        let res = new BinarySearchTree<T>();
        res.comparator = this.comparator.Clone();
        res.root = this.CloneRec(this.root);

        return res;
    }

    /**
     * Recursive clone function that clones nodes
     * @param node Root/Current node
     * @param parent Nodes parent node
     */
    private CloneRec(node: BinarySearchTreeNode<T>, parent: BinarySearchTreeNode<T> = null): BinarySearchTreeNode<T>
    {
        if (node == null)
            return null;

        let res = node.Clone();
        res.left = this.CloneRec(res.left, res);
        res.right = this.CloneRec(res.right, res);
        res.parent = parent;

        return res;
    }

    //--------------------------------------------------
    //---------OTHERS-----------------------------------
    //--------------------------------------------------
    Build(items: T[]): void
    {
        for (let i = 0; i < items.length; i++)
            this.Insert(items[i]);
    }
    Count(): number
    {
        if (this.root == null)
            return 0;
        return this.root.Count();
    }
    IsEmpty(): boolean
    {
        return this.Count() == 0;
    }
    

}