
export interface IResultJSON
{
    name: string,
    testCases: ITestCaseResultJSON[],
    finished: boolean,
    success: boolean,
    assertErrorCount: number
}

export interface ITestCaseResultJSON
{
    name: string,
    success: boolean,
    finished: boolean,
    errorMessage: string
}