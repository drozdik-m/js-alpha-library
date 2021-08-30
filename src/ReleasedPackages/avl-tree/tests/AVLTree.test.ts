import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { AVLTree } from "../src/AVLTree";
import { AVLTreeNode } from "../src/AVLTreeNode";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";
import { IComparable } from "@drozdik.m/common-interfaces/IComparable";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";

//-----TESTING BEGIN-----
let unitTest = new UnitTest("AVL Tree");

unitTest.AddTestCase("Rotations", function ()
{
    let tree1: any = new AVLTree<number>();
    tree1.root = new AVLTreeNode<number>(10);
    tree1.root.right = new AVLTreeNode<number>(20);
    tree1.root.right.right = new AVLTreeNode<number>(30);
    tree1.root.right.right.Update();
    tree1.root.right.Update();
    tree1.root.Update();

    Assert.AreEqual(tree1.RotateLeft(tree1.root).value, 20);
    Assert.AreEqual(tree1.root.value, 20);
    Assert.AreEqual(tree1.root.left.value, 10);
    Assert.AreEqual(tree1.root.right.value, 30);
    Assert.AreEqual(tree1.root.left.parent.value, 20);
    Assert.AreEqual(tree1.root.right.parent.value, 20);
    Assert.IsNull(tree1.root.parent);
    Assert.IsNull(tree1.root.left.left);
    Assert.IsNull(tree1.root.left.right);
    Assert.IsNull(tree1.root.right.left);
    Assert.IsNull(tree1.root.right.right);

    let tree2: any = new AVLTree<number>();
    tree2.root = new AVLTreeNode<number>(10);
    tree2.root.left = new AVLTreeNode<number>(5);
    tree2.root.right = new AVLTreeNode<number>(15);
    tree2.root.right.left = new AVLTreeNode<number>(12);
    tree2.root.right.right = new AVLTreeNode<number>(20);
    tree2.root.right.right.left = new AVLTreeNode<number>(18);
    tree2.root.right.right.right = new AVLTreeNode<number>(25);

    tree2.root.right.right.right.Update();
    tree2.root.right.right.left.Update();
    tree2.root.right.right.Update();
    tree2.root.right.left.Update();
    tree2.root.right.Update();
    tree2.root.left.Update();
    tree2.root.Update();

    Assert.AreEqual(tree2.RotateLeft(tree2.root.right).value, 20);

    Assert.AreEqual(tree2.root.value, 10);
    Assert.AreEqual(tree2.root.left.value, 5);
    Assert.AreEqual(tree2.root.right.value, 20);
    Assert.AreEqual(tree2.root.right.right.value, 25);
    Assert.AreEqual(tree2.root.right.left.value, 15);
    Assert.AreEqual(tree2.root.right.left.right.value, 18);
    Assert.AreEqual(tree2.root.right.left.left.value, 12);

    Assert.IsNull(tree2.root.parent);
    Assert.AreEqual(tree2.root.left.parent.value, 10);
    Assert.AreEqual(tree2.root.right.parent.value, 10);
    Assert.AreEqual(tree2.root.right.right.parent.value, 20);
    Assert.AreEqual(tree2.root.right.left.parent.value, 20);
    Assert.AreEqual(tree2.root.right.left.right.parent.value, 15);
    Assert.AreEqual(tree2.root.right.left.left.parent.value, 15);

    Assert.IsNull(tree2.root.left.left);
    Assert.IsNull(tree2.root.left.right);
    Assert.IsNull(tree2.root.right.right.right);
    Assert.IsNull(tree2.root.right.right.left);
    Assert.IsNull(tree2.root.right.left.left.right);
    Assert.IsNull(tree2.root.right.left.left.left);
    Assert.IsNull(tree2.root.right.left.right.right);
    Assert.IsNull(tree2.root.right.left.right.left);

    Assert.AreEqual(tree2.root.depth, 4);
    Assert.AreEqual(tree2.root.left.depth, 1);
    Assert.AreEqual(tree2.root.right.depth, 3);
    Assert.AreEqual(tree2.root.right.right.depth, 1);
    Assert.AreEqual(tree2.root.right.left.depth, 2);
    Assert.AreEqual(tree2.root.right.left.right.depth, 1);
    Assert.AreEqual(tree2.root.right.left.left.depth, 1);

    Assert.AreEqual(tree2.root.count, 7);
    Assert.AreEqual(tree2.root.left.count, 1);
    Assert.AreEqual(tree2.root.right.count, 5);
    Assert.AreEqual(tree2.root.right.right.count, 1);
    Assert.AreEqual(tree2.root.right.left.count, 3);
    Assert.AreEqual(tree2.root.right.left.right.count, 1);
    Assert.AreEqual(tree2.root.right.left.left.count, 1);

    Assert.AreEqual(tree2.RotateRight(tree2.root.right).value, 15);

    Assert.AreEqual(tree2.root.value, 10);
    Assert.AreEqual(tree2.root.left.value, 5);
    Assert.AreEqual(tree2.root.right.value, 15);
    Assert.AreEqual(tree2.root.right.left.value, 12);
    Assert.AreEqual(tree2.root.right.right.value, 20);
    Assert.AreEqual(tree2.root.right.right.left.value, 18);
    Assert.AreEqual(tree2.root.right.right.right.value, 25);

    Assert.IsNull(tree2.root.left.left);
    Assert.IsNull(tree2.root.left.right);
    Assert.IsNull(tree2.root.right.left.left);
    Assert.IsNull(tree2.root.right.left.right);
    Assert.IsNull(tree2.root.right.right.left.left);
    Assert.IsNull(tree2.root.right.right.left.right);
    Assert.IsNull(tree2.root.right.right.right.left);
    Assert.IsNull(tree2.root.right.right.right.right);

    Assert.IsNull(tree2.root.parent);
    Assert.AreEqual(tree2.root.left.parent.value, 10);
    Assert.AreEqual(tree2.root.right.parent.value, 10);
    Assert.AreEqual(tree2.root.right.left.parent.value, 15);
    Assert.AreEqual(tree2.root.right.right.parent.value, 15);
    Assert.AreEqual(tree2.root.right.right.left.parent.value, 20);
    Assert.AreEqual(tree2.root.right.right.right.parent.value, 20);

    Assert.AreEqual(tree2.root.depth, 4);
    Assert.AreEqual(tree2.root.left.depth, 1);
    Assert.AreEqual(tree2.root.right.depth, 3);
    Assert.AreEqual(tree2.root.right.left.depth, 1);
    Assert.AreEqual(tree2.root.right.right.depth, 2);
    Assert.AreEqual(tree2.root.right.right.left.depth, 1);
    Assert.AreEqual(tree2.root.right.right.right.depth, 1);

    Assert.AreEqual(tree2.root.count, 7);
    Assert.AreEqual(tree2.root.left.count, 1);
    Assert.AreEqual(tree2.root.right.count, 5);
    Assert.AreEqual(tree2.root.right.left.count, 1);
    Assert.AreEqual(tree2.root.right.right.count, 3);
    Assert.AreEqual(tree2.root.right.right.left.count, 1);
    Assert.AreEqual(tree2.root.right.right.right.count, 1);

    let tree3: any = new AVLTree<number>();
    tree3.root = new AVLTreeNode<number>(10);
    tree3.root.left = new AVLTreeNode<number>(5);
    tree3.root.left.left = new AVLTreeNode<number>(3);
    tree3.root.left.left.Update();
    tree3.root.left.Update();
    tree3.root.Update();

    Assert.AreEqual(tree3.RotateRight(tree3.root).value, 5);
    Assert.AreEqual(tree3.root.value, 5);
    Assert.AreEqual(tree3.root.left.value, 3);
    Assert.AreEqual(tree3.root.right.value, 10);
    Assert.AreEqual(tree3.root.left.parent.value, 5);
    Assert.AreEqual(tree3.root.right.parent.value, 5);

    Assert.IsNull(tree3.root.parent);
    Assert.IsNull(tree3.root.left.left);
    Assert.IsNull(tree3.root.left.right);
    Assert.IsNull(tree3.root.right.left);
    Assert.IsNull(tree3.root.right.right);
});

unitTest.AddTestCase("Double rotations", function ()
{
    let tree4: any = new AVLTree<number>();
    tree4.root = new AVLTreeNode<number>(10);
    tree4.root.right = new AVLTreeNode<number>(15);
    tree4.root.right.left = new AVLTreeNode<number>(12);
    tree4.root.right.left.Update();
    tree4.root.right.Update();
    tree4.root.Update();

    Assert.AreEqual(tree4.RotateRightLeft(tree4.root).value, 12);

    Assert.AreEqual(tree4.root.value, 12);
    Assert.AreEqual(tree4.root.left.value, 10);
    Assert.AreEqual(tree4.root.right.value, 15);
    Assert.AreEqual(tree4.root.left.parent.value, 12);
    Assert.AreEqual(tree4.root.right.parent.value, 12);

    Assert.IsNull(tree4.root.parent);
    Assert.IsNull(tree4.root.left.left);
    Assert.IsNull(tree4.root.left.right);
    Assert.IsNull(tree4.root.right.left);
    Assert.IsNull(tree4.root.right.right);


    let tree5: any = new AVLTree<number>();
    tree5.root = new AVLTreeNode<number>(10);
    tree5.root.left = new AVLTreeNode<number>(5);
    tree5.root.left.right = new AVLTreeNode<number>(7);
    tree5.root.left.right.Update();
    tree5.root.left.Update();
    tree5.root.Update();

    Assert.AreEqual(tree5.RotateLeftRight(tree5.root).value, 7);

    Assert.AreEqual(tree5.root.value, 7);
    Assert.AreEqual(tree5.root.left.value, 5);
    Assert.AreEqual(tree5.root.right.value, 10);
    Assert.AreEqual(tree5.root.left.parent.value, 7);
    Assert.AreEqual(tree5.root.right.parent.value, 7);

    Assert.IsNull(tree5.root.parent);
    Assert.IsNull(tree5.root.left.left);
    Assert.IsNull(tree5.root.left.right);
    Assert.IsNull(tree5.root.right.left);
    Assert.IsNull(tree5.root.right.right);
});

unitTest.AddTestCase("Insert", function ()
{
    //Insert
    let tree6: any = new AVLTree<number>();

    tree6.Insert(20);
    Assert.AreEqual(tree6.root.value, 20);
    Assert.AreEqual(tree6.Count(), 1);

    tree6.Insert(20);
    Assert.AreEqual(tree6.root.value, 20);
    Assert.IsNull(tree6.left);
    Assert.IsNull(tree6.right);
    Assert.AreEqual(tree6.Count(), 1);

    tree6.Insert(30);
    Assert.AreEqual(tree6.root.value, 20);
    Assert.AreEqual(tree6.root.right.value, 30);
    Assert.AreEqual(tree6.Count(), 2);

    tree6.Insert(40);
    Assert.AreEqual(tree6.root.value, 30);
    Assert.AreEqual(tree6.root.left.value, 20);
    Assert.AreEqual(tree6.root.right.value, 40);
    Assert.AreEqual(tree6.Count(), 3);

    tree6.Insert(50);
    Assert.AreEqual(tree6.root.value, 30);
    Assert.AreEqual(tree6.root.left.value, 20);
    Assert.AreEqual(tree6.root.right.value, 40);
    Assert.AreEqual(tree6.root.right.right.value, 50);
    Assert.AreEqual(tree6.Count(), 4);

    tree6.Insert(45);
    Assert.AreEqual(tree6.root.value, 30);
    Assert.AreEqual(tree6.root.left.value, 20);
    Assert.AreEqual(tree6.root.right.value, 45);
    Assert.AreEqual(tree6.root.right.right.value, 50);
    Assert.AreEqual(tree6.root.right.left.value, 40);
    Assert.AreEqual(tree6.Count(), 5);

    tree6.Insert(35);
    Assert.AreEqual(tree6.root.value, 40);
    Assert.AreEqual(tree6.root.left.value, 30);
    Assert.AreEqual(tree6.root.left.left.value, 20);
    Assert.AreEqual(tree6.root.left.right.value, 35);
    Assert.AreEqual(tree6.root.right.value, 45);
    Assert.AreEqual(tree6.root.right.right.value, 50);
    Assert.AreEqual(tree6.Count(), 6);

    tree6.Insert(10);
    Assert.AreEqual(tree6.root.value, 40);
    Assert.AreEqual(tree6.root.left.value, 30);
    Assert.AreEqual(tree6.root.left.left.value, 20);
    Assert.AreEqual(tree6.root.left.left.left.value, 10);
    Assert.AreEqual(tree6.root.left.right.value, 35);
    Assert.AreEqual(tree6.root.right.value, 45);
    Assert.AreEqual(tree6.root.right.right.value, 50);
    Assert.AreEqual(tree6.Count(), 7);

    tree6.Insert(0);
    Assert.AreEqual(tree6.root.value, 40);
    Assert.AreEqual(tree6.root.left.value, 30);
    Assert.AreEqual(tree6.root.left.left.value, 10);
    Assert.AreEqual(tree6.root.left.left.left.value, 0);
    Assert.AreEqual(tree6.root.left.left.right.value, 20);
    Assert.AreEqual(tree6.root.left.right.value, 35);
    Assert.AreEqual(tree6.root.right.value, 45);
    Assert.AreEqual(tree6.root.right.right.value, 50);
    Assert.AreEqual(tree6.Count(), 8);

    tree6.Insert(25);
    Assert.AreEqual(tree6.root.value, 40);
    Assert.AreEqual(tree6.root.left.value, 20);
    Assert.AreEqual(tree6.root.left.left.value, 10);
    Assert.AreEqual(tree6.root.left.left.left.value, 0);
    Assert.AreEqual(tree6.root.left.right.value, 30);
    Assert.AreEqual(tree6.root.left.right.left.value, 25);
    Assert.AreEqual(tree6.root.left.right.right.value, 35);
    Assert.AreEqual(tree6.root.right.value, 45);
    Assert.AreEqual(tree6.root.right.right.value, 50);
    Assert.AreEqual(tree6.Count(), 9);

    Assert.IsNull(tree6.root.parent);
    Assert.AreEqual(tree6.root.left.parent.value, 40);
    Assert.AreEqual(tree6.root.right.parent.value, 40);
    Assert.AreEqual(tree6.root.left.left.parent.value, 20);
    Assert.AreEqual(tree6.root.left.left.left.parent.value, 10);
    Assert.AreEqual(tree6.root.left.right.parent.value, 20);
    Assert.AreEqual(tree6.root.left.right.left.parent.value, 30);
    Assert.AreEqual(tree6.root.left.right.right.parent.value, 30);
    Assert.AreEqual(tree6.root.right.right.parent.value, 45);

    Assert.AreEqual(tree6.root.sign, -1);
    Assert.AreEqual(tree6.root.left.sign, 0);
    Assert.AreEqual(tree6.root.left.left.sign, -1);
    Assert.AreEqual(tree6.root.left.left.left.sign, 0);
    Assert.AreEqual(tree6.root.left.right.sign, 0);
    Assert.AreEqual(tree6.root.left.right.left.sign, 0);
    Assert.AreEqual(tree6.root.left.right.right.sign, 0);
    Assert.AreEqual(tree6.root.right.sign, 1);
    Assert.AreEqual(tree6.root.right.right.sign, 0);

    Assert.AreEqual(tree6.root.count, 9);
    Assert.AreEqual(tree6.root.left.count, 6);
    Assert.AreEqual(tree6.root.left.left.count, 2);
    Assert.AreEqual(tree6.root.left.left.left.count, 1);
    Assert.AreEqual(tree6.root.left.right.count, 3);
    Assert.AreEqual(tree6.root.left.right.left.count, 1);
    Assert.AreEqual(tree6.root.left.right.right.count, 1);
    Assert.AreEqual(tree6.root.right.count, 2);
    Assert.AreEqual(tree6.root.right.right.count, 1);

    Assert.AreEqual(tree6.root.depth, 4);
    Assert.AreEqual(tree6.root.left.depth, 3);
    Assert.AreEqual(tree6.root.left.left.depth, 2);
    Assert.AreEqual(tree6.root.left.left.left.depth, 1);
    Assert.AreEqual(tree6.root.left.right.depth, 2);
    Assert.AreEqual(tree6.root.left.right.left.depth, 1);
    Assert.AreEqual(tree6.root.left.right.right.depth, 1);
    Assert.AreEqual(tree6.root.right.depth, 2);
    Assert.AreEqual(tree6.root.right.right.depth, 1);

});

unitTest.AddTestCase("Find", function ()
{
    let tree11 = new AVLTree<number>();
    let valuesArray = [40, 10, 20, 80, 90, 50, 60, 70, 0, 30, 15, 45, 85, 5];
    for (let i = 0; i < valuesArray.length; i++)
        tree11.Insert(valuesArray[i]);
    for (let i = 0; i < valuesArray.length; i++)
        Assert.AreEqual(tree11.Find(valuesArray[i]).Value(), valuesArray[i]);

    Assert.IsFalse(tree11.Find(999).HasValue());

    let bst4 = new AVLTree<number>();
    Assert.IsFalse(bst4.FindMin().HasValue());
    Assert.IsFalse(bst4.FindMax().HasValue());
    Assert.IsFalse(bst4.Find(1).HasValue());
    Assert.IsFalse(bst4.First().HasValue());
    Assert.IsFalse(bst4.Last().HasValue());

    bst4.Insert(1);
    Assert.AreEqual(bst4.First().Value(), 1);
    Assert.AreEqual(bst4.Last().Value(), 1);
});

unitTest.AddTestCase("Iterator", function ()
{
    //Iterator - next, prev, value, hasvalue
    let tree11 = new AVLTree<number>();
    let valuesArray = [40, 10, 20, 80, 90, 50, 60, 70, 0, 30, 15, 45, 85, 5];
    for (let i = 0; i < valuesArray.length; i++)
        tree11.Insert(valuesArray[i]);
    valuesArray = valuesArray.sort(function (a: number, b: number) { return a - b; });

    let number = 0;
    for (let it = tree11.First(); it.HasValue(); it.Next())
        Assert.AreEqual(it.Value(), valuesArray[number++]);
    Assert.AreEqual(valuesArray.length, number);

    number = valuesArray.length - 1;
    for (let it = tree11.Last(); it.HasValue(); it.Previous())
        Assert.AreEqual(it.Value(), valuesArray[number--]);
    Assert.AreEqual(-1, number);
});

unitTest.AddTestCase("Remove", function ()
{
    let tree6Clone: any = new AVLTree<number>();
    tree6Clone.Insert(20);
    tree6Clone.Insert(20);
    tree6Clone.Insert(30);
    tree6Clone.Insert(40);
    tree6Clone.Insert(50);
    tree6Clone.Insert(45);
    tree6Clone.Insert(35);
    tree6Clone.Insert(10);
    tree6Clone.Insert(0);
    tree6Clone.Insert(25);


    tree6Clone.Remove(25);
    Assert.AreEqual(tree6Clone.root.value, 40);
    Assert.AreEqual(tree6Clone.root.left.value, 20);
    Assert.AreEqual(tree6Clone.root.left.left.value, 10);
    Assert.AreEqual(tree6Clone.root.left.left.left.value, 0);
    Assert.AreEqual(tree6Clone.root.left.right.value, 30);
    Assert.AreEqual(tree6Clone.root.left.right.right.value, 35);
    Assert.AreEqual(tree6Clone.root.right.value, 45);
    Assert.AreEqual(tree6Clone.root.right.right.value, 50);
    Assert.AreEqual(tree6Clone.Count(), 8);

    tree6Clone.Remove(30);
    Assert.AreEqual(tree6Clone.root.value, 40);
    Assert.AreEqual(tree6Clone.root.left.value, 20);
    Assert.AreEqual(tree6Clone.root.left.left.value, 10);
    Assert.AreEqual(tree6Clone.root.left.left.left.value, 0);
    Assert.AreEqual(tree6Clone.root.left.right.value, 35);
    Assert.AreEqual(tree6Clone.root.right.value, 45);
    Assert.AreEqual(tree6Clone.root.right.right.value, 50);
    Assert.AreEqual(tree6Clone.Count(), 7);

    tree6Clone.Remove(35);
    Assert.AreEqual(tree6Clone.root.value, 40);
    Assert.AreEqual(tree6Clone.root.left.value, 10);
    Assert.AreEqual(tree6Clone.root.left.left.value, 0);
    Assert.AreEqual(tree6Clone.root.left.right.value, 20);
    Assert.AreEqual(tree6Clone.root.right.value, 45);
    Assert.AreEqual(tree6Clone.root.right.right.value, 50);
    Assert.AreEqual(tree6Clone.Count(), 6);

    tree6Clone.Remove(0);
    Assert.AreEqual(tree6Clone.root.value, 40);
    Assert.AreEqual(tree6Clone.root.left.value, 10);
    Assert.AreEqual(tree6Clone.root.left.right.value, 20);
    Assert.AreEqual(tree6Clone.root.right.value, 45);
    Assert.AreEqual(tree6Clone.root.right.right.value, 50);
    Assert.AreEqual(tree6Clone.Count(), 5);

    tree6Clone.Remove(50);
    Assert.AreEqual(tree6Clone.root.value, 40);
    Assert.AreEqual(tree6Clone.root.left.value, 10);
    Assert.AreEqual(tree6Clone.root.left.right.value, 20);
    Assert.AreEqual(tree6Clone.root.right.value, 45);
    Assert.AreEqual(tree6Clone.Count(), 4);

    tree6Clone.Remove(45);
    Assert.AreEqual(tree6Clone.root.value, 20);
    Assert.AreEqual(tree6Clone.root.left.value, 10);
    Assert.AreEqual(tree6Clone.root.right.value, 40);
    Assert.AreEqual(tree6Clone.Count(), 3);

    tree6Clone.Remove(20);
    Assert.AreEqual(tree6Clone.root.value, 40);
    Assert.AreEqual(tree6Clone.root.left.value, 10);
    Assert.IsNull(tree6Clone.root.right);
    Assert.AreEqual(tree6Clone.Count(), 2);

    tree6Clone.Remove(20);
    Assert.AreEqual(tree6Clone.root.value, 40);
    Assert.AreEqual(tree6Clone.root.left.value, 10);
    Assert.IsNull(tree6Clone.root.right);
    Assert.AreEqual(tree6Clone.Count(), 2);

    tree6Clone.Remove(999);
    tree6Clone.RemoveAt(tree6Clone.Find(999));
    Assert.AreEqual(tree6Clone.root.value, 40);
    Assert.AreEqual(tree6Clone.root.left.value, 10);
    Assert.IsNull(tree6Clone.root.right);
    Assert.AreEqual(tree6Clone.Count(), 2);

    tree6Clone.RemoveAt(tree6Clone.Find(40));
    Assert.AreEqual(tree6Clone.root.value, 10);
    Assert.IsNull(tree6Clone.root.right);
    Assert.IsNull(tree6Clone.root.left);
    Assert.AreEqual(tree6Clone.Count(), 1);

    tree6Clone.Remove(10);
    Assert.IsNull(tree6Clone.root);
    Assert.AreEqual(tree6Clone.Count(), 0);

    tree6Clone.Insert(20);
    tree6Clone.Insert(30);
    tree6Clone.Insert(10);
    tree6Clone.Insert(40);
    tree6Clone.RemoveAt(tree6Clone.Find(10));
    Assert.AreEqual(tree6Clone.root.value, 30);
    Assert.AreEqual(tree6Clone.root.left.value, 20);
    Assert.AreEqual(tree6Clone.root.right.value, 40);

    tree6Clone.Insert(35);
    tree6Clone.RemoveAt(tree6Clone.Find(20));
    Assert.AreEqual(tree6Clone.root.value, 35);
    Assert.AreEqual(tree6Clone.root.left.value, 30);
    Assert.AreEqual(tree6Clone.root.right.value, 40);


});

unitTest.AddTestCase("Clone", function ()
{
    let tree7 = new AVLTree<number>();
    let valuesArray = [45, 85, 5, 60, 70, 80, 90, 10, 20, 30, 15, 40, 0, 55];

    for (let i = 0; i < valuesArray.length; i++)
        tree7.Insert(valuesArray[i]);

    valuesArray = valuesArray.sort(function (a: number, b: number) { return a - b; });
    let number = 0;
    for (let it = tree7.First(); it.HasValue(); it.Next())
        Assert.AreEqual(it.Value(), valuesArray[number++]);
    Assert.AreEqual(valuesArray.length, number);

    let tree8 = tree7.Clone();

    for (let i = 0; i < valuesArray.length; i++)
        tree7.UpdateAt(valuesArray[i] * 10, tree7.Find(valuesArray[i]));

    number = 0;
    for (let it = tree8.First(); it.HasValue(); it.Next())
        Assert.AreEqual(it.Value(), valuesArray[number++]);
    Assert.AreEqual(valuesArray.length, number);

    Assert.AreEqual(tree7.Count(), valuesArray.length);
    Assert.AreEqual(tree8.Count(), valuesArray.length);
    tree7.Clear();
    Assert.AreEqual(tree7.Count(), 0);
    Assert.AreEqual(tree8.Count(), valuesArray.length);

    number = 0;
    for (let it = tree8.First(); it.HasValue(); it.Next())
        Assert.AreEqual(it.Value(), valuesArray[number++]);
    Assert.AreEqual(valuesArray.length, number);
});

unitTest.AddTestCase("Comparator, Clone", function ()
{
    class FooCmp implements IComparable<FooCmp>, IClonable<FooCmp>
    {
        number: number;
        constructor(n: number)
        {
            this.number = n;
        }

        GetComparator(): IComparator<FooCmp>
        {
            return function (a: FooCmp, b: FooCmp): number
            {
                return a.number - b.number;
            }
        }

        Clone(): FooCmp
        {
            return new FooCmp(this.number);
        }
    }

    let tree9 = new AVLTree<FooCmp>([
        new FooCmp(0),
        new FooCmp(1),
        new FooCmp(2),
        new FooCmp(3),
        new FooCmp(4)
    ]);
    Assert.AreEqual(tree9.Find(new FooCmp(0)).Value().number, 0);
    Assert.AreEqual(tree9.Find(new FooCmp(1)).Value().number, 1);
    Assert.AreEqual(tree9.Find(new FooCmp(2)).Value().number, 2);
    Assert.AreEqual(tree9.Find(new FooCmp(3)).Value().number, 3);
    Assert.AreEqual(tree9.Find(new FooCmp(4)).Value().number, 4);

    let tree10 = tree9.Clone();
    Assert.AreEqual(tree10.Count(), 5);
    Assert.AreEqual(tree10.Find(new FooCmp(0)).Value().number, 0);
    Assert.AreEqual(tree10.Find(new FooCmp(1)).Value().number, 1);
    Assert.AreEqual(tree10.Find(new FooCmp(2)).Value().number, 2);
    Assert.AreEqual(tree10.Find(new FooCmp(3)).Value().number, 3);
    Assert.AreEqual(tree10.Find(new FooCmp(4)).Value().number, 4);
    tree10.Find(new FooCmp(0)).Value().number = -1;
    Assert.AreEqual(tree10.Find(new FooCmp(-1)).Value().number, -1);
    tree10.Dispose();

    Assert.IsFalse(tree9.Find(new FooCmp(-1)).HasValue());
    Assert.AreEqual(tree9.Find(new FooCmp(0)).Value().number, 0);
    Assert.AreEqual(tree9.Find(new FooCmp(1)).Value().number, 1);
    Assert.AreEqual(tree9.Find(new FooCmp(2)).Value().number, 2);
    Assert.AreEqual(tree9.Find(new FooCmp(3)).Value().number, 3);
    Assert.AreEqual(tree9.Find(new FooCmp(4)).Value().number, 4);
});

unitTest.AddTestCase("Update", function ()
{
    let tree12 = new AVLTree<number>();
    tree12.Update(10, 10);
    let valuesArray = [40, 60, 70, 0, 30, 15, 45, 85, 5, 10, 20, 80, 90, 55];
    tree12.Build(valuesArray);

    for (let i = 0; i < valuesArray.length; i++)
        tree12.Update(valuesArray[i], 0);
    for (let i = 0; i < valuesArray.length; i++)
        tree12.UpdateAt(0, tree12.Find(valuesArray[i]));

    for (let i = 0; i < valuesArray.length; i++)
        tree12.Update(valuesArray[i], 85);
    for (let i = 0; i < valuesArray.length; i++)
        tree12.UpdateAt(30, tree12.Find(valuesArray[i]));

    valuesArray = valuesArray.sort(function (a: number, b: number) { return a - b; });
    let number = 0;
    for (let it = tree12.First(); it.HasValue(); it.Next())
        Assert.AreEqual(it.Value(), valuesArray[number++]);
    Assert.AreEqual(valuesArray.length, number);

    for (let i = 0; i < valuesArray.length; i++)
        tree12.UpdateAt(valuesArray[i] * 10, tree12.Find(valuesArray[i]));

    tree12.Update(999, 9999);
    tree12.UpdateAt(9999, tree12.Find(999));

    for (let i = 0; i < valuesArray.length; i++)
        tree12.Update(valuesArray[i] * 10, valuesArray[i] * 100);

    number = 0;
    for (let it = tree12.First(); it.HasValue(); it.Next())
        Assert.AreEqual(it.Value(), valuesArray[number++] * 100);
    Assert.AreEqual(valuesArray.length, number);

});

unitTest.AddTestCase("At", function ()
{
    let tree13 = new AVLTree<number>();
    let valuesArray = [90, 10, 20, 30, 15, 40, 80, 0, 55, 45, 85, 5, 60, 70, 120, 100, 140, 180, 135];

    tree13.Build(valuesArray);

    valuesArray = valuesArray.sort(function (a: number, b: number) { return a - b; });

    for (let i = 0; +i < valuesArray.length; i++)
        Assert.AreEqual(tree13.At(i), valuesArray[i]);

    for (let i = 0; +i < valuesArray.length; i++)
        Assert.AreEqual(tree13.AtIterator(i).Value(), valuesArray[i]);

    Assert.IsFalse(tree13.AtIterator(-1).HasValue());
    Assert.IsFalse(tree13.AtIterator(valuesArray.length).HasValue());
    Assert.IsNull(tree13.At(-1));
    Assert.IsNull(tree13.At(valuesArray.length));
});

unitTest.Run();