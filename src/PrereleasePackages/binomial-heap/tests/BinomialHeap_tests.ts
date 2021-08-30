import { Testing } from "@drozdik.m/testing";
import { BinomialTreeNode } from "../src/BinomialTreeNode";
import { BinomialTree } from "../src//BinomialTree";
import { MinHeap, MaxHeap } from "../src/MinMaxBinomialHeap";
import { BinomialHeapTreeNode } from "../src/BinomialHeapTreeNode";
import { IComparable } from "@drozdik.m/common-interfaces/IComparable";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";

//-----TESTING START-----
let testing = new Testing("Binomial heap");
testing.StartTestingLog();

//-----BINOMIAL TREE NODE-----
let binomialTreeNode1 = new BinomialTreeNode<number>(10);
let binomialTreeNode2 = binomialTreeNode1.Clone();
binomialTreeNode2.value = 20;
testing.AreEqual(binomialTreeNode1.value, 10);
testing.AreEqual(binomialTreeNode2.value, 20);

//-----BINOMIAL TREE-----

//Simple merge
let binomialTree1: any = new BinomialTree<number>(10);
let binomialTree2 = new BinomialTree<number>(20);
testing.AreEqual(binomialTree1.Order(), 0);
binomialTree1.Merge(binomialTree2);
testing.IsNull(binomialTree2.Key());
testing.IsFalse(binomialTree2.Order() >= 0)
testing.AreEqual(binomialTree1.root.value, 10);
testing.AreEqual(binomialTree1.Key(), 10);
testing.AreEqual(binomialTree1.root.child.value, 20);
testing.AreEqual(binomialTree1.root.child.parent.value, 10);
testing.AreEqual(binomialTree1.Order(), 1);

//Merge (2) simple
let binomialTree3: any = new BinomialTree<number>(30);
binomialTree3.Merge(new BinomialTree<number>(40));
binomialTree1.Merge(binomialTree3);

testing.AreEqual(binomialTree1.Order(), 2);

testing.AreEqual(binomialTree1.root.value, 10);
testing.AreEqual(binomialTree1.Key(), 10);
testing.IsNull(binomialTree1.root.parent);
testing.IsNull(binomialTree1.root.left);
testing.AreEqual(binomialTree1.root.child.value, 30);

testing.AreEqual(binomialTree1.root.child.parent, binomialTree1.root);
testing.AreEqual(binomialTree1.root.child.left.value, 20);
testing.AreEqual(binomialTree1.root.child.child.value, 40);

testing.AreEqual(binomialTree1.root.child.left.parent, binomialTree1.root);
testing.IsNull(binomialTree1.root.child.left.left);
testing.IsNull(binomialTree1.root.child.left.child);

testing.AreEqual(binomialTree1.root.child.child.value, 40);
testing.AreEqual(binomialTree1.root.child.child.parent.value, 30);
testing.IsNull(binomialTree1.root.child.child.left);
testing.IsNull(binomialTree1.root.child.child.child);

//Merge (3) rev
let binomialTree4 = new BinomialTree<number>(5);
binomialTree4.Merge(new BinomialTree<number>(6));

let binomialTree5: any = new BinomialTree<number>(8);
binomialTree5.Merge(new BinomialTree<number>(7));

testing.AreEqual(binomialTree5.root.value, 7);
testing.AreEqual(binomialTree5.root.child.value, 8);

binomialTree4.Merge(binomialTree5);
binomialTree1.Merge(binomialTree4);

testing.AreEqual(binomialTree1.Key(), 5);
testing.AreEqual(binomialTree1.root.value, 5);
testing.AreEqual(binomialTree1.root.child.value, 10)
testing.AreEqual(binomialTree1.root.child.left.value, 7);
testing.AreEqual(binomialTree1.root.child.left.left.value, 6);
testing.AreEqual(binomialTree1.root.child.child.value, 30);
testing.AreEqual(binomialTree1.root.child.child.left.value, 20);
testing.AreEqual(binomialTree1.root.child.left.child.value, 8);
testing.AreEqual(binomialTree1.root.child.child.child.value, 40);

testing.IsNull(binomialTree1.root.parent);
testing.IsNull(binomialTree1.root.left);
testing.AreEqual(binomialTree1.root.child.parent.value, 5);
testing.AreEqual(binomialTree1.root.child.left.parent.value, 5);
testing.AreEqual(binomialTree1.root.child.left.left.parent.value, 5);
testing.AreEqual(binomialTree1.root.child.left.left.parent.value, 5);
testing.AreEqual(binomialTree1.root.child.child.parent.value, 10);
testing.AreEqual(binomialTree1.root.child.child.left.parent.value, 10);
testing.AreEqual(binomialTree1.root.child.child.child.parent.value, 30);
testing.AreEqual(binomialTree1.root.child.left.child.parent.value, 7);

testing.AreEqual(binomialTree1.Order(), 3);

//Clone
let binomialTree1Clone = binomialTree1.Clone();

binomialTree1Clone.root.value = 50;
binomialTree1Clone.root.child.value = 100;
binomialTree1Clone.root.child.left.value = 70;
binomialTree1Clone.root.child.left.left.value = 60;
binomialTree1Clone.root.child.child.value = 300;
binomialTree1Clone.root.child.child.left.value = 200;
binomialTree1Clone.root.child.left.child.value = 80;
binomialTree1Clone.root.child.child.child.value = 400;

testing.AreEqual(binomialTree1Clone.Key(), 50);
testing.AreEqual(binomialTree1Clone.root.value, 50);
testing.AreEqual(binomialTree1Clone.root.child.value, 100)
testing.AreEqual(binomialTree1Clone.root.child.left.value, 70);
testing.AreEqual(binomialTree1Clone.root.child.left.left.value, 60);
testing.AreEqual(binomialTree1Clone.root.child.child.value, 300);
testing.AreEqual(binomialTree1Clone.root.child.child.left.value, 200);
testing.AreEqual(binomialTree1Clone.root.child.left.child.value, 80);
testing.AreEqual(binomialTree1Clone.root.child.child.child.value, 400);

testing.IsNull(binomialTree1Clone.root.parent);
testing.IsNull(binomialTree1Clone.root.left);
testing.AreEqual(binomialTree1Clone.root.child.parent.value, 50);
testing.AreEqual(binomialTree1Clone.root.child.left.parent.value, 50);
testing.AreEqual(binomialTree1Clone.root.child.left.left.parent.value, 50);
testing.AreEqual(binomialTree1Clone.root.child.left.left.parent.value, 50);
testing.AreEqual(binomialTree1Clone.root.child.child.parent.value, 100);
testing.AreEqual(binomialTree1Clone.root.child.child.left.parent.value, 100);
testing.AreEqual(binomialTree1Clone.root.child.child.child.parent.value, 300);
testing.AreEqual(binomialTree1Clone.root.child.left.child.parent.value, 70);

testing.AreEqual(binomialTree1.Key(), 5);
testing.AreEqual(binomialTree1.root.value, 5);
testing.AreEqual(binomialTree1.root.child.value, 10)
testing.AreEqual(binomialTree1.root.child.left.value, 7);
testing.AreEqual(binomialTree1.root.child.left.left.value, 6);
testing.AreEqual(binomialTree1.root.child.child.value, 30);
testing.AreEqual(binomialTree1.root.child.child.left.value, 20);
testing.AreEqual(binomialTree1.root.child.left.child.value, 8);
testing.AreEqual(binomialTree1.root.child.child.child.value, 40);


//Dismantle extract
let binomialTree6 = new BinomialTree(10);
let binomialTree6Dismantle = binomialTree6.DismantleExtract();
testing.AreEqual(binomialTree6Dismantle.length, 0);

let binomialTree7 = new BinomialTree(10);
binomialTree7.Merge(new BinomialTree(20));
let binomialTree8 = new BinomialTree(30);
binomialTree8.Merge(new BinomialTree(40));
binomialTree7.Merge(binomialTree8);
let binomialTree7Clone = binomialTree7.Clone();
let binomialTree7Dismantle: any = binomialTree7.DismantleExtract();

testing.AreEqual(binomialTree7Dismantle[0].Order(), 0);
testing.AreEqual(binomialTree7Dismantle[1].Order(), 1);
testing.AreEqual(binomialTree7Dismantle[0].Key(), 20);
testing.AreEqual(binomialTree7Dismantle[1].Key(), 30);
testing.IsNull(binomialTree7Dismantle[0].root.parent);
testing.IsNull(binomialTree7Dismantle[0].root.child);
testing.IsNull(binomialTree7Dismantle[1].root.parent);
testing.IsNotNull(binomialTree7Dismantle[1].root.child);
testing.AreEqual(binomialTree7Dismantle[1].root.child.value, 40);

let binomialTree9 = new BinomialTree(50);
binomialTree9.Merge(new BinomialTree(60));
let binomialTree10 = new BinomialTree(70);
binomialTree10.Merge(new BinomialTree(80));
binomialTree10.Merge(binomialTree9);
binomialTree7Clone.Merge(binomialTree10);

let binomialTree7CloneDismantle: any = binomialTree7Clone.DismantleExtract();
testing.AreEqual(binomialTree7CloneDismantle[0].Order(), 0);
testing.AreEqual(binomialTree7CloneDismantle[1].Order(), 1);
testing.AreEqual(binomialTree7CloneDismantle[2].Order(), 2);
testing.AreEqual(binomialTree7CloneDismantle[0].Key(), 20);
testing.AreEqual(binomialTree7CloneDismantle[1].Key(), 30);
testing.AreEqual(binomialTree7CloneDismantle[2].Key(), 50);
testing.IsNull(binomialTree7CloneDismantle[0].root.parent);
testing.IsNull(binomialTree7CloneDismantle[0].root.child);
testing.IsNull(binomialTree7CloneDismantle[1].root.parent);
testing.IsNotNull(binomialTree7CloneDismantle[1].root.child);
testing.AreEqual(binomialTree7CloneDismantle[1].root.child.value, 40);
testing.IsNull(binomialTree7CloneDismantle[2].root.parent);
testing.AreEqual(binomialTree7CloneDismantle[2].root.child.value, 70);


//Change key
let binomialTree11 = new BinomialTree<number>(10);
testing.AreEqual(binomialTree11.Key(), 10);
binomialTree11.ChangeKey(11);
testing.AreEqual(binomialTree11.Key(), 11);
binomialTree11.Merge(new BinomialTree(20));
testing.AreEqual(binomialTree11.Key(), 11);
binomialTree11.ChangeKey(21);
testing.AreEqual(binomialTree11.Key(), 20);

binomialTree11.ChangeKey(10);
testing.AreEqual(binomialTree11.Key(), 10);
binomialTree11.ChangeKey(5);
testing.AreEqual(binomialTree11.Key(), 5);
binomialTree11.ChangeKey(20);
testing.AreEqual(binomialTree11.Key(), 20);

let binomialTree12 = new BinomialTree<number>(10);
binomialTree12.Merge(new BinomialTree<number>(30));
binomialTree11.Merge(binomialTree12);

testing.AreEqual(binomialTree11.Key(), 10);
binomialTree11.ChangeKey(100);
testing.AreEqual(binomialTree11.Key(), 20);

binomialTree11.ChangeKey(50);
binomialTree11.ChangeKey(40);

testing.AreEqual(binomialTree11.Key(), 30);

let binomialTree13 = new BinomialTree<number>(60);
binomialTree13.Merge(new BinomialTree<number>(70));
let binomialTree14 = new BinomialTree<number>(85);
binomialTree14.Merge(new BinomialTree<number>(80));
binomialTree14.Merge(binomialTree13);
binomialTree14.Merge(binomialTree11);

testing.AreEqual(binomialTree14.Key(), 30);
binomialTree14.ChangeKey(65);
testing.AreEqual(binomialTree14.Key(), 40);
binomialTree14.ChangeKey(70);
testing.AreEqual(binomialTree14.Key(), 50);
binomialTree14.ChangeKey(100);
testing.AreEqual(binomialTree14.Key(), 60);


//-----BINOMIAL HEAP-----

//Merge
let heap1: any = new MinHeap<number>();
heap1.Merge(new MinHeap<number>());

testing.IsNull(heap1.rootTree);
testing.AreEqual(heap1.Count(), 0);
testing.IsNull(heap1.Value());
testing.AreEqual(heap1.Count(), 0);

heap1.rootTree = new BinomialHeapTreeNode<number>(new BinomialTree<number>(10));
heap1.Merge(new MinHeap<number>());

testing.AreEqual(heap1.rootTree.tree.Key(), 10);

let heap2: any = new MinHeap<number>();
heap2.Merge(heap1);

testing.AreEqual(heap2.rootTree.tree.Key(), 10);
testing.IsNull(heap1.rootTree);
testing.AreEqual(heap2.Value(), 10);


let heap3: any = new MinHeap<number>();
heap3.rootTree = new BinomialHeapTreeNode<number>(new BinomialTree<number>(10));
let heap4: any = new MinHeap<number>();
heap4.rootTree = new BinomialHeapTreeNode<number>(new BinomialTree<number>(20));

heap3.Merge(heap4);

testing.IsNull(heap3.rootTree.next);
testing.AreEqual(heap3.rootTree.tree.Order(), 1);
testing.AreEqual(heap3.rootTree.tree.Key(), 10);
testing.AreEqual(heap3.rootTree.tree.root.child.value, 20);
testing.AreEqual(heap3.Value(), 10);


let tempTree1 = new BinomialTree<number>(10);
tempTree1.Merge(new BinomialTree<number>(20));
let heap5: any = new MinHeap<number>();
heap5.rootTree = new BinomialHeapTreeNode<number>(tempTree1);
let heap6: any = new MinHeap<number>();
heap6.rootTree = new BinomialHeapTreeNode<number>(new BinomialTree<number>(30));

heap5.Merge(heap6);

testing.AreEqual(heap5.rootTree.tree.Order(), 0);
testing.AreEqual(heap5.rootTree.next.tree.Order(), 1);
testing.AreEqual(heap5.rootTree.tree.Key(), 30);
testing.AreEqual(heap5.rootTree.next.tree.Key(), 10);
testing.AreEqual(heap5.Value(), 10);


//Merge + Insert
let heap7: any = new MinHeap<number>();

heap7.Insert(10); //1
testing.AreEqual(heap7.rootTree.tree.Key(), 10);
testing.AreEqual(heap7.Value(), 10);
testing.AreEqual(heap7.Count(), 1);

heap7.Insert(20); //10
testing.AreEqual(heap7.rootTree.tree.Key(), 10);
testing.AreEqual(heap7.rootTree.tree.root.child.value, 20);
testing.AreEqual(heap7.Value(), 10);
testing.AreEqual(heap7.Count(), 2);

heap7.Insert(30); //11
testing.AreEqual(heap7.rootTree.tree.Key(), 30);
testing.AreEqual(heap7.rootTree.next.tree.Key(), 10);
testing.AreEqual(heap7.rootTree.next.tree.root.child.value, 20);
testing.AreEqual(heap7.Value(), 10);
testing.AreEqual(heap7.Count(), 3);

heap7.Insert(40); //100
testing.AreEqual(heap7.rootTree.tree.Key(), 10);
testing.AreEqual(heap7.rootTree.tree.Order(), 2);
testing.AreEqual(heap7.rootTree.tree.root.child.value, 30);
testing.AreEqual(heap7.rootTree.tree.root.child.left.value, 20);
testing.AreEqual(heap7.rootTree.tree.root.child.child.value, 40);
testing.IsNull(heap7.rootTree.next);
testing.AreEqual(heap7.Value(), 10);
testing.AreEqual(heap7.Count(), 4);

heap7.Insert(50); //101
testing.AreEqual(heap7.rootTree.tree.Key(), 50);
testing.AreEqual(heap7.rootTree.tree.Order(), 0);
testing.IsNotNull(heap7.rootTree.next);
testing.AreEqual(heap7.rootTree.next.tree.Key(), 10);
testing.AreEqual(heap7.rootTree.next.tree.Order(), 2);
testing.AreEqual(heap7.Value(), 10);
testing.AreEqual(heap7.Count(), 5);

heap7.Insert(60); //110
testing.AreEqual(heap7.rootTree.tree.Key(), 50);
testing.AreEqual(heap7.rootTree.tree.Order(), 1);
testing.IsNotNull(heap7.rootTree.next);
testing.AreEqual(heap7.rootTree.next.tree.Key(), 10);
testing.AreEqual(heap7.rootTree.next.tree.Order(), 2);
testing.AreEqual(heap7.Value(), 10);
testing.AreEqual(heap7.Count(), 6);

heap7.Insert(70); //111
testing.AreEqual(heap7.rootTree.tree.Key(), 70);
testing.AreEqual(heap7.rootTree.tree.Order(), 0);
testing.AreEqual(heap7.rootTree.next.tree.Key(), 50);
testing.AreEqual(heap7.rootTree.next.tree.Order(), 1);
testing.AreEqual(heap7.rootTree.next.next.tree.Key(), 10);
testing.AreEqual(heap7.rootTree.next.next.tree.Order(), 2);
testing.AreEqual(heap7.Value(), 10);
testing.AreEqual(heap7.Count(), 7);

heap7.Insert(80); //1000
testing.AreEqual(heap7.rootTree.tree.Key(), 10);
testing.AreEqual(heap7.rootTree.tree.Order(), 3);
testing.AreEqual(heap7.Value(), 10);
testing.AreEqual(heap7.Count(), 8);

heap7.Insert(90); //1001
testing.AreEqual(heap7.rootTree.tree.Key(), 90);
testing.AreEqual(heap7.rootTree.tree.Order(), 0);
testing.AreEqual(heap7.rootTree.next.tree.Key(), 10);
testing.AreEqual(heap7.rootTree.next.tree.Order(), 3);
testing.AreEqual(heap7.Value(), 10);
testing.AreEqual(heap7.Count(), 9);

heap7.Insert(100); //1010
testing.AreEqual(heap7.rootTree.tree.Key(), 90);
testing.AreEqual(heap7.rootTree.tree.Order(), 1);
testing.AreEqual(heap7.rootTree.next.tree.Key(), 10);
testing.AreEqual(heap7.rootTree.next.tree.Order(), 3);
testing.AreEqual(heap7.Value(), 10);
testing.AreEqual(heap7.Count(), 10);

heap7.Insert(110); //1011
testing.AreEqual(heap7.rootTree.tree.Key(), 110);
testing.AreEqual(heap7.rootTree.tree.Order(), 0);
testing.AreEqual(heap7.rootTree.next.tree.Key(), 90);
testing.AreEqual(heap7.rootTree.next.tree.Order(), 1);
testing.AreEqual(heap7.rootTree.next.next.tree.Key(), 10);
testing.AreEqual(heap7.rootTree.next.next.tree.Order(), 3);
testing.AreEqual(heap7.Value(), 10);
testing.AreEqual(heap7.Count(), 11);

heap7.Insert(120); //1100
testing.AreEqual(heap7.rootTree.tree.Key(), 90);
testing.AreEqual(heap7.rootTree.tree.Order(), 2);
testing.AreEqual(heap7.rootTree.next.tree.Key(), 10);
testing.AreEqual(heap7.rootTree.next.tree.Order(), 3);
testing.AreEqual(heap7.Value(), 10);
testing.AreEqual(heap7.Count(), 12);

heap7.Insert(130); //1101
testing.AreEqual(heap7.rootTree.tree.Key(), 130);
testing.AreEqual(heap7.rootTree.tree.Order(), 0);
testing.AreEqual(heap7.rootTree.next.tree.Key(), 90);
testing.AreEqual(heap7.rootTree.next.tree.Order(), 2);
testing.AreEqual(heap7.rootTree.next.next.tree.Key(), 10);
testing.AreEqual(heap7.rootTree.next.next.tree.Order(), 3);
testing.AreEqual(heap7.Value(), 10);
testing.AreEqual(heap7.Count(), 13);

heap7.Insert(140); //1110
testing.AreEqual(heap7.rootTree.tree.Key(), 130);
testing.AreEqual(heap7.rootTree.tree.Order(), 1);
testing.AreEqual(heap7.rootTree.next.tree.Key(), 90);
testing.AreEqual(heap7.rootTree.next.tree.Order(), 2);
testing.AreEqual(heap7.rootTree.next.next.tree.Key(), 10);
testing.AreEqual(heap7.rootTree.next.next.tree.Order(), 3);
testing.AreEqual(heap7.Value(), 10);
testing.AreEqual(heap7.Count(), 14);

heap7.Insert(5);   //1111
testing.AreEqual(heap7.rootTree.tree.Key(), 5);
testing.AreEqual(heap7.rootTree.tree.Order(), 0);
testing.AreEqual(heap7.rootTree.next.tree.Key(), 130);
testing.AreEqual(heap7.rootTree.next.tree.Order(), 1);
testing.AreEqual(heap7.rootTree.next.next.tree.Key(), 90);
testing.AreEqual(heap7.rootTree.next.next.tree.Order(), 2);
testing.AreEqual(heap7.rootTree.next.next.next.tree.Key(), 10);
testing.AreEqual(heap7.rootTree.next.next.next.tree.Order(), 3);
testing.AreEqual(heap7.Value(), 5);
testing.AreEqual(heap7.Count(), 15);

heap7.Insert(150); //10000
testing.AreEqual(heap7.rootTree.tree.Key(), 5);
testing.AreEqual(heap7.rootTree.tree.Order(), 4);
testing.AreEqual(heap7.Value(), 5);
testing.AreEqual(heap7.Count(), 16);

//Merge big heaps
let heap8: any = new MinHeap<number>();
let heap9: any = new MinHeap<number>();
for (let i = 0; i < 45; i++)
    heap8.Insert(i);
for (let i = 0; i < 30; i++)
    heap9.Insert(i);
heap8.Merge(heap9); //1001011
testing.AreEqual(heap8.rootTree.tree.Order(), 0);
testing.AreEqual(heap8.rootTree.next.tree.Order(), 1);
testing.AreEqual(heap8.rootTree.next.next.tree.Order(), 3);
testing.AreEqual(heap8.rootTree.next.next.next.tree.Order(), 6);
testing.IsNull(heap8.rootTree.next.next.next.next);
testing.AreEqual(heap8.Value(), 0);
testing.AreEqual(heap8.Count(), 75);


let heap10: any = new MinHeap<number>();
let heap11: any = new MinHeap<number>();
for (let i = 0; i < 43; i++)
    heap10.Insert(i);
for (let i = 0; i < 5; i++)
    heap11.Insert(i);
heap10.Merge(heap11); //110000
testing.AreEqual(heap10.rootTree.tree.Order(), 4);
testing.AreEqual(heap10.rootTree.next.tree.Order(), 5);
testing.IsNull(heap10.rootTree.next.next);
testing.AreEqual(heap10.Value(), 0);
testing.AreEqual(heap10.Count(), 48);

let heap12: any = new MinHeap<number>();
let heap13: any = new MinHeap<number>();
for (let i = 0; i < 45; i++)
    heap12.Insert(i);
for (let i = 0; i < 30; i++)
    heap13.Insert(i);
heap13.Merge(heap12); //1001011
testing.AreEqual(heap13.rootTree.tree.Order(), 0);
testing.AreEqual(heap13.rootTree.next.tree.Order(), 1);
testing.AreEqual(heap13.rootTree.next.next.tree.Order(), 3);
testing.AreEqual(heap13.rootTree.next.next.next.tree.Order(), 6);
testing.IsNull(heap13.rootTree.next.next.next.next);
testing.AreEqual(heap13.Value(), 0);
testing.AreEqual(heap13.Count(), 75);

let heap14: any = new MinHeap<number>();
let heap15: any = new MinHeap<number>();
for (let i = 0; i < 43; i++)
    heap14.Insert(i);
for (let i = 0; i < 5; i++)
    heap15.Insert(i);
heap15.Merge(heap14); //110000
testing.AreEqual(heap15.rootTree.tree.Order(), 4);
testing.AreEqual(heap15.rootTree.next.tree.Order(), 5);
testing.IsNull(heap15.rootTree.next.next);
testing.AreEqual(heap15.Value(), 0);
testing.AreEqual(heap15.Count(), 48);

//Delete
let heap16: any = new MinHeap<number>();
testing.AreEqual(heap16.Count(), 0);
heap16.Insert(10);
testing.AreEqual(heap16.Count(), 1);
heap16.DeleteValue()
testing.IsTrue(heap16.IsEmpty());
testing.IsNull(heap16.rooTree);
testing.IsNull(heap16.Value());
testing.AreEqual(heap16.Count(), 0);

let heap17: any = new MinHeap<number>();
heap17.Insert(10);
heap17.Insert(20);
heap17.Insert(30); 
testing.AreEqual(heap17.Count(), 3);
testing.AreEqual(heap17.Value(), 10);
heap17.DeleteValue();
testing.AreEqual(heap17.Count(), 2);
testing.AreEqual(heap17.Value(), 20);
heap17.DeleteValue();
testing.AreEqual(heap17.Count(), 1);
testing.AreEqual(heap17.Value(), 30);
heap17.DeleteValue();
testing.AreEqual(heap17.Count(), 0);
testing.IsNull(heap17.Value());
heap17.DeleteValue();
testing.AreEqual(heap17.Count(), 0);
testing.IsNull(heap17.Value());

let heap18: any = new MinHeap<number>();
for (let j = 0; j < 2; j++)
{
    for (let i = 0; i < 50; i++)
        heap18.Insert(i);
    for (let i = 49; i >= 0; i--)
        heap18.Insert(i);
}
testing.AreEqual(heap18.Count(), 200);

for (let i = 0; i <= 49; i++)
{
    for (let j = 0; j < 4; j++)
    {
        testing.AreEqual(heap18.Value(), i);
        heap18.DeleteValue();
    }
}
testing.IsTrue(heap18.IsEmpty());
testing.AreEqual(heap18.Count(), 0);


let heap19: any = new MinHeap<number>();
heap19.Insert(30);
heap19.Insert(40);
heap19.Insert(50);
heap19.Insert(60);
heap19.Insert(70);
heap19.Insert(80);
heap19.Insert(35);
testing.AreEqual(heap19.Count(), 7);

heap19.DeleteValue();

testing.AreEqual(heap19.Count(), 6);
testing.AreEqual(heap19.rootTree.tree.Key(), 35);
testing.AreEqual(heap19.rootTree.tree.Order(), 1);
testing.AreEqual(heap19.rootTree.next.tree.Key(), 50);
testing.AreEqual(heap19.rootTree.next.tree.Order(), 2);

heap19.DeleteValue();

testing.AreEqual(heap19.Count(), 5);
testing.AreEqual(heap19.rootTree.tree.Key(), 40);
testing.AreEqual(heap19.rootTree.tree.Order(), 0);
testing.AreEqual(heap19.rootTree.next.tree.Key(), 50);
testing.AreEqual(heap19.rootTree.next.tree.Order(), 2);

heap19.DeleteValue();

testing.AreEqual(heap19.Count(), 4);
testing.AreEqual(heap19.rootTree.tree.Key(), 50);
testing.AreEqual(heap19.rootTree.tree.Order(), 2);

heap19.DeleteValue();

testing.AreEqual(heap19.Count(), 3);
testing.AreEqual(heap19.rootTree.tree.Key(), 60);
testing.AreEqual(heap19.rootTree.tree.Order(), 0);
testing.AreEqual(heap19.rootTree.next.tree.Key(), 70);
testing.AreEqual(heap19.rootTree.next.tree.Order(), 1);

heap19.DeleteValue();

testing.AreEqual(heap19.Count(), 2);
testing.AreEqual(heap19.rootTree.tree.Key(), 70);
testing.AreEqual(heap19.rootTree.tree.Order(), 1);

heap19.DeleteValue();

testing.AreEqual(heap19.Count(), 1);
testing.AreEqual(heap19.rootTree.tree.Key(), 80);
testing.AreEqual(heap19.rootTree.tree.Order(), 0);

heap19.DeleteValue();
testing.AreEqual(heap19.Count(), 0);
testing.IsNull(heap19.rootTree);
heap19.DeleteValue();
testing.AreEqual(heap19.Count(), 0);
testing.IsNull(heap19.rootTree);
heap19.DeleteValue();
testing.AreEqual(heap19.Count(), 0);
testing.IsNull(heap19.rootTree);



heap19.Insert(30);
heap19.Insert(40);
heap19.Insert(50);
heap19.Insert(60);
heap19.Insert(29);
heap19.Insert(80);
heap19.Insert(35);
testing.AreEqual(heap19.Count(), 7);
heap19.DeleteValue();
testing.AreEqual(heap19.Count(), 6);
testing.AreEqual(heap19.rootTree.tree.Key(), 35);
testing.AreEqual(heap19.rootTree.tree.Order(), 1);
testing.AreEqual(heap19.rootTree.next.tree.Key(), 30);
testing.AreEqual(heap19.rootTree.next.tree.Order(), 2);


let heap20: any = new MinHeap<number>();
for (let j = 0; j < 2; j++)
{
    for (let i = 49; i >= 0; i--)
        heap20.Insert(i);
    for (let i = 0; i < 50; i++)
        heap20.Insert(i);
}

for (let i = 0; i <= 49; i++)
{
    for (let j = 0; j < 4; j++)
    {
        testing.AreEqual(heap20.ExtractValue(), i);
    }
}
testing.IsTrue(heap20.IsEmpty());


//Clone
let heap21: any = new MinHeap<number>();

heap21.Insert(10);
heap21.Insert(20);
heap21.Insert(30);

let heap22: any = heap21.Clone();

heap22.rootTree.tree.root.value = 300;
heap22.rootTree.next.tree.root.value = 100;
heap22.rootTree.next.tree.root.child.value = 200;

testing.AreEqual(heap21.Count(), 3);
testing.AreEqual(heap22.Count(), 3);

testing.AreEqual(heap21.ExtractValue(), 10);
testing.AreEqual(heap21.ExtractValue(), 20);
testing.AreEqual(heap21.ExtractValue(), 30);
testing.AreEqual(heap21.Count(), 0);
testing.AreEqual(heap22.Count(), 3);
testing.AreEqual(heap22.ExtractValue(), 100);
testing.AreEqual(heap22.ExtractValue(), 200);
testing.AreEqual(heap22.ExtractValue(), 300);
testing.AreEqual(heap21.Count(), 0);
testing.AreEqual(heap22.Count(), 0);

heap22 = heap21.Clone();
testing.IsNull(heap21.ExtractValue());
testing.IsNull(heap22.ExtractValue());


let heap23: any = new MinHeap<number>();
heap23.Build([10, 20, 30, 40, 50, 60, 70]);
testing.AreEqual(heap23.Count(), 7);

let heap24: any = heap23.Clone();

heap24.rootTree.tree.root.value = 7;
heap24.rootTree.next.tree.root.value = 5;
heap24.rootTree.next.next.tree.root.value = 1;

testing.AreEqual(heap23.ExtractValue(), 10);
testing.AreEqual(heap23.ExtractValue(), 20);
testing.AreEqual(heap23.ExtractValue(), 30);
testing.AreEqual(heap23.ExtractValue(), 40);
testing.AreEqual(heap23.ExtractValue(), 50);
testing.AreEqual(heap23.ExtractValue(), 60);
testing.AreEqual(heap23.ExtractValue(), 70);
testing.IsNull(heap23.ExtractValue());

testing.AreEqual(heap24.ExtractValue(), 1);
testing.AreEqual(heap24.ExtractValue(), 5);
testing.AreEqual(heap24.ExtractValue(), 7);
testing.AreEqual(heap24.ExtractValue(), 20);
testing.AreEqual(heap24.ExtractValue(), 30);
testing.AreEqual(heap24.ExtractValue(), 40);
testing.AreEqual(heap24.ExtractValue(), 60);
testing.IsNull(heap24.ExtractValue());

//Comparator & clone
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
            return b.number - a.number;
        }
    }
    Clone(): FooCmp
    {
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


let heap26Clone1 = heap26.Clone();
let heap26Clone2 = heap26.Clone();
(<any>heap26Clone1).rootTree.tree.root.value.number = -1; 
testing.AreEqual(heap26Clone1.ExtractMin().number, -1);
testing.AreEqual(heap26Clone2.ExtractMin().number, 100);

heap26.Insert(new FooCmp(90));

testing.AreEqual(heap25.ExtractMin().number, 70);

heap26.Merge(heap25);

testing.AreEqual(heap26.ExtractMin().number, 100);
testing.AreEqual(heap26.ExtractMin().number, 90);
testing.AreEqual(heap26.ExtractMin().number, 60);
testing.AreEqual(heap26.ExtractMin().number, 50);
testing.AreEqual(heap26.ExtractMin().number, 40);

let heap27: MinHeap<FooCmp> = heap26.Clone();

testing.AreEqual(heap26.ExtractMin().number, 30);
testing.AreEqual(heap26.ExtractMin().number, 20);
testing.AreEqual(heap26.ExtractMin().number, 10);
testing.AreEqual(heap26.ExtractMin().number, 5);

testing.AreEqual(heap27.ExtractMin().number, 30);
testing.AreEqual(heap27.ExtractMin().number, 20);
testing.AreEqual(heap27.ExtractMin().number, 10);
testing.AreEqual(heap27.ExtractMin().number, 5);



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

testing.AreEqual(heap28.ExtractMin(), 7);
testing.AreEqual(heap28.ExtractMin(), 100);
testing.AreEqual(heap28.ExtractMin(), 200);
testing.AreEqual(heap28.ExtractMin(), 300);
testing.AreEqual(heap28.ExtractMin(), 400);
testing.AreEqual(heap28.ExtractMin(), 500);
testing.AreEqual(heap28.ExtractMin(), 600);

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

testing.AreEqual(heap29.ExtractMax(), 70);

heap29.Merge(heap30);

testing.AreEqual(heap29.ExtractMax(), 100);
testing.AreEqual(heap29.ExtractMax(), 90);
testing.AreEqual(heap29.ExtractMax(), 60);
testing.AreEqual(heap29.ExtractMax(), 50);
testing.AreEqual(heap29.ExtractMax(), 40);

let heap31: MaxHeap<number> = heap29.Clone();

testing.AreEqual(heap29.ExtractMax(), 30);
testing.AreEqual(heap29.ExtractMax(), 20);
testing.AreEqual(heap29.ExtractMax(), 10);
testing.AreEqual(heap29.ExtractMax(), 5);

testing.AreEqual(heap31.ExtractMax(), 30);
testing.AreEqual(heap31.ExtractMax(), 20);
testing.AreEqual(heap31.ExtractMax(), 10);
testing.AreEqual(heap31.ExtractMax(), 5);

//-----TESTING END-----
testing.EndTestingLog();
