import { AssertFailedError } from "./Errors/AssertFailedError";

export class Assert
{
    //--------------------------------------------------
    //----------COUNT----------------------------------
    //--------------------------------------------------
    private static errorCount = 0;

    /**
     * Returns error count
     * */
    static ErrorCount(): number
    {
        return Assert.errorCount;
    }

    /**
     * Resets error count
     * */
    static ResetErrorCount()
    {
        Assert.errorCount = 0;
    }

    /**
     * Handles occured error
     * */
    static ErrorOccured()
    {
        Assert.errorCount += 1;
    }

    //--------------------------------------------------
    //----------ASSERT----------------------------------
    //--------------------------------------------------
    /**
     * Testing method. If input is false, error is thrown.
     * @param input Testing sample (boolean)
     */
    static Assert(input: boolean): void
    {
        if (!input)
        {
            Assert.ErrorOccured();
            throw new AssertFailedError("Input is false");
        }
    }

    //--------------------------------------------------
    //----------EQUAL-----------------------------------
    //--------------------------------------------------
    /**
     * Testing method. If parameter1 == parameter2 is false, error is thrown.
     * @param expected Expected result
     * @param actual Actual result
     */
    static AreEqual(expected: any, actual: any): void
    {
        if (expected != actual)
        {
            Assert.ErrorOccured();
            throw new AssertFailedError(`Expected: ${expected}, actual: ${actual}`);
        }      
    }

    /**
     * Testing method. If parameter1 != parameter2 is false, error is thrown.
     * @param notExpected Not expected result
     * @param actual Actual result
     */
    static AreNotEqual(notExpected: any, actual: any): void
    {
        if (notExpected == actual)
        {
            Assert.ErrorOccured();
            throw new AssertFailedError(`Not expected: ${notExpected}, actual: ${actual}`);
        }   
    }

    //--------------------------------------------------
    //----------SAME------------------------------------
    //--------------------------------------------------
    /**
     * Testing method. If type of parameter 1 == type of parameter 2 is false, error is thrown.
     * @param expected Expected type
     * @param actual Actual type
     */
    static AreSame(expected: any, actual: any): void
    {
        if (typeof expected != typeof actual)
        {
            Assert.ErrorOccured();
            throw new AssertFailedError(`Not expected: ${expected}, actual: ${actual}`);
        }
    }

    /**
     * Testing method. If type of parameter 1 != type of parameter 2 is false, error is thrown.
     * @param notExpected Not expected type
     * @param actual Actual type
     */
    static AreNotSame(notExpected: any, actual: any): void
    {
        if (typeof notExpected == typeof actual)
        {
            Assert.ErrorOccured();
            throw new AssertFailedError(`Not expected: ${notExpected}, actual: ${actual}`);
        }
    }

    //--------------------------------------------------
    //----------NULL------------------------------------
    //--------------------------------------------------
    /**
     * Testing method. If the input is not null, error is thrown.
     * @param input Input
     */
    static IsNull(input: any): void
    {
        if (input != null)
        {
            Assert.ErrorOccured();
            throw new AssertFailedError(`Input is not null, expected not null`);
        }   
    }

    /**
     * Testing method. If the input is null, error is thrown.
     * @param input Input
     */
    static IsNotNull(input: any): void
    {
        if (input == null)
        {
            Assert.ErrorOccured();
            throw new AssertFailedError(`Input is null, expected not null`);
        }
    }


    //--------------------------------------------------
    //----------DEFINED---------------------------------
    //--------------------------------------------------
    /**
     * Testing method. If the input is not undefined, error is thrown.
     * @param input
     */
    static IsUndefined(input: any): void
    {
        if (typeof input != "undefined")
        {
            Assert.ErrorOccured();
            throw new AssertFailedError(`Input is defined, expected undefined`);
        }
    }

    /**
     * Testing method. If the input is undefined, error is thrown.
     * @param input
     */
    static IsDefined(input: any): void
    {
        if (typeof input == "undefined")
        {
            Assert.ErrorOccured();
            throw new AssertFailedError(`Input is undefined, expected defined`);
        }
            
    }

    //--------------------------------------------------
    //----------BOOLEAN---------------------------------
    //--------------------------------------------------
    /**
     * Testing method. If the input is false, error is called.
     * @param input Input
     */
    static IsTrue(input: boolean): void
    {
        if (!input)
        {
            Assert.ErrorOccured();
            throw new AssertFailedError(`Input is false, expected true`);
        }   
    }

    /**
     * Testing method. If the input is true, error is called.
     * @param input Input
     */
    static IsFalse(input: boolean): void
    {
        if (input)
        {
            Assert.ErrorOccured();
            throw new AssertFailedError(`Input is true, expected false`);
        }
            
    }

    //--------------------------------------------------
    //----------FAIL------------------------------------
    //--------------------------------------------------
    /**
     * Fails an assert.
     * */
    static Fail(): void
    {
        Assert.ErrorOccured();
        throw new AssertFailedError(`Assert fail`);
    }
}