import { UnitTest, Assert } from "@drozdik.m/unit-test";
import { List } from "../src/List";
import { IComparable } from "@drozdik.m/common-interfaces/IComparable";
import { IComparator } from "@drozdik.m/common-interfaces/IComparator";
import { IClonable } from "@drozdik.m/common-interfaces/IClonable";


let unitTest = new UnitTest("Double linked list");

unitTest.AddTestCase("Insert front", function ()
{
    let list1 = new List<number>();
    for (let i = 0; i < 10; i++)
        list1.InsertFront(i);
    let number = 0;
    for (let item = list1.First(); item.HasValue(); item.Next())
    {
        Assert.Assert(item.Value() === number);
        number++;
    }

    Assert.Assert(number === 10);
    number = 9;
    for (let item = list1.Last(); item.HasValue(); item.Previous())
    {
        Assert.Assert(item.Value() === number);
        number--;
    }
    Assert.Assert(number === -1);
});

unitTest.AddTestCase("Build", function ()
{
    let list1 = new List<number>();
    list1.Build([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (let item = list1.First(), i = 0; item.HasValue(); item.Next(), i++)
        Assert.AreEqual(i, item.Value());
});

unitTest.AddTestCase("Insert back", function ()
{
    let number = 0;
    let list2 = new List<number>();
    for (let i = 0; i < 10; i++)
        list2.InsertBack(i);
    number = 9;
    for (let item = list2.First(); item.HasValue(); item.Next())
    {
        Assert.Assert(item.Value() === number);
        number--;
    }
    Assert.Assert(number === -1);
    number = 0;
    for (let item = list2.Last(); item.HasValue(); item.Previous())
    {
        Assert.Assert(item.Value() === number);
        number++;
    }
    Assert.Assert(number === 10);
});

unitTest.AddTestCase("Iterator", function ()
{
    let list3 = new List<number>();
    for (let i = 0; i < 20; i++)
        list3.InsertFront(i);
    let listIterator1 = list3.First();
    listIterator1.Previous();
    Assert.Assert(!listIterator1.HasValue());
    listIterator1 = list3.First();
    Assert.Assert(listIterator1.Value() === 0);
    Assert.Assert(listIterator1.HasValue());
    listIterator1.Previous();
    Assert.Assert(!listIterator1.HasValue());
    listIterator1 = list3.Last();
    listIterator1.Previous();
    Assert.Assert(listIterator1.Value() === 18);
    listIterator1.Next();
    Assert.Assert(listIterator1.Value() === 19);
    listIterator1.Next();
    Assert.Assert(listIterator1.Value() === null);
    Assert.Assert(!listIterator1.HasValue());
});

unitTest.AddTestCase("Find", function ()
{
    let list4 = new List<number>();
    for (let i = 0; i < 10; i++)
        list4.InsertFront(i);
    let listIterator2 = list4.Find(9);
    Assert.Assert(listIterator2.Value() === 9);
    Assert.Assert(listIterator2.HasValue());
    listIterator2.Next();
    Assert.Assert(!listIterator2.HasValue());
    let number = 0;
    for (let item = list4.Find(0); item.HasValue(); item.Next())
    {
        Assert.Assert(item.HasValue());
        Assert.Assert(item.Value() === number);
        number++;
    }
    Assert.Assert(number === 10);
});

unitTest.AddTestCase("Insert after", function ()
{
    let list5 = new List<string>();
    for (let i = 0; i < 10; i++)
        list5.InsertFront(i.toString());
    let listIterator3 = list5.First();
    listIterator3 = list5.Last();
    list5.InsertAfter("TEST!", listIterator3);
    Assert.Assert(listIterator3.Value() === "9");
    listIterator3.Next();
    Assert.Assert(listIterator3.Value() === "TEST!");
    listIterator3.Previous();
    Assert.Assert(listIterator3.Value() === "9");
    listIterator3 = list5.Find("5");
    list5.InsertAfter("5+", listIterator3);
    Assert.Assert(listIterator3.Value() === "5");
    listIterator3.Previous();
    Assert.Assert(listIterator3.Value() === "4");
    listIterator3.Next();
    listIterator3.Next();
    Assert.Assert(listIterator3.Value() === "5+");
    listIterator3.Next();
    Assert.Assert(listIterator3.Value() === "6");
    listIterator3 = list5.First();
    list5.InsertAfter("0+", listIterator3);
    Assert.Assert(listIterator3.Value() === "0");
    listIterator3.Next();
    Assert.Assert(listIterator3.Value() === "0+");
    listIterator3.Previous();
    Assert.Assert(listIterator3.Value() === "0");
    Assert.Assert(list5.First().Value() == "0");
    Assert.Assert(list5.Last().Value() == "TEST!");
});

unitTest.AddTestCase("Insert before", function ()
{
    let list6 = new List<string>();
    for (let i = 0; i < 10; i++)
        list6.InsertFront(i.toString());
    let listIterator4 = list6.First();
    listIterator4 = list6.Last();
    list6.InsertBefore("9-", listIterator4);
    Assert.Assert(listIterator4.Value() === "9");
    listIterator4.Previous();
    Assert.Assert(listIterator4.Value() === "9-");
    listIterator4.Next();
    Assert.Assert(listIterator4.Value() === "9");
    listIterator4 = list6.First();
    list6.InsertBefore("0-", listIterator4);
    Assert.Assert(listIterator4.Value() === "0");
    listIterator4.Previous();
    Assert.Assert(listIterator4.Value() === "0-");
    listIterator4.Next();
    Assert.Assert(listIterator4.Value() === "0");
    Assert.Assert(list6.First().Value() == "0-");
    Assert.Assert(list6.Last().Value() == "9");
});

unitTest.AddTestCase("Empty, clear", function ()
{
    let list7 = new List<boolean>();
    list7.InsertFront(true);
    list7.InsertFront(false);
    list7.InsertFront(true);
    list7.InsertFront(false);
    Assert.Assert(list7.Count() === 4);
    Assert.Assert(!list7.IsEmpty());
    list7.Clear();
    Assert.Assert(list7.IsEmpty());
    Assert.Assert(list7.Count() === 0);
    let listIterator5 = list7.First();
    Assert.Assert(!listIterator5.HasValue());

});

unitTest.AddTestCase("Remove", function ()
{
    let list8 = new List<number>();
    for (let i = 0; i < 10; i++)
        list8.InsertFront(i);
    for (let i = 0; i < 10; i++)
        list8.RemoveAt(list8.First());
    Assert.Assert(list8.IsEmpty());
    for (let i = 0; i < 10; i++)
        list8.InsertFront(i);
    list8.RemoveAt(list8.Find(5));
    let listIterator6 = list8.First();
    let number = 0;
    for (let i = 0; i < 10; i++)
    {
        if (i != 5)
        {
            Assert.Assert(listIterator6.Value() == i);
            listIterator6.Next();
            number++;
        }
    }
    Assert.Assert(number == 9);
    list8.RemoveAt(list8.First());
    list8.RemoveAt(list8.Last());
    Assert.Assert(list8.First().Value() == 1);
    Assert.Assert(list8.Last().Value() == 8);
    list8.Remove(1);
    list8.Remove(2);
    list8.Remove(3);
    list8.Remove(4);
    list8.Remove(6);
    list8.Remove(7);
    Assert.Assert(list8.First().Value() == 8);
    Assert.Assert(list8.Last().Value() == 8);
    list8.Remove(8);
    Assert.IsFalse(list8.First().HasValue());
    Assert.IsFalse(list8.Last().HasValue());

});

unitTest.AddTestCase("Update", function ()
{
    //UPDATE
    let list9 = new List<number>();
    list9.InsertFront(1);
    list9.UpdateAt(2, list9.First());
    Assert.Assert(list9.First().Value() === 2);

    list9.InsertFront(3);
    list9.InsertFront(4);
    list9.InsertFront(5);
    list9.Update(4, 40);
    list9.Update(2, 20);
    list9.Update(5, 50);

    let it7 = list9.First();
    Assert.AreEqual(it7.Value(), 20);
    it7.Next();
    Assert.AreEqual(it7.Value(), 3);
    it7.Next();
    Assert.AreEqual(it7.Value(), 40);
    it7.Next();
    Assert.AreEqual(it7.Value(), 50);
});

unitTest.AddTestCase("At", function ()
{
    //AT
    let list10 = new List<number>();

    Assert.IsNull(list10.At(0));
    Assert.IsFalse(list10.AtIterator(0).HasValue());
    for (let i = 0; i < 100; i += 10)
        list10.Insert(i);
    for (let i = 0; i < 10; i++)
        Assert.AreEqual(list10.At(i), i * 10);
    for (let i = 0; i < 10; i++)
        Assert.AreEqual(list10.AtIterator(i).Value(), i * 10);

    Assert.IsNull(list10.At(10));
    Assert.IsNull(list10.At(11));
    Assert.IsNull(list10.At(12));

    Assert.IsFalse(list10.AtIterator(10).HasValue());
    Assert.IsFalse(list10.AtIterator(11).HasValue());
    Assert.IsFalse(list10.AtIterator(12).HasValue());
});

unitTest.AddTestCase("Clone", function ()
{
    let list10 = new List<number>();
    for (let i = 0; i < 100; i += 10)
        list10.Insert(i);


    //CLONE
    let list11 = list10.Clone();

    for (let i = 0; i < 10; i++)
        list11.Update(i * 10, i * 100);

    for (let i = 0; i < 10; i++)
        Assert.AreEqual(list10.At(i), i * 10);
    for (let i = 0; i < 10; i++)
        Assert.AreEqual(list11.At(i), i * 100);
});

unitTest.AddTestCase("Comparator", function ()
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
    let list12 = new List<FooCmp>([
        new FooCmp(0),
        new FooCmp(1),
        new FooCmp(2),
        new FooCmp(3),
        new FooCmp(4)
    ]);
    Assert.AreEqual(list12.Find(new FooCmp(0)).Value().number, 0);
    Assert.AreEqual(list12.Find(new FooCmp(1)).Value().number, 1);
    Assert.AreEqual(list12.Find(new FooCmp(2)).Value().number, 2);
    Assert.AreEqual(list12.Find(new FooCmp(3)).Value().number, 3);
    Assert.AreEqual(list12.Find(new FooCmp(4)).Value().number, 4);

});

unitTest.AddTestCase("IClonable", function ()
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
    let list14 = new List<FooCmp>([
        new FooCmp(0),
        new FooCmp(1),
        new FooCmp(2),
        new FooCmp(3),
        new FooCmp(4)
    ]);
    let list15: any = list14.Clone();
    let list16: any = list14.Clone();
    list15.front.value.number = -1;
    Assert.AreEqual(list15.front.value.number, -1);
    Assert.AreEqual(list16.front.value.number, 4);
});


unitTest.Run();