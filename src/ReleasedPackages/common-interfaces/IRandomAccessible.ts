
export interface IRandomAccessible<T>
{
    /**
     * Returns value on given index
     * @param index Index
     */
    At(index: number): T;
}