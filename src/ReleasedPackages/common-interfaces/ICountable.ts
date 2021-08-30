
export interface ICountable
{
    /**
     * Returns count of items
     * */
    Count(): number;

    /**
     * Returns true if Count() == 0
     * */
    IsEmpty(): boolean;
}