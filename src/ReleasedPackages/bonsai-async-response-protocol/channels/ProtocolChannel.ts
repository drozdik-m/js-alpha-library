import { Content } from "../content/Content";


export class ProtocolChannel
{
    protected channelName: string;
    protected messages: string[];
    protected content: Content;

    constructor(channelName: string, messages: string[] = [], content: Content = Content.Empty())
    {
        this.channelName = channelName;
        this.messages = messages;
        this.content = content;
    }

    /**
     * Returns channel name
     * */
    GetChannelName(): string
    {
        return this.channelName;
    }

    /**
     * Returns messages array
     * */
    GetMessages(): string[]
    {
        return this.messages;
    }

    /**
     * Returns content
     * */
    GetContent(): Content
    {
        return this.content;
    }
}