import { ProtocolChannel } from "./ProtocolChannel";
import { Content } from "../content/Content";


export class InfoChannel extends ProtocolChannel
{
    constructor(messages: string[] = [], content: Content = Content.Empty())
    {
        super("infos", messages, content);
    }
}