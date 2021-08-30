import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { FibonacciTree } from "../src/FibonacciTree";
import { MinHeap, MaxHeap } from "../src/MinMaxFibonacciHeap";
import { IComparable } from "@drozdik.m/common-interfaces/IComparable";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";
import { FibonacciHeap } from "../src/FibonacciHeap";

//-----START TESTING-----
let unitTest = new UnitTest("Fibonacci tree");

unitTest.AddTestCase("Key, Order, merge order 1", function () {
    let tree1: any = new FibonacciTree<number>(10);
    Assert.AreEqual(tree1.Key(), 10);
    Assert.AreEqual(tree1.Order(), 0);
    tree1.Merge(new FibonacciTree<number>(20));
    Assert.AreEqual(tree1.Key(), 10);
    Assert.AreEqual(tree1.Order(), 1);

    Assert.IsNull(tree1.root.parent);
    Assert.AreEqual(tree1.root.children[0].value, 20);
    Assert.AreEqual(tree1.root.children[0].parent.value, 10);

});

unitTest.AddTestCase("Merge order 2", function () {
    let tree1: any = new FibonacciTree<number>(10);
    tree1.Merge(new FibonacciTree<number>(20));
    let tree2: any = new FibonacciTree<number>(40);
    Assert.AreEqual(tree2.Key(), 40);
    tree2.Merge(new FibonacciTree<number>(30));
    Assert.AreEqual(tree2.Key(), 30);

    Assert.IsNull(tree2.root.parent);
    Assert.AreEqual(tree2.root.children[0].value, 40);
    Assert.AreEqual(tree2.root.children[0].parent.value, 30);


    tree2.Merge(tree1);
    Assert.IsNull(tree2.root.parent);
    Assert.AreEqual(tree2.Key(), 10);
    Assert.AreEqual(tree2.root.children[0].value, 20);
    Assert.AreEqual(tree2.root.children[0].parent.value, 10);
    Assert.AreEqual(tree2.root.children[1].value, 30);
    Assert.AreEqual(tree2.root.children[1].parent.value, 10);
    Assert.AreEqual(tree2.root.children[1].children[0].value, 40);
    Assert.AreEqual(tree2.root.children[1].children[0].parent.value, 30);
    Assert.AreEqual(tree2.Order(), 2);

});


unitTest.AddTestCase("Change key", function () {
    let tree1: any = new FibonacciTree<number>(10);
    tree1.Merge(new FibonacciTree<number>(20));
    let tree2: any = new FibonacciTree<number>(40);
    tree2.Merge(new FibonacciTree<number>(30));
    tree2.Merge(tree1);

    tree2.ChangeKey(100);
    Assert.AreEqual(tree2.Key(), 20);
    Assert.AreEqual(tree2.root.children[0].value, 100);
    Assert.AreEqual(tree2.root.children[1].value, 30);
    Assert.AreEqual(tree2.root.children[1].children[0].value, 40);

    tree2.ChangeKey(110);
    Assert.AreEqual(tree2.Key(), 30);
    Assert.AreEqual(tree2.root.children[0].value, 100);
    Assert.AreEqual(tree2.root.children[1].value, 40);
    Assert.AreEqual(tree2.root.children[1].children[0].value, 110);

});


unitTest.AddTestCase("Clone", function () {
    let tree1: any = new FibonacciTree<number>(10);
    tree1.Merge(new FibonacciTree<number>(20));
    let tree2: any = new FibonacciTree<number>(40);
    tree2.Merge(new FibonacciTree<number>(30));
    tree2.Merge(tree1);
    tree2.ChangeKey(100);
    tree2.ChangeKey(110);
    let tree3 = tree2.Clone();

    tree3.root.value = 1;
    tree3.root.children[0].value = 2;
    tree3.root.children[1].value = 3;
    tree3.root.children[1].children[0].value = 4;

    Assert.AreEqual(tree2.Key(), 30);
    Assert.AreEqual(tree2.root.children[0].value, 100);
    Assert.AreEqual(tree2.root.children[1].value, 40);
    Assert.AreEqual(tree2.root.children[1].children[0].value, 110);
    Assert.AreEqual(tree2.Order(), 2);

    Assert.AreEqual(tree3.Key(), 1);
    Assert.AreEqual(tree3.root.children[0].value, 2);
    Assert.AreEqual(tree3.root.children[1].value, 3);
    Assert.AreEqual(tree3.root.children[1].children[0].value, 4);
    Assert.AreEqual(tree3.Order(), 2);

});


unitTest.AddTestCase("Dismantle extract", function () {
    let tree1: any = new FibonacciTree<number>(10);
    tree1.Merge(new FibonacciTree<number>(20));
    let tree2: any = new FibonacciTree<number>(40);
    tree2.Merge(new FibonacciTree<number>(30));
    tree2.Merge(tree1);
    tree2.ChangeKey(100);
    tree2.ChangeKey(110);
    let tree3 = tree2.Clone();

    tree3.root.value = 1;
    tree3.root.children[0].value = 2;
    tree3.root.children[1].value = 3;
    tree3.root.children[1].children[0].value = 4;

    tree3.Merge(tree2);
    Assert.AreEqual(tree3.Order(), 3);

    let dismantle = tree3.DismantleExtract();

    Assert.AreEqual(dismantle[0].Key(), 2);
    Assert.AreEqual(dismantle[0].Order(), 0);
    Assert.AreEqual(dismantle[1].Key(), 3);
    Assert.AreEqual(dismantle[1].Order(), 1);
    Assert.AreEqual(dismantle[2].Key(), 30);
    Assert.AreEqual(dismantle[2].Order(), 2);
    Assert.IsNull(dismantle[2].root.parent);
});

unitTest.Run();