import { MinHeap, MaxHeap } from "../src/MinMaxBinaryHeap";
import { Testing } from "@drozdik.m/testing";
import { IComparable } from "@drozdik.m/common-interfaces/IComparable";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";

//-----TESTING BEGIN-----
let testing = new Testing("Binary heap");
testing.StartTestingLog();

//-----DIRECTIONS-----
let heap1: any = new MinHeap<number>(); 
heap1.heapArray = [50];

testing.AreEqual(heap1.Parent(0), null);
testing.AreEqual(heap1.LeftSon(0), null);
testing.AreEqual(heap1.RightSon(0), null);
testing.AreEqual(heap1.IsLeftChild(0), false);
testing.AreEqual(heap1.IsRightChild(0), false);

heap1.heapArray = [50, 30, 30, 10, 11, 20];

testing.AreEqual(heap1.Parent(0), null);
testing.AreEqual(heap1.LeftSon(0), 1);
testing.AreEqual(heap1.RightSon(0), 2);
testing.AreEqual(heap1.IsLeftChild(0), false);
testing.AreEqual(heap1.IsRightChild(0), false);

testing.AreEqual(heap1.Parent(1), 0);
testing.AreEqual(heap1.Parent(2), 0);
testing.AreEqual(heap1.Parent(3), 1);
testing.AreEqual(heap1.Parent(4), 1);
testing.AreEqual(heap1.Parent(5), 2);

testing.AreEqual(heap1.LeftSon(0), 1);
testing.AreEqual(heap1.LeftSon(1), 3);
testing.AreEqual(heap1.LeftSon(2), 5);
testing.AreEqual(heap1.LeftSon(5), null);

testing.AreEqual(heap1.RightSon(0), 2);
testing.AreEqual(heap1.RightSon(1), 4);
testing.AreEqual(heap1.RightSon(2), null);
testing.AreEqual(heap1.RightSon(3), null);
testing.AreEqual(heap1.RightSon(4), null);

testing.AreEqual(heap1.IsLeftChild(0), false);
testing.AreEqual(heap1.IsRightChild(0), false);
testing.AreEqual(heap1.IsLeftChild(1), true);
testing.AreEqual(heap1.IsRightChild(1), false);
testing.AreEqual(heap1.IsLeftChild(2), false);
testing.AreEqual(heap1.IsRightChild(2), true);

//-----BUBBLE UP-----
heap1.BubbleUp(5);
let expectedArray = [20, 30, 50, 10, 11, 30];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

heap1.BubbleUp(0);
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

heap1.BubbleUp(3);
expectedArray = [10, 20, 50, 30, 11, 30];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

heap1.BubbleUp(5);
expectedArray = [10, 20, 30, 30, 11, 50];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

heap1.BubbleUp(4);
expectedArray = [10, 11, 30, 30, 20, 50];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

heap1.BubbleUp(3);
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

heap1.BubbleUp(1);
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

//-----BUBBLE DOWN-----
heap1.heapArray = [50, 30, 30, 10, 11, 20];

heap1.BubbleDown(3);
expectedArray = [50, 30, 30, 10, 11, 20];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

heap1.BubbleDown(2);
expectedArray = [50, 30, 20, 10, 11, 30];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

heap1.BubbleDown(1);
expectedArray = [50, 10, 20, 30, 11, 30];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

heap1.BubbleDown(1);
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

heap1.BubbleDown(0);
expectedArray = [10, 11, 20, 30, 50, 30];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

heap1.BubbleDown(3);
heap1.BubbleDown(4);
heap1.BubbleDown(5);
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

//-----INSERT-----
heap1.heapArray = [10, 11, 20, 30, 50, 30];

heap1.Insert(35);
expectedArray = [10, 11, 20, 30, 50, 30, 35];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

heap1.Insert(5);
expectedArray = [5, 10, 20, 11, 50, 30, 35, 30];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

heap1.Insert(10);
expectedArray = [5, 10, 20, 10, 50, 30, 35, 30, 11];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

//-----DELETE AND VALUE-----
heap1.heapArray = [10, 11, 20, 30, 50, 30];

heap1.DeleteValue();
expectedArray = [11, 30, 20, 30, 50];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);
testing.AreEqual(heap1.Value(), 11);

heap1.DeleteValue();
expectedArray = [20, 30, 50, 30];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);
testing.AreEqual(heap1.Value(), 20);

heap1.DeleteValue();
expectedArray = [30, 30, 50];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);
testing.AreEqual(heap1.Value(), 30);

heap1.DeleteValue();
expectedArray = [30, 50];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);
testing.AreEqual(heap1.Value(), 30);

heap1.DeleteValue();
expectedArray = [50];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);
testing.AreEqual(heap1.Value(), 50);

heap1.DeleteValue();
expectedArray = [];
for (let i = 0; i < heap1.heapArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);
testing.IsNull(heap1.Value());

//-----EXTRACT VALUE-----
heap1.heapArray = [10, 11, 20, 30, 50, 30];

testing.AreEqual(heap1.ExtractValue(), 10);
expectedArray = [11, 30, 20, 30, 50];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

testing.AreEqual(heap1.ExtractValue(), 11);
expectedArray = [20, 30, 50, 30];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

testing.AreEqual(heap1.ExtractValue(), 20);
expectedArray = [30, 30, 50];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

testing.AreEqual(heap1.ExtractValue(), 30);
expectedArray = [30, 50];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

testing.AreEqual(heap1.ExtractValue(), 30);
expectedArray = [50];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

testing.AreEqual(heap1.ExtractValue(), 50);
expectedArray = [];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

testing.IsNull(null);
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap1.heapArray[i]);

//-----COMPARATOR-----
class ComparableClass implements IComparable<ComparableClass>, IClonable<ComparableClass>
{
    nbr: number;

    constructor(nbr: number)
    {
        this.nbr = nbr;
    }

    GetComparator(): IComparator<ComparableClass>
    {
        return function (a: ComparableClass, b: ComparableClass): number
        {
            if (a.nbr > b.nbr)
                return 1;
            if (a.nbr < b.nbr)
                return -1;
            return 0;
        }
    }

    Clone(): ComparableClass
    {
        return new ComparableClass(this.nbr);
    }
}

let heap2 = new MinHeap<ComparableClass>();
heap2.Insert(new ComparableClass(50));
heap2.Insert(new ComparableClass(20));
heap2.Insert(new ComparableClass(10));
heap2.Insert(new ComparableClass(40));
heap2.Insert(new ComparableClass(30));
heap2.Insert(new ComparableClass(5));

//Clone & Object
let heap2Clone = heap2.Clone();
(<any>heap2Clone).heapArray[0].nbr = -1;
testing.AreEqual(heap2.ExtractMin().nbr, 5);
testing.AreEqual(heap2Clone.ExtractMin().nbr, -1);


let heap3 = new MinHeap<ComparableClass>(function (a: ComparableClass, b: ComparableClass): number
{
    if (a.nbr > b.nbr)
        return -1;
    if (a.nbr < b.nbr)
        return 1;
    return 0;
});

heap3.Insert(new ComparableClass(40));
heap3.Insert(new ComparableClass(30));
heap3.Insert(new ComparableClass(5));
heap3.Insert(new ComparableClass(50));
heap3.Insert(new ComparableClass(20));
heap3.Insert(new ComparableClass(10));

testing.AreEqual(heap3.ExtractMin().nbr, 50);
testing.AreEqual(heap3.ExtractMin().nbr, 40);
testing.AreEqual(heap3.ExtractMin().nbr, 30);
testing.AreEqual(heap3.ExtractMin().nbr, 20);
testing.AreEqual(heap3.ExtractMin().nbr, 10);
testing.AreEqual(heap3.ExtractMin().nbr, 5);
testing.IsNull(heap3.ExtractMin());

//-----BUILD-----
let heap4: any = new MinHeap<number>();

for (let i = 0; i < 2; i++)
{
    heap4.Build([20, 30, 50, 10, 11, 30]);
    expectedArray = [10, 11, 30, 30, 20, 50];
    for (let i = 0; i < expectedArray.length; i++)
        testing.AreEqual(expectedArray[i], heap4.heapArray[i]);
}

heap4.Build([20, 30, 50, 10, 11, 30]);
expectedArray = [10, 11, 30, 30, 20, 50];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap4.heapArray[i]);

heap4.Build([]);
expectedArray = [];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap4.heapArray[i]);

heap4.Build([10]);
expectedArray = [10];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap4.heapArray[i]);

heap4.Build([30, 20, 10]);
expectedArray = [10, 20, 30];
for (let i = 0; i < expectedArray.length; i++)
    testing.AreEqual(expectedArray[i], heap4.heapArray[i]);

//-----CLONE, IS EMPTY, COUNT, CLEAR-----
let heap5 = new MinHeap<number>();
heap5.Build([10, 20, 30]);

let heap6 = heap5.Clone();
testing.AreEqual(heap5.ExtractMin(), 10);
testing.AreEqual(heap5.ExtractMin(), 20);
testing.AreEqual(heap5.ExtractMin(), 30);
testing.AreEqual(heap6.ExtractMin(), 10);
testing.AreEqual(heap6.ExtractMin(), 20);
testing.AreEqual(heap6.ExtractMin(), 30);
heap5.Insert(10);
testing.IsTrue(!heap5.IsEmpty());
testing.AreEqual(heap5.Count(), 1);
testing.IsTrue(heap6.IsEmpty());
testing.AreEqual(heap6.Count(), 0);

heap5.Clear();
testing.IsTrue(heap5.IsEmpty());
testing.AreEqual(heap5.Count(), 0);

//-----MERGE-----
heap5.Build([30, 10, 20]);
heap6.Build([35, 5, 25, 15]);
heap5.Merge(heap6);

testing.AreEqual(heap5.ExtractMin(), 5);
testing.AreEqual(heap5.ExtractMin(), 10);
testing.AreEqual(heap5.ExtractMin(), 15);
testing.AreEqual(heap5.ExtractMin(), 20);
testing.AreEqual(heap5.ExtractMin(), 25);
testing.AreEqual(heap5.ExtractMin(), 30);
testing.AreEqual(heap5.ExtractMin(), 35);

testing.AreEqual(heap6.ExtractMin(), 5);
testing.AreEqual(heap6.ExtractMin(), 15);
testing.AreEqual(heap6.ExtractMin(), 25);
testing.AreEqual(heap6.ExtractMin(), 35);

//-----MAX HEAP-----
let heap7 = new MaxHeap<number>();
heap7.Build([30, 50, 20, 17, -1, 100]);

testing.AreEqual(heap7.ExtractMax(), 100);
testing.AreEqual(heap7.ExtractMax(), 50);
testing.AreEqual(heap7.ExtractMax(), 30);
testing.AreEqual(heap7.ExtractMax(), 20);
testing.AreEqual(heap7.ExtractMax(), 17);
testing.AreEqual(heap7.ExtractMax(), -1);
testing.IsNull(heap7.ExtractMax());

//-----CHANGE KEY-----
let heap8 = new MaxHeap<number>();

heap8.Build([30, 50, 20, 17, -1, 100]);
heap8.ChangeKey(101);
testing.AreEqual(heap8.ExtractMax(), 101);
testing.AreEqual(heap8.ExtractMax(), 50);
testing.AreEqual(heap8.ExtractMax(), 30);
testing.AreEqual(heap8.ExtractMax(), 20);
testing.AreEqual(heap8.ExtractMax(), 17);
testing.AreEqual(heap8.ExtractMax(), -1);

heap8.Build([30, 50, 20, 17, -1, 100]);
heap8.ChangeKey(49);
testing.AreEqual(heap8.ExtractMax(), 50);
testing.AreEqual(heap8.ExtractMax(), 49);
testing.AreEqual(heap8.ExtractMax(), 30);
testing.AreEqual(heap8.ExtractMax(), 20);
testing.AreEqual(heap8.ExtractMax(), 17);
testing.AreEqual(heap8.ExtractMax(), -1);

let heap9 = new MinHeap<number>();

heap9.Build([30, 50, 20, 17, -1, 100]);
heap9.ChangeKey(-2);
testing.AreEqual(heap9.ExtractMin(), -2);
testing.AreEqual(heap9.ExtractMin(), 17);
testing.AreEqual(heap9.ExtractMin(), 20);
testing.AreEqual(heap9.ExtractMin(), 30);
testing.AreEqual(heap9.ExtractMin(), 50);
testing.AreEqual(heap9.ExtractMin(), 100);

heap9.Build([30, 50, 20, 17, -1, 100]);
heap9.ChangeKey(101);
testing.AreEqual(heap9.ExtractMin(), 17);
testing.AreEqual(heap9.ExtractMin(), 20);
testing.AreEqual(heap9.ExtractMin(), 30);
testing.AreEqual(heap9.ExtractMin(), 50);
testing.AreEqual(heap9.ExtractMin(), 100);
testing.AreEqual(heap9.ExtractMin(), 101);

//-----TESTING END-----
testing.EndTestingLog();


