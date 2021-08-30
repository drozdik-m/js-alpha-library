import { ProtocolChannel } from "./ProtocolChannel";
import { Content } from "../content/Content";


export class WarningsChannel extends ProtocolChannel
{
    constructor(messages: string[] = [], content: Content = Content.Empty())
    {
        super("warnings", messages, content);
    }
}