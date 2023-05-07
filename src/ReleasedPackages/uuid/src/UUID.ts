import { v4 as uuidv4 } from "uuid";
 
export class UUID
{
    private uuidString: string;

    constructor()
    {
        this.uuidString = UUID.GenerateUUID();
    }

    private static GenerateUUID(): string
    {
        return uuidv4();
    }

    public static Create(): UUID
    {
        return new UUID();
    }

    public ToString(): string
    {
        return this.uuidString;
    }

    public toString(): string
    {
        return this.ToString();
    }
}