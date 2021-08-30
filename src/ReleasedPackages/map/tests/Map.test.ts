import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { Map } from "../src/Map";
import { MapIterator } from "../src/MapIterator";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";
import { IComparable } from "@drozdik.m/common-interfaces/IComparable";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { KeyValuePair } from "@drozdik.m/pair/dist/KeyValuePair";

//-----TESTING BEGIN-----
let unitTest = new UnitTest("Map");

unitTest.AddTestCase("Insert", function ()
{
    //Insert
    let tree = new Map<number, string>();

    tree.InsertValue(20, "200");
    tree.InsertValue(20, "200");
    tree.InsertValue(30, "300");
    tree.InsertValue(40, "400");
    tree.InsertValue(50, "500");
    tree.Insert(new KeyValuePair(45, "450"))
    tree.InsertValue(35, "350");
    tree.InsertValue(10, "100");
    tree.InsertValue(0, "00");
    tree.InsertValue(25, "250");

    let keys = [
        0, 10, 20, 25, 30, 35, 40, 45, 50
    ];
    let values = [
        "00", "100", "200", "250", "300", "350", "400", "450", "500"
    ];

    let i = 0;
    for (let it = tree.First(); it.HasValue(); it.Next())
    {
        Assert.AreEqual(keys[i], it.PairKey());
        Assert.AreEqual(values[i], it.PairValue());
        i++;
    }
    Assert.AreEqual(9, i);

});

unitTest.AddTestCase("Find", function ()
{
    let map1 = new Map<number, string>();
    let valuesArray = [40, 10, 20, 80, 90, 50, 60, 70, 0, 30, 15, 45, 85, 5];
    for (let i = 0; i < valuesArray.length; i++)
        map1.InsertValue(valuesArray[i], valuesArray[i].toString() + "0");

    for (let i = 0; i < valuesArray.length; i++)
        Assert.AreEqual(valuesArray[i].toString() + "0", map1.FindValue(valuesArray[i]).PairValue());

    for (let i = 0; i < valuesArray.length; i++)
        Assert.AreEqual(valuesArray[i].toString() + "0", map1.Find(new KeyValuePair(valuesArray[i], "xxx")).PairValue());

    Assert.IsFalse(map1.FindValue(999).HasValue());

    let map2 = new Map<number, string>();
    Assert.IsFalse(map2.FindMin().HasValue());
    Assert.IsFalse(map2.FindMax().HasValue());
    Assert.IsFalse(map2.FindValue(1).HasValue());
    Assert.IsFalse(map2.First().HasValue());
    Assert.IsFalse(map2.Last().HasValue());

    map2.InsertValue(1, "10");
    Assert.AreEqual("10", map2.First().PairValue());
    Assert.AreEqual("10", map2.Last().PairValue());
});

unitTest.AddTestCase("Iterator", function ()
{
    //Iterator - next, prev, value, hasvalue
    let map = new Map<number, string>();
    let valuesArray = [40, 10, 20, 80, 90, 50, 60, 70, 0, 30, 15, 45, 85, 5];
    for (let i = 0; i < valuesArray.length; i++)
        map.InsertValue(valuesArray[i], valuesArray[i].toString() + "0");
    valuesArray = valuesArray.sort(function (a: number, b: number) { return a - b; });

    let number = 0;
    for (let it = map.First(); it.HasValue(); it.Next())
        Assert.AreEqual(it.PairKey(), valuesArray[number++]);
    Assert.AreEqual(valuesArray.length, number);

    number = valuesArray.length - 1;
    for (let it = map.Last(); it.HasValue(); it.Previous())
        Assert.AreEqual(it.PairKey(), valuesArray[number--]);
    Assert.AreEqual(-1, number);
});

unitTest.AddTestCase("Remove", function ()
{
    let map = new Map<number, string>();
    map.InsertValue(20, "");
    map.InsertValue(20, "");
    map.InsertValue(30, "");
    map.InsertValue(40, "");
    map.InsertValue(50, "");
    map.InsertValue(45, "");
    map.InsertValue(35, "");
    map.InsertValue(10, "");
    map.InsertValue(0, "");
    map.InsertValue(25, "");

    map.RemoveAt(map.FindValue(25))
    map.RemoveValue(30);
    map.RemoveValue(35);
    map.Remove(new KeyValuePair(0, "xxx"))
    map.RemoveValue(50);
    map.RemoveValueAt(map.FindValue(45));
    map.RemoveValue(20);
    map.RemoveAt(map.FindValue(20))

    //40, 10
    Assert.AreEqual(10, map.First().PairKey());
    Assert.AreEqual(40, map.Last().PairKey());
});

unitTest.AddTestCase("Clone", function ()
{
    let map = new Map<number, string>();
    let valuesArray = [45, 85, 5, 60, 70, 80, 90, 10, 20, 30, 15, 40, 0, 55];

    for (let i = 0; i < valuesArray.length; i++)
        map.InsertValue(valuesArray[i], "");

    valuesArray = valuesArray.sort(function (a: number, b: number) { return a - b; });
    let number = 0;
    for (let it = map.First(); it.HasValue(); it.Next())
        Assert.AreEqual(valuesArray[number++], it.PairKey());
    Assert.AreEqual(valuesArray.length, number);

    let mapClone = map.Clone();

    for (let i = 0; i < valuesArray.length; i++)
        map.UpdateValueAt("1", map.FindValue(valuesArray[i]));

    number = 0;
    for (let it = mapClone.First(); it.HasValue(); it.Next())
        Assert.AreEqual(it.PairKey(), valuesArray[number++]);
    Assert.AreEqual(valuesArray.length, number);

    Assert.AreEqual(map.Count(), valuesArray.length);
    Assert.AreEqual(mapClone.Count(), valuesArray.length);
    map.Clear();
    Assert.AreEqual(map.Count(), 0);
    Assert.AreEqual(mapClone.Count(), valuesArray.length);

    number = 0;
    for (let it = mapClone.First(); it.HasValue(); it.Next())
        Assert.AreEqual(it.PairKey(), valuesArray[number++]);
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

    let map = new Map<FooCmp, FooCmp>([
        new KeyValuePair<FooCmp, FooCmp>(new FooCmp(0), new FooCmp(0)),
        new KeyValuePair<FooCmp, FooCmp>(new FooCmp(1), new FooCmp(1)),
        new KeyValuePair<FooCmp, FooCmp>(new FooCmp(2), new FooCmp(2)),
        new KeyValuePair<FooCmp, FooCmp>(new FooCmp(3), new FooCmp(3)),
        new KeyValuePair<FooCmp, FooCmp>(new FooCmp(4), new FooCmp(4))
    ]);
    
    Assert.AreEqual(0, map.FindValue(new FooCmp(0)).PairValue().number); 
    Assert.AreEqual(1, map.FindValue(new FooCmp(1)).PairValue().number);
    Assert.AreEqual(2, map.FindValue(new FooCmp(2)).PairValue().number);
    Assert.AreEqual(3, map.FindValue(new FooCmp(3)).PairValue().number);
    Assert.AreEqual(4, map.FindValue(new FooCmp(4)).PairValue().number);

    let mapClone = map.Clone();
    Assert.AreEqual(mapClone.Count(), 5);
    Assert.AreEqual(mapClone.FindValue(new FooCmp(0)).PairValue().number, 0); 
    Assert.AreEqual(mapClone.FindValue(new FooCmp(1)).PairValue().number, 1);
    Assert.AreEqual(mapClone.FindValue(new FooCmp(2)).PairValue().number, 2);
    Assert.AreEqual(mapClone.FindValue(new FooCmp(3)).PairValue().number, 3);
    Assert.AreEqual(mapClone.FindValue(new FooCmp(4)).PairValue().number, 4); 
    mapClone.FindValue(new FooCmp(0)).PairKey().number = -1; 
    Assert.AreEqual(mapClone.FindValue(new FooCmp(-1)).PairKey().number, -1);
    mapClone.Dispose();
    
    Assert.IsFalse(map.FindValue(new FooCmp(-1)).HasValue());
    Assert.AreEqual(map.FindValue(new FooCmp(0)).PairValue().number, 0);
    Assert.AreEqual(map.FindValue(new FooCmp(1)).PairValue().number, 1);
    Assert.AreEqual(map.FindValue(new FooCmp(2)).PairValue().number, 2);
    Assert.AreEqual(map.FindValue(new FooCmp(3)).PairValue().number, 3);
    Assert.AreEqual(map.FindValue(new FooCmp(4)).PairValue().number, 4);
});

unitTest.AddTestCase("Update", function ()
{
    let map = new Map<number, string>();
    map.UpdateValue(10, "10");
    let valuesArray = [
        new KeyValuePair<number, string>(40, ""),
        new KeyValuePair<number, string>(60, ""),
        new KeyValuePair<number, string>(70, ""),
        new KeyValuePair<number, string>(0, ""),
        new KeyValuePair<number, string>(30, ""),
        new KeyValuePair<number, string>(15, ""),
        new KeyValuePair<number, string>(45, ""),
        new KeyValuePair<number, string>(85, ""),
        new KeyValuePair<number, string>(5, ""),
        new KeyValuePair<number, string>(10, ""),
        new KeyValuePair<number, string>(20, ""),
        new KeyValuePair<number, string>(80, ""),
        new KeyValuePair<number, string>(90, ""),
        new KeyValuePair<number, string>(55, "")
    ];
    map.Build(valuesArray);

    valuesArray = valuesArray.sort(function (a: KeyValuePair<number, string>, b: KeyValuePair<number, string>) { return a.Key() - b.Key(); });
    let number = 0;
    for (let it = map.First(); it.HasValue(); it.Next())
        Assert.AreEqual(it.PairKey(), valuesArray[number++].Key());
    Assert.AreEqual(valuesArray.length, number);

    for (let i = 0; i < valuesArray.length; i++)
        map.UpdateValueAt("ooo", map.FindValue(valuesArray[i].Key()));

    map.UpdateValue(9999, "999999");
    map.UpdateValueAt("999999", map.FindValue(999));
    
    for (let i = 0; i < valuesArray.length; i++)
        map.UpdateValue(valuesArray[i].Key(), "xoxo");
    number = 0;
    for (let it = map.First(); it.HasValue(); it.Next(), number++)
        Assert.AreEqual("xoxo", it.PairValue());
    Assert.AreEqual(valuesArray.length, number);

    for (let i = 0; i < valuesArray.length; i++)
        map.Update(new KeyValuePair(valuesArray[i].Key(), "xxx"), new KeyValuePair(valuesArray[i].Key(), "yoyo"));
    number = 0;
    for (let it = map.First(); it.HasValue(); it.Next(), number++)
        Assert.AreEqual("yoyo", it.PairValue());
    Assert.AreEqual(valuesArray.length, number);

    for (let i = 0; i < valuesArray.length; i++)
        map.UpdateAt(new KeyValuePair(valuesArray[i].Key(), "koko"), map.FindValue(valuesArray[i].Key()));
    number = 0;
    for (let it = map.First(); it.HasValue(); it.Next(), number++)
        Assert.AreEqual("koko", it.PairValue());
    Assert.AreEqual(valuesArray.length, number);

});

unitTest.AddTestCase("At", function ()
{
    let map = new Map<number, string>();
    let valuesArray = [
        new KeyValuePair<number, string>(40, ""),
        new KeyValuePair<number, string>(60, ""),
        new KeyValuePair<number, string>(70, ""),
        new KeyValuePair<number, string>(0, ""),
        new KeyValuePair<number, string>(30, ""),
        new KeyValuePair<number, string>(15, ""),
        new KeyValuePair<number, string>(45, ""),
        new KeyValuePair<number, string>(85, ""),
        new KeyValuePair<number, string>(5, ""),
        new KeyValuePair<number, string>(10, ""),
        new KeyValuePair<number, string>(20, ""),
        new KeyValuePair<number, string>(80, ""),
        new KeyValuePair<number, string>(90, ""),
        new KeyValuePair<number, string>(55, "")
    ];

    map.Build(valuesArray);

    valuesArray = valuesArray.sort(function (a: KeyValuePair<number, string>, b: KeyValuePair<number, string>) { return a.Key() - b.Key(); });

    for (let i = 0; +i < valuesArray.length; i++)
        Assert.AreEqual(map.At(i).Key(), valuesArray[i].Key());

    for (let i = 0; +i < valuesArray.length; i++)
        Assert.AreEqual(map.AtIterator(i).PairKey(), valuesArray[i].Key());

    Assert.IsFalse(map.AtIterator(-1).HasValue());
    Assert.IsFalse(map.AtIterator(valuesArray.length).HasValue());
    Assert.IsNull(map.At(-1));
    Assert.IsNull(map.At(valuesArray.length));
});

unitTest.Run();