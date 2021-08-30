import { Testing } from "@drozdik.m/testing";
import { BinarySearchTree } from "../src/BinarySearchTree";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { IComparable } from "@drozdik.m/common-interfaces/IComparable";

//-----START TESTING-----
let testing = new Testing("Binary search tree");
testing.StartTestingLog();


//Insert
let bst1: any = new BinarySearchTree<number>();
testing.IsNull(bst1.root);
testing.IsTrue(bst1.IsEmpty());
testing.AreEqual(bst1.Count(), 0);

bst1.Insert(10);

testing.AreEqual(bst1.root.value, 10);
testing.IsNull(bst1.root.parent);
testing.IsNull(bst1.root.left);
testing.IsNull(bst1.root.right);
testing.AreEqual(bst1.root.Count(), 1);
testing.AreEqual(bst1.Count(), 1);

bst1.Insert(5);

testing.AreEqual(bst1.root.value, 10);
testing.IsNull(bst1.root.parent);
testing.IsNull(bst1.root.right);
testing.AreEqual(bst1.root.left.value, 5);
testing.IsNull(bst1.root.left.left);
testing.IsNull(bst1.root.left.right);
testing.AreEqual(bst1.root.left.parent.value, 10);
testing.AreEqual(bst1.root.Count(), 2);
testing.AreEqual(bst1.Count(), 2);
testing.AreEqual(bst1.root.left.Count(), 1);
testing.IsFalse(bst1.IsEmpty());

bst1.Insert(15);

testing.AreEqual(bst1.root.value, 10);
testing.IsNull(bst1.root.parent);
testing.AreEqual(bst1.root.left.value, 5);
testing.IsNull(bst1.root.left.left);
testing.IsNull(bst1.root.left.right);
testing.AreEqual(bst1.root.left.parent.value, 10);
testing.AreEqual(bst1.root.right.value, 15);
testing.IsNull(bst1.root.right.right);
testing.IsNull(bst1.root.right.left);
testing.AreEqual(bst1.root.right.parent.value, 10);
testing.AreEqual(bst1.root.Count(), 3);
testing.AreEqual(bst1.root.left.Count(), 1);
testing.AreEqual(bst1.root.right.Count(), 1);
testing.IsFalse(bst1.IsEmpty());
testing.AreEqual(bst1.Count(), 3);

bst1.Insert(7);

testing.AreEqual(bst1.root.value, 10);
testing.IsNull(bst1.root.parent);
testing.AreEqual(bst1.root.left.value, 5);
testing.IsNull(bst1.root.left.left);
testing.AreEqual(bst1.root.left.parent.value, 10);
testing.AreEqual(bst1.root.right.value, 15);
testing.IsNull(bst1.root.right.right);
testing.IsNull(bst1.root.right.left);
testing.AreEqual(bst1.root.right.parent.value, 10);
testing.AreEqual(bst1.root.left.right.value, 7);
testing.AreEqual(bst1.root.left.right.parent.value, 5);
testing.IsNull(bst1.root.left.right.left);
testing.IsNull(bst1.root.left.right.right);
testing.AreEqual(bst1.root.Count(), 4);
testing.AreEqual(bst1.root.left.Count(), 2);
testing.AreEqual(bst1.root.left.right.Count(), 1);
testing.AreEqual(bst1.root.right.Count(), 1);
testing.IsFalse(bst1.IsEmpty());
testing.AreEqual(bst1.Count(), 4);

for (let i = 0; i < 2; i++)
{
    bst1.Insert(3);

    testing.AreEqual(bst1.root.value, 10);
    testing.IsNull(bst1.root.parent);
    testing.AreEqual(bst1.root.left.value, 5);
    testing.AreEqual(bst1.root.left.parent.value, 10);
    testing.AreEqual(bst1.root.right.value, 15);
    testing.IsNull(bst1.root.right.right);
    testing.IsNull(bst1.root.right.left);
    testing.AreEqual(bst1.root.right.parent.value, 10);
    testing.AreEqual(bst1.root.left.right.value, 7);
    testing.AreEqual(bst1.root.left.right.parent.value, 5);
    testing.IsNull(bst1.root.left.right.left);
    testing.IsNull(bst1.root.left.right.right);
    testing.AreEqual(bst1.root.left.left.value, 3);
    testing.AreEqual(bst1.root.left.left.parent.value, 5);
    testing.IsNull(bst1.root.left.left.left);
    testing.IsNull(bst1.root.left.left.right);
    testing.AreEqual(bst1.root.Count(), 5);
    testing.AreEqual(bst1.root.left.Count(), 3);
    testing.AreEqual(bst1.root.left.right.Count(), 1);
    testing.AreEqual(bst1.root.left.left.Count(), 1);
    testing.AreEqual(bst1.root.right.Count(), 1);
    testing.IsFalse(bst1.IsEmpty());
    testing.AreEqual(bst1.Count(), 5);
}


//Find
let bst2 = new BinarySearchTree<number>();
let valuesArray = [40, 10, 20, 80, 90, 50, 60, 70, 0, 30, 15, 45, 85, 5];
for (let i = 0; i < valuesArray.length; i++)
    bst2.Insert(valuesArray[i]);
for (let i = 0; i < valuesArray.length; i++)
    testing.AreEqual(bst2.Find(valuesArray[i]).Value(), valuesArray[i]);

testing.IsFalse(bst2.Find(999).HasValue());


let bst4 = new BinarySearchTree<number>();
testing.IsFalse(bst4.FindMin().HasValue());
testing.IsFalse(bst4.FindMax().HasValue());
testing.IsFalse(bst4.Find(1).HasValue());
testing.IsFalse(bst4.First().HasValue());
testing.IsFalse(bst4.Last().HasValue());

bst4.Insert(1);
testing.AreEqual(bst4.First().Value(), 1);
testing.AreEqual(bst4.Last().Value(), 1);

//Iterator - next, prev, value, hasvalue
valuesArray = valuesArray.sort(function (a: number, b: number)
{
    return a - b;
});

let number = 0; 
for (let it = bst2.First(); it.HasValue(); it.Next())
    testing.AreEqual(it.Value(), valuesArray[number++]);
testing.AreEqual(valuesArray.length, number);

number = valuesArray.length - 1;
for (let it = bst2.Last(); it.HasValue(); it.Previous())
    testing.AreEqual(it.Value(), valuesArray[number--]);
testing.AreEqual(-1, number);


//Delete
let bst5: any = new BinarySearchTree<number>();
bst5.Remove(10);

bst5.Insert(10);
bst5.Remove(10);
testing.IsNull(bst5.root);
testing.AreEqual(bst5.Count(), 0);

bst5.Insert(10);
bst5.Insert(15);
bst5.Remove(10);
testing.AreEqual(bst5.root.value, 15);
testing.IsNull(bst5.root.left);
testing.IsNull(bst5.root.right);
testing.AreEqual(bst5.Count(), 1);

bst5.Clear();
bst5.Insert(10);
bst5.Insert(5);
bst5.Remove(10);
testing.AreEqual(bst5.root.value, 5);
testing.IsNull(bst5.root.left);
testing.IsNull(bst5.root.right);
testing.AreEqual(bst5.Count(), 1);

bst5.Clear();
bst5.Insert(10);
bst5.Insert(5);
bst5.Insert(15);
bst5.Remove(10);
testing.AreEqual(bst5.root.value, 15);
testing.AreEqual(bst5.root.left.value, 5);
testing.IsNull(bst5.root.right);
testing.IsNull(bst5.root.left.right);
testing.IsNull(bst5.root.left.left);
testing.AreEqual(bst5.Count(), 2);

bst5.Clear();
bst5.Insert(10);
bst5.Insert(5);
bst5.Insert(15);
bst5.Insert(13);
bst5.Insert(17);
bst5.Insert(20);
testing.AreEqual(bst5.Count(), 6);

bst5.Remove(15);
testing.AreEqual(bst5.root.value, 10);
testing.AreEqual(bst5.root.left.value, 5);
testing.AreEqual(bst5.root.right.value, 17);
testing.AreEqual(bst5.root.right.left.value, 13);
testing.AreEqual(bst5.root.right.right.value, 20);
testing.IsNull(bst5.root.right.left.left);
testing.IsNull(bst5.root.right.left.right);
testing.IsNull(bst5.root.right.right.left);
testing.IsNull(bst5.root.right.right.right);
testing.AreEqual(bst5.Count(), 5);

bst5.Remove(20);
testing.AreEqual(bst5.root.value, 10);
testing.AreEqual(bst5.root.left.value, 5);
testing.AreEqual(bst5.root.right.value, 17);
testing.AreEqual(bst5.root.right.left.value, 13);
testing.IsNull(bst5.root.right.right);
testing.IsNull(bst5.root.right.left.left);
testing.IsNull(bst5.root.right.left.right);
testing.AreEqual(bst5.Count(), 4);

bst5.Insert(3);
bst5.Insert(2);
bst5.Remove(5);
testing.AreEqual(bst5.root.value, 10);
testing.AreEqual(bst5.root.left.value, 3);
testing.AreEqual(bst5.root.left.left.value, 2);
testing.IsNull(bst5.root.left.left.left);
testing.AreEqual(bst5.root.right.value, 17);
testing.AreEqual(bst5.root.right.left.value, 13);
testing.IsNull(bst5.root.right.right);
testing.IsNull(bst5.root.right.left.left);
testing.IsNull(bst5.root.right.left.right);
testing.AreEqual(bst5.Count(), 5);

bst5.Remove(10);
testing.AreEqual(bst5.root.value, 13);
testing.AreEqual(bst5.root.left.value, 3);
testing.AreEqual(bst5.root.left.left.value, 2);
testing.IsNull(bst5.root.left.left.left);
testing.AreEqual(bst5.root.right.value, 17);
testing.IsNull(bst5.root.right.right);
testing.IsNull(bst5.root.right.left);
testing.AreEqual(bst5.Count(), 4);

bst5.Remove(13);
testing.AreEqual(bst5.root.value, 17);
testing.AreEqual(bst5.root.left.value, 3);
testing.AreEqual(bst5.root.left.left.value, 2);
testing.IsNull(bst5.root.left.left.left);
testing.IsNull(bst5.root.right);
testing.AreEqual(bst5.Count(), 3);

bst5.Remove(17);
testing.AreEqual(bst5.root.value, 3);
testing.AreEqual(bst5.root.left.value, 2);
testing.IsNull(bst5.root.left.lefr);
testing.IsNull(bst5.root.left.right);
testing.IsNull(bst5.root.right);
testing.AreEqual(bst5.Count(), 2);

bst5.Remove(3);
testing.AreEqual(bst5.Count(), 1);
bst5.Remove(2);
testing.IsNull(bst5.root);
testing.AreEqual(bst5.Count(), 0);

bst5.Insert(10);
bst5.Insert(11);
bst5.Insert(12);
bst5.Insert(13);
testing.AreEqual(bst5.root.value, 10);
testing.AreEqual(bst5.root.right.value, 11);
testing.AreEqual(bst5.root.right.right.value, 12);
testing.AreEqual(bst5.root.right.right.right.value, 13);
testing.AreEqual(bst5.Count(), 4);


bst5.RemoveAt(bst5.Find(11));
testing.AreEqual(bst5.root.value, 10);
testing.AreEqual(bst5.root.right.value, 12);
testing.AreEqual(bst5.root.right.right.value, 13);
testing.AreEqual(bst5.Count(), 3);

bst5.RemoveAt(bst5.Find(10));
testing.AreEqual(bst5.root.value, 12);
testing.AreEqual(bst5.root.right.value, 13);
testing.AreEqual(bst5.Count(), 2);

bst5.RemoveAt(bst5.Find(12));
testing.AreEqual(bst5.root.value, 13);
testing.AreEqual(bst5.Count(), 1);

bst5.RemoveAt(bst5.Find(13));
testing.AreEqual(bst5.Count(), 0);

testing.IsNull(bst5.root);

//Update
let bst3 = new BinarySearchTree<number>();
bst3.Update(10, 10);
valuesArray = [40, 60, 70, 0, 30, 15, 45, 85, 5, 10, 20, 80, 90, 55];
for (let i = 0; i < valuesArray.length; i++)
    bst3.Insert(valuesArray[i]);

for (let i = 0; i < valuesArray.length; i++)
    bst3.Update(valuesArray[i], 0);
for (let i = 0; i < valuesArray.length; i++)
    bst3.UpdateAt(0, bst3.Find(valuesArray[i]));

for (let i = 0; i < valuesArray.length; i++)
    bst3.Update(valuesArray[i], 85);
for (let i = 0; i < valuesArray.length; i++)
    bst3.UpdateAt(30, bst3.Find(valuesArray[i]));

valuesArray = valuesArray.sort(function (a: number, b: number)
{
    return a - b;
});
number = 0;
for (let it = bst3.First(); it.HasValue(); it.Next())
    testing.AreEqual(it.Value(), valuesArray[number++]);
testing.AreEqual(valuesArray.length, number);

for (let i = 0; i < valuesArray.length; i++)
    bst3.UpdateAt(valuesArray[i] * 10, bst3.Find(valuesArray[i]));

bst3.Update(999, 9999);
bst3.UpdateAt(9999, bst3.Find(999));

for (let i = 0; i < valuesArray.length; i++)
    bst3.Update(valuesArray[i] * 10, valuesArray[i] * 100);

number = 0;
for (let it = bst3.First(); it.HasValue(); it.Next())
    testing.AreEqual(it.Value(), valuesArray[number++] * 100);
testing.AreEqual(valuesArray.length, number);


//Clone
let bst6 = new BinarySearchTree<number>();
valuesArray = [45, 85, 5, 60, 70, 80, 90, 10, 20, 30, 15, 40, 0, 55];

for (let i = 0; i < valuesArray.length; i++)
    bst6.Insert(valuesArray[i]);

valuesArray = valuesArray.sort(function (a: number, b: number) { return a - b; });
number = 0;
for (let it = bst6.First(); it.HasValue(); it.Next())
    testing.AreEqual(it.Value(), valuesArray[number++]);
testing.AreEqual(valuesArray.length, number);

let bst7 = bst6.Clone();

for (let i = 0; i < valuesArray.length; i++)
    bst6.UpdateAt(valuesArray[i] * 10, bst6.Find(valuesArray[i]));

number = 0;
for (let it = bst7.First(); it.HasValue(); it.Next())
    testing.AreEqual(it.Value(), valuesArray[number++]);
testing.AreEqual(valuesArray.length, number);

testing.AreEqual(bst6.Count(), valuesArray.length);
testing.AreEqual(bst7.Count(), valuesArray.length);
bst6.Clear();
testing.AreEqual(bst6.Count(), 0);
testing.AreEqual(bst7.Count(), valuesArray.length);

number = 0;
for (let it = bst7.First(); it.HasValue(); it.Next())
    testing.AreEqual(it.Value(), valuesArray[number++]);
testing.AreEqual(valuesArray.length, number);



//Comparator, clone
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

let bst8 = new BinarySearchTree<FooCmp>([
    new FooCmp(0),
    new FooCmp(1),
    new FooCmp(2),
    new FooCmp(3),
    new FooCmp(4)
]);
testing.AreEqual(bst8.Find(new FooCmp(0)).Value().number, 0);
testing.AreEqual(bst8.Find(new FooCmp(1)).Value().number, 1);
testing.AreEqual(bst8.Find(new FooCmp(2)).Value().number, 2);
testing.AreEqual(bst8.Find(new FooCmp(3)).Value().number, 3);
testing.AreEqual(bst8.Find(new FooCmp(4)).Value().number, 4);

let bst9 = bst8.Clone();
testing.AreEqual(bst9.Count(), 5);
testing.AreEqual(bst9.Find(new FooCmp(0)).Value().number, 0);
testing.AreEqual(bst9.Find(new FooCmp(1)).Value().number, 1);
testing.AreEqual(bst9.Find(new FooCmp(2)).Value().number, 2);
testing.AreEqual(bst9.Find(new FooCmp(3)).Value().number, 3);
testing.AreEqual(bst9.Find(new FooCmp(4)).Value().number, 4);
bst9.Find(new FooCmp(0)).Value().number = -1;
testing.AreEqual(bst9.Find(new FooCmp(-1)).Value().number, -1);
bst9.Dispose();

testing.IsFalse(bst8.Find(new FooCmp(-1)).HasValue());
testing.AreEqual(bst8.Find(new FooCmp(0)).Value().number, 0);
testing.AreEqual(bst8.Find(new FooCmp(1)).Value().number, 1);
testing.AreEqual(bst8.Find(new FooCmp(2)).Value().number, 2);
testing.AreEqual(bst8.Find(new FooCmp(3)).Value().number, 3);
testing.AreEqual(bst8.Find(new FooCmp(4)).Value().number, 4);


//At
let bst10 = new BinarySearchTree<number>();
valuesArray = [90, 10, 20, 30, 15, 40, 80, 0, 55, 45, 85, 5, 60, 70, 120, 100, 140, 180, 135];

for (let i = 0; i < valuesArray.length; i++)
    bst10.Insert(valuesArray[i]);

valuesArray = valuesArray.sort(function (a: number, b: number) { return a - b; });

for (let i = 0; +i < valuesArray.length; i++)
    testing.AreEqual(bst10.At(i), valuesArray[i]);

for (let i = 0; +i < valuesArray.length; i++)
    testing.AreEqual(bst10.AtIterator(i).Value(), valuesArray[i]);

testing.IsFalse(bst10.AtIterator(-1).HasValue());
testing.IsFalse(bst10.AtIterator(valuesArray.length).HasValue());
testing.IsNull(bst10.At(-1));
testing.IsNull(bst10.At(valuesArray.length));

//-----END TESTING-----
testing.EndTestingLog();