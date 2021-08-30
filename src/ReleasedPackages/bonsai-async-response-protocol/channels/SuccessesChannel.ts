import { ProtocolChannel } from "./ProtocolChannel";
import { Content } from "../content/Content";


export class SuccessesChannel extends ProtocolChannel
{
    constructor(messages: string[] = [], content: Content = Content.Empty())
    {
        super("successes", messages, content);
    }
}