import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { FibonacciTree } from "../src/FibonacciTree";
import { MinHeap, MaxHeap } from "../src/MinMaxFibonacciHeap";
import { IComparable } from "@drozdik.m/common-interfaces/IComparable";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";
import { FibonacciHeap } from "../src/FibonacciHeap";

//-----START TESTING-----
let unitTest = new UnitTest("Fibonacci Heap");

unitTest.AddTestCase("Empty heaps", function () {
    let heap1: any = new MinHeap<number>();
    let heap2: any = new MinHeap<number>();
    Assert.IsTrue(heap1.IsEmpty());
    heap1.Merge(heap2);
    Assert.IsTrue(heap1.IsEmpty());
    Assert.IsNull(heap1.Value());
    Assert.IsNull(heap1.ExtractValue());
    heap1.ChangeKey(10);
});

unitTest.AddTestCase("Basic insert, merge", function () {
    let heap1: any = new MinHeap<number>();
    let heap2: any = new MinHeap<number>();
    heap1.InsertValue(10);
    heap1.InsertValue(20);
    Assert.AreEqual(heap1.Value(), 10);
    heap2.InsertValue(30);
    heap2.InsertValue(40);
    Assert.AreEqual(heap2.Value(), 30);
    heap1.Merge(heap2);

    Assert.AreEqual(heap1.root.tree.Key(), 10);
    Assert.AreEqual(heap1.root.next.tree.Key(), 20);
    Assert.AreEqual(heap1.root.next.next.tree.Key(), 30);
    Assert.AreEqual(heap1.root.next.next.next.tree.Key(), 40);

    Assert.AreEqual(heap1.root.next.previous.tree.Key(), 10);
    Assert.AreEqual(heap1.root.next.next.previous.tree.Key(), 20);
    Assert.AreEqual(heap1.root.next.next.next.previous.tree.Key(), 30);

    Assert.AreEqual(heap1.Count(), 4);
    Assert.AreEqual(heap1.Value(), 10);

});

unitTest.AddTestCase("Basic consolidate", function () {
    let heap1: any = new MinHeap<number>();
    let heap2: any = new MinHeap<number>();
    heap1.InsertValue(10);
    heap1.InsertValue(20);
    heap2.InsertValue(30);
    heap2.InsertValue(40);
    heap1.Merge(heap2);

    heap1.Consolidate();

    Assert.AreEqual(heap1.root, heap1.min);
    Assert.AreEqual(heap1.root, heap1.last);
    Assert.IsNull(heap1.root.next);
    Assert.IsNull(heap1.root.previous);
    Assert.AreEqual(heap1.root.tree.Key(), 10);
    Assert.AreEqual(heap1.root.tree.Order(), 2);

    Assert.AreEqual(heap1.ExtractValue(), 10);

    Assert.AreEqual(heap1.root.tree.Key(), 20);
    Assert.AreEqual(heap1.root.next.tree.Key(), 30);
    Assert.AreEqual(heap1.root.next.previous.tree.Key(), 20);
    Assert.IsNull(heap1.root.previous);
    Assert.IsNull(heap1.root.next.next);

    Assert.AreEqual(heap1.ExtractValue(), 20);
    Assert.AreEqual(heap1.ExtractValue(), 30);

    Assert.AreEqual(heap1.root, heap1.min);
    Assert.AreEqual(heap1.root, heap1.last);
    Assert.IsNull(heap1.root.next);
    Assert.IsNull(heap1.root.previous);

    Assert.AreEqual(heap1.ExtractValue(), 40);

    Assert.IsNull(heap1.root);
    Assert.IsNull(heap1.min);
    Assert.IsNull(heap1.last);

    Assert.IsNull(heap1.ExtractValue());

});

unitTest.AddTestCase("Consolidate", function () {
    let heap1: any = new MinHeap<number>();
    let heap2: any = new MinHeap<number>();

    heap1.InsertValue(60);
    heap1.InsertValue(70);
    heap1.InsertValue(30);
    heap1.InsertValue(40);
    heap2.InsertValue(10);
    heap2.InsertValue(20);
    heap2.InsertValue(50);
    heap1.Merge(heap2);

    heap1.Consolidate();

    Assert.AreEqual(heap1.root.tree.Order(), 0);
    Assert.AreEqual(heap1.root.next.tree.Order(), 1);
    Assert.AreEqual(heap1.root.next.next.tree.Order(), 2);
    Assert.IsNull(heap1.root.next.next.next);
    Assert.AreEqual(heap1.root.next.previous.tree.Order(), 0);
    Assert.AreEqual(heap1.root.next.next.previous.tree.Order(), 1);
    Assert.IsNull(heap1.root.previous);

    Assert.AreEqual(heap1.ExtractValue(), 10);
    Assert.AreEqual(heap1.ExtractValue(), 20);
    Assert.AreEqual(heap1.ExtractValue(), 30);
    Assert.AreEqual(heap1.ExtractValue(), 40);
    Assert.AreEqual(heap1.ExtractValue(), 50);
    Assert.AreEqual(heap1.ExtractValue(), 60);
    Assert.AreEqual(heap1.ExtractValue(), 70);
    Assert.IsNull(heap1.ExtractValue());
});

unitTest.AddTestCase("Build, clone, consolidate", function () {
    let heap1: any = new MinHeap<number>();
    let heap2: any = new MinHeap<number>();
    heap1.Build([30, 20, 50, 40, 10, 60, 70]);
    heap2 = heap1.Clone();
    heap1.ChangeKey(100);
    heap1.ChangeKey(200);
    heap1.ChangeKey(300);
    heap1.ChangeKey(400);
    heap1.ChangeKey(500);
    heap1.ChangeKey(600);
    heap1.ChangeKey(700);
    Assert.AreEqual(heap1.ExtractValue(), 100);
    Assert.AreEqual(heap1.ExtractValue(), 200);
    Assert.AreEqual(heap1.ExtractValue(), 300);
    Assert.AreEqual(heap1.ExtractValue(), 400);
    Assert.AreEqual(heap1.ExtractValue(), 500);
    Assert.AreEqual(heap1.ExtractValue(), 600);
    Assert.AreEqual(heap1.ExtractValue(), 700);
    Assert.IsNull(heap1.ExtractValue());

    heap2.Consolidate();
    Assert.AreEqual(heap2.root.tree.Order(), 0);
    Assert.AreEqual(heap2.root.next.tree.Order(), 1);
    Assert.AreEqual(heap2.root.next.next.tree.Order(), 2);
    Assert.IsNull(heap2.root.next.next.next);
    Assert.AreEqual(heap2.root.next.previous.tree.Order(), 0);
    Assert.AreEqual(heap2.root.next.next.previous.tree.Order(), 1);
    Assert.IsNull(heap2.root.previous);
    Assert.AreEqual(heap2.ExtractValue(), 10);
    Assert.AreEqual(heap2.ExtractValue(), 20);
    Assert.AreEqual(heap2.ExtractValue(), 30);
    Assert.AreEqual(heap2.ExtractValue(), 40);
    Assert.AreEqual(heap2.ExtractValue(), 50);
    Assert.AreEqual(heap2.ExtractValue(), 60);
    Assert.AreEqual(heap2.ExtractValue(), 70);
    Assert.IsNull(heap2.ExtractValue());

});

unitTest.AddTestCase("Comparator", function () {
    
    class FooCmp implements IComparable<FooCmp>, IClonable<FooCmp>
    {
        number: number;
        constructor(n: number) {
            this.number = n;
        }
        GetComparator(): IComparator<FooCmp> {
            return function (a: FooCmp, b: FooCmp): number {
                return b.number - a.number;
            }
        }
        Clone(): FooCmp {
            return new FooCmp(this.number);
        }
    }

    let heap25 = new MinHeap<FooCmp>();
    heap25.Insert(new FooCmp(10));
    heap25.Insert(new FooCmp(20));
    heap25.Insert(new FooCmp(30));
    heap25.Insert(new FooCmp(40));
    heap25.Insert(new FooCmp(50));
    heap25.Insert(new FooCmp(60));
    heap25.Insert(new FooCmp(70));

    let heap26 = new MinHeap<FooCmp>();
    heap26.Insert(new FooCmp(5));
    heap26.Insert(new FooCmp(100));
    heap26.Insert(new FooCmp(90));

    Assert.AreEqual(heap25.ExtractMin().number, 70);

    heap26.Merge(heap25);

    Assert.AreEqual(heap26.ExtractMin().number, 100);
    Assert.AreEqual(heap26.ExtractMin().number, 90);
    Assert.AreEqual(heap26.ExtractMin().number, 60);
    Assert.AreEqual(heap26.ExtractMin().number, 50);
    Assert.AreEqual(heap26.ExtractMin().number, 40);

    let heap27: MinHeap<FooCmp> = heap26.Clone();

    Assert.AreEqual(heap26.ExtractMin().number, 30);
    Assert.AreEqual(heap26.ExtractMin().number, 20);
    Assert.AreEqual(heap26.ExtractMin().number, 10);
    Assert.AreEqual(heap26.ExtractMin().number, 5);

    Assert.AreEqual(heap27.ExtractMin().number, 30);
    Assert.AreEqual(heap27.ExtractMin().number, 20);
    Assert.AreEqual(heap27.ExtractMin().number, 10);
    Assert.AreEqual(heap27.ExtractMin().number, 5);

});

unitTest.AddTestCase("Change key", function () {
    //Change key
    let heap28 = new MinHeap<number>();
    heap28.Insert(40);
    heap28.Insert(30);
    heap28.Insert(50);
    heap28.Insert(60);
    heap28.Insert(70);
    heap28.Insert(10);
    heap28.Insert(20);

    heap28.ChangeKey(100);
    heap28.ChangeKey(200);
    heap28.ChangeKey(300);
    heap28.ChangeKey(400);
    heap28.ChangeKey(500);
    heap28.ChangeKey(600);
    heap28.ChangeKey(7);

    Assert.AreEqual(heap28.ExtractMin(), 7);
    Assert.AreEqual(heap28.ExtractMin(), 100);
    Assert.AreEqual(heap28.ExtractMin(), 200);
    Assert.AreEqual(heap28.ExtractMin(), 300);
    Assert.AreEqual(heap28.ExtractMin(), 400);
    Assert.AreEqual(heap28.ExtractMin(), 500);
    Assert.AreEqual(heap28.ExtractMin(), 600);
});

unitTest.AddTestCase("Max heap", function () {

    //Max-heap
    let heap29 = new MaxHeap<number>();
    heap29.Insert(10);
    heap29.Insert(20);
    heap29.Insert(30);
    heap29.Insert(40);
    heap29.Insert(50);
    heap29.Insert(60);
    heap29.Insert(70);

    let heap30 = new MaxHeap<number>();
    heap30.Insert(5);
    heap30.Insert(100);
    heap30.Insert(90);

    Assert.AreEqual(heap29.ExtractMax(), 70);

    heap29.Merge(heap30);

    Assert.AreEqual(heap29.ExtractMax(), 100);
    Assert.AreEqual(heap29.ExtractMax(), 90);
    Assert.AreEqual(heap29.ExtractMax(), 60);
    Assert.AreEqual(heap29.ExtractMax(), 50);
    Assert.AreEqual(heap29.ExtractMax(), 40);

    let heap31: MaxHeap<number> = heap29.Clone();

    Assert.AreEqual(heap29.ExtractMax(), 30);
    Assert.AreEqual(heap29.ExtractMax(), 20);
    Assert.AreEqual(heap29.ExtractMax(), 10);
    Assert.AreEqual(heap29.ExtractMax(), 5);

    Assert.AreEqual(heap31.ExtractMax(), 30);
    Assert.AreEqual(heap31.ExtractMax(), 20);
    Assert.AreEqual(heap31.ExtractMax(), 10);
    Assert.AreEqual(heap31.ExtractMax(), 5);


});

unitTest.AddTestCase("IClonable", function () {

    class FooCmp implements IComparable<FooCmp>, IClonable<FooCmp>
    {
        number: number;
        constructor(n: number) {
            this.number = n;
        }
        GetComparator(): IComparator<FooCmp> {
            return function (a: FooCmp, b: FooCmp): number {
                return b.number - a.number;
            }
        }
        Clone(): FooCmp {
            return new FooCmp(this.number);
        }
    }

    let heap7 = new MinHeap<FooCmp>();
    heap7.Insert(new FooCmp(5));
    let heap7Clone1: any = heap7.Clone();
    let heap7Clone2: any = heap7.Clone();
    heap7Clone1.root.tree.root.value.number = -1;
    Assert.AreEqual(heap7Clone1.Value().number, -1);
    Assert.AreEqual(heap7Clone2.Value().number, 5);

});

unitTest.AddTestCase("All in one test", function () {

    let heap3: any = new MinHeap<number>();
    let heap4: any = new MinHeap<number>();

    heap3.InsertValue(10);
    heap4.InsertValue(5);
    heap3.Merge(heap4);

    Assert.IsTrue(heap4.IsEmpty());
    Assert.AreEqual(heap3.Count(), 2);

    Assert.AreEqual(heap3.root.tree.Key(), 10);
    Assert.AreEqual(heap3.min.tree.Key(), 5);
    Assert.AreEqual(heap3.root.next.tree.Key(), 5);
    Assert.AreEqual(heap3.root.next.previous.tree.Key(), 10);
    Assert.AreEqual(heap3.last.tree.Key(), 5);

    heap4.Insert(20);
    heap4.Insert(30);
    heap4.Insert(40);
    heap4.Insert(50);
    heap4.Insert(60);
    heap4.Insert(70);
    heap4.Insert(80);
    heap3.Merge(heap4);
    Assert.AreEqual(heap3.Count(), 9);

    heap3.Consolidate();
    Assert.AreEqual(heap3.root.tree.Key(), 10);
    Assert.AreEqual(heap3.root.next.tree.Key(), 5);
    Assert.AreEqual(heap3.root.next.previous.tree.Key(), 10);
    Assert.IsNull(heap3.root.previous);
    Assert.IsNull(heap3.root.next.next);

    Assert.AreEqual(heap3.root.tree.Order(), 0);
    Assert.AreEqual(heap3.root.next.tree.Order(), 3);

    heap3.Insert(15);
    heap4.Insert(100);
    heap3.Merge(heap4);
    heap3.Consolidate();

    Assert.AreEqual(heap3.root.tree.Key(), 10);
    Assert.AreEqual(heap3.root.next.tree.Key(), 15);
    Assert.AreEqual(heap3.root.next.previous.tree.Key(), 10);
    Assert.AreEqual(heap3.root.next.next.tree.Key(), 5);
    Assert.AreEqual(heap3.root.next.next.previous.tree.Key(), 15);
    Assert.AreEqual(heap3.root.tree.Order(), 0);
    Assert.AreEqual(heap3.root.next.tree.Order(), 1);
    Assert.AreEqual(heap3.root.next.next.tree.Order(), 3);
    Assert.IsNull(heap3.root.previous);
    Assert.IsNull(heap3.root.next.next.next);
    Assert.AreEqual(heap3.last.tree.Key(), 5);

    heap4.Clear();
    heap4.Merge(heap3);

    Assert.AreEqual(heap4.root.tree.Key(), 10);
    Assert.AreEqual(heap4.root.next.tree.Key(), 15);
    Assert.AreEqual(heap4.root.next.previous.tree.Key(), 10);
    Assert.AreEqual(heap4.root.next.next.tree.Key(), 5);
    Assert.AreEqual(heap4.root.next.next.previous.tree.Key(), 15);
    Assert.AreEqual(heap4.root.tree.Order(), 0);
    Assert.AreEqual(heap4.root.next.tree.Order(), 1);
    Assert.AreEqual(heap4.root.next.next.tree.Order(), 3);
    Assert.IsNull(heap4.root.previous);
    Assert.IsNull(heap4.root.next.next.next);
    Assert.AreEqual(heap4.last.tree.Key(), 5);

    Assert.AreEqual(heap4.ExtractValue(), 5);

    Assert.AreEqual(heap4.root.tree.Key(), 15);
    Assert.AreEqual(heap4.root.tree.Order(), 1);
    Assert.AreEqual(heap4.root.next.tree.Key(), 10);
    Assert.AreEqual(heap4.root.next.tree.Order(), 3);
    Assert.AreEqual(heap4.root.next.previous.tree.Key(), 15);
    Assert.IsNull(heap4.root.previous);
    Assert.IsNull(heap4.root.next.next);
    Assert.AreEqual(heap4.last.tree.Key(), 10);

    Assert.AreEqual(heap4.ExtractValue(), 10);
    Assert.AreEqual(heap4.ExtractValue(), 15);
    Assert.AreEqual(heap4.Value(), 20);

    Assert.AreEqual(heap4.root.tree.Key(), 20);
    Assert.AreEqual(heap4.root.tree.Order(), 3);
    Assert.IsNull(heap4.root.previous);
    Assert.IsNull(heap4.root.next);
    Assert.AreEqual(heap4.last.tree.Key(), 20);

    Assert.AreEqual(heap4.ExtractValue(), 20);

    Assert.AreEqual(heap4.root.tree.Key(), 100);
    Assert.AreEqual(heap4.root.next.tree.Key(), 30);
    Assert.AreEqual(heap4.root.next.previous.tree.Key(), 100);
    Assert.AreEqual(heap4.root.next.next.tree.Key(), 50);
    Assert.AreEqual(heap4.root.next.next.previous.tree.Key(), 30);
    Assert.AreEqual(heap4.root.tree.Order(), 0);
    Assert.AreEqual(heap4.root.next.tree.Order(), 1);
    Assert.AreEqual(heap4.root.next.next.tree.Order(), 2);
    Assert.IsNull(heap4.root.previous);
    Assert.IsNull(heap4.root.next.next.next);
    Assert.AreEqual(heap4.last.tree.Key(), 50);

    Assert.AreEqual(heap4.ExtractValue(), 30);

    Assert.AreEqual(heap4.root.tree.Key(), 40);
    Assert.AreEqual(heap4.root.tree.Order(), 1);
    Assert.AreEqual(heap4.root.next.tree.Key(), 50);
    Assert.AreEqual(heap4.root.next.tree.Order(), 2);
    Assert.AreEqual(heap4.root.next.previous.tree.Key(), 40);
    Assert.IsNull(heap4.root.previous);
    Assert.IsNull(heap4.root.next.next);
    Assert.AreEqual(heap4.last.tree.Key(), 50);

    Assert.AreEqual(heap4.ExtractValue(), 40);

    Assert.AreEqual(heap4.root.tree.Key(), 100);
    Assert.AreEqual(heap4.root.tree.Order(), 0);
    Assert.AreEqual(heap4.root.next.tree.Key(), 50);
    Assert.AreEqual(heap4.root.next.tree.Order(), 2);
    Assert.AreEqual(heap4.root.next.previous.tree.Key(), 100);
    Assert.IsNull(heap4.root.previous);
    Assert.IsNull(heap4.root.next.next);
    Assert.AreEqual(heap4.last.tree.Key(), 50);

    Assert.AreEqual(heap4.ExtractValue(), 50);

    Assert.AreEqual(heap4.root.tree.Key(), 60);
    Assert.AreEqual(heap4.root.tree.Order(), 2);
    Assert.IsNull(heap4.root.previous);
    Assert.IsNull(heap4.root.next);
    Assert.AreEqual(heap4.last.tree.Key(), 60);

    Assert.AreEqual(heap4.ExtractValue(), 60);

    Assert.AreEqual(heap4.root.tree.Key(), 100);
    Assert.AreEqual(heap4.root.tree.Order(), 0);
    Assert.AreEqual(heap4.root.next.tree.Key(), 70);
    Assert.AreEqual(heap4.root.next.tree.Order(), 1);
    Assert.AreEqual(heap4.root.next.previous.tree.Key(), 100);
    Assert.IsNull(heap4.root.previous);
    Assert.IsNull(heap4.root.next.next);
    Assert.AreEqual(heap4.last.tree.Key(), 70);

    Assert.AreEqual(heap4.ExtractValue(), 70);

    Assert.AreEqual(heap4.root.tree.Key(), 80);
    Assert.AreEqual(heap4.root.tree.Order(), 1);
    Assert.IsNull(heap4.root.previous);
    Assert.IsNull(heap4.root.next);
    Assert.AreEqual(heap4.last.tree.Key(), 80);

    Assert.AreEqual(heap4.ExtractValue(), 80);

    Assert.AreEqual(heap4.root.tree.Key(), 100);
    Assert.AreEqual(heap4.root.tree.Order(), 0);
    Assert.IsNull(heap4.root.previous);
    Assert.IsNull(heap4.root.next);
    Assert.AreEqual(heap4.last.tree.Key(), 100);

    Assert.AreEqual(heap4.ExtractValue(), 100);
    Assert.IsNull(heap4.root);
    Assert.IsNull(heap4.min);
    Assert.IsNull(heap4.last);

    let heap5: any = new MinHeap<number>();
    let heap6: any = new MinHeap<number>();
    heap5.Insert(10);
    heap5.Insert(20);
    heap6.Insert(5);
    heap6.Insert(25);
    heap6.Merge(heap5);

    Assert.AreEqual(heap6.min.tree.Key(), 5);

    Assert.AreEqual(heap6.root.tree.Key(), 5);
    Assert.AreEqual(heap6.root.next.tree.Key(), 25);
    Assert.AreEqual(heap6.root.next.next.tree.Key(), 10);
    Assert.AreEqual(heap6.root.next.next.next.tree.Key(), 20);
    Assert.AreEqual(heap6.last.tree.Key(), 20);
    Assert.AreEqual(heap6.min.tree.Key(), 5);
    Assert.IsNull(heap6.root.previous);
    Assert.IsNull(heap6.root.next.next.next.next);

});

unitTest.Run();