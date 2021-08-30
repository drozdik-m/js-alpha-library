import { ProtocolChannel } from "./ProtocolChannel";
import { Content } from "../content/Content";


export class ErrorsChannel extends ProtocolChannel
{
    constructor(messages: string[] = [], content: Content = Content.Empty())
    {
        super("errors", messages, content);
    }
}