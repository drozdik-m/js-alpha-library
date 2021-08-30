
//--------------------------------------------------
//----------UN/DEFINED FUNCTIONS--------------------
//--------------------------------------------------
export class Definition
{
   
    /**
     * Tests if input is defined
     * @param testedSample Element to test
     * @returns True if input is defined
     */
    static IsDefined(testedSample: any): boolean
    {
        return !(typeof testedSample === "undefined");
    }
    /**
     * Tests if input id undefined
     * @param testedSample Element to test
     * @returns True if input is undefined
     */
    static IsUndefined(testedSample: any)
    {
        return !(Definition.IsDefined(testedSample));
    }
}