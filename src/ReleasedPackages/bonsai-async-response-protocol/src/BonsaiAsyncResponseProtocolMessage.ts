import { Version } from "@drozdik.m/version";
import { ProtocolChannel } from "../channels/ProtocolChannel";
import { Content } from "../content/Content";
import { Option } from "@drozdik.m/option";
import { InfoChannel } from "../channels/InfoChannel";
import { WarningsChannel } from "../channels/WarningsChannel";
import { SuccessesChannel } from "../channels/SuccessesChannel";
import { ErrorsChannel } from "../channels/ErrorsChannel";
import { BonsaiAsyncResponseProtocolJSON } from "./IBonsaiAsyncResponseProtocol";
import { MessageParsingError } from "../errors/MessageParsingError";

export class BonsaiAsyncResponseProtocolMessage
{
    protected version: Version;
    protected hasErrors: boolean;
    protected channels: ProtocolChannel[];
    protected content: Content;

    constructor(version: Version, hasErrors: boolean, channels: ProtocolChannel[], content: Content)
    {
        this.version = version;
        this.hasErrors = hasErrors;
        this.channels = channels;
        this.content = content;
    }

    /**
     * Returns version
     * */
    GetVersion(): Version
    {
        return this.version;
    }

    /**
     * Tells if this message has error
     * */
    HasErrors(): boolean
    {
        return this.hasErrors;
    }

    /**
     * Return this message content
     * */
    GetContent(): Content
    {
        return this.content;
    }

    /**
     * Finds a channel of this message
     * @param name The channel name
     */
    protected FindChannel(name: string): Option<ProtocolChannel>
    {
        for (let i = 0; i < this.channels.length; i++)
            if (this.channels[i].GetChannelName() == name)
                return Option.Some(this.channels[i]);
        return Option.None();
    }

    /**
     * Returns info channel of this message
     * */
    GetInfoChannel(): Option<InfoChannel>
    {
        return this.FindChannel("infos");
    }

    /**
     * Returns success channel of this message
     * */
    GetSuccessesChannel(): Option<SuccessesChannel>
    {
        return this.FindChannel("successes");
    }

    /**
     * Returns warnings channel of this message
     * */
    GetWarningsChannel(): Option<WarningsChannel>
    {
        return this.FindChannel("warnings");
    }

    /**
     * Returns errors channel of this message
     * */
    GetErrorsChannel(): Option<ErrorsChannel>
    {
        return this.FindChannel("errors");
    }

    /**
     * Returns BARP message object from a json
     * @param jsonInString
     */
    static FromJSON(jsonInString: string)
    {
        let json = JSON.parse(jsonInString) as BonsaiAsyncResponseProtocolJSON;

        //Protocol
        let protocol = json.protocol;
        if (typeof protocol == "undefined")
            throw new MessageParsingError("Protocol is not defined");
        if (protocol != "barp")
            throw new MessageParsingError("Protocol is not \"barp\"");

        //Version
        let version = json.version;
        if (typeof version == "undefined")
            throw new MessageParsingError("Version is not defined");
        if (version.toString() != "1.0.0")
            throw new MessageParsingError("Only version 1.0.0 is supported");

        //Content
        let content = new Content(json.content);

        //Status
        let status = json.status;
        if (typeof status == "undefined")
            throw new MessageParsingError("Status is not defined");

        let hasErrors = json.status.hasErrors;
        if (typeof hasErrors == "undefined")
            throw new MessageParsingError("hasErrors is not defined");

        let channels: ProtocolChannel[] = [];
        if (typeof status.infos != "undefined")
        {
            if (typeof status.infos.messages == "undefined")
                throw new MessageParsingError("Messages in info channel are not defined");
            channels.push(new InfoChannel(status.infos.messages, status.infos.content));
        }
        if (typeof status.errors != "undefined")
        {
            if (typeof status.errors.messages == "undefined")
                throw new MessageParsingError("Messages in errors channel are not defined");
            channels.push(new ErrorsChannel(status.errors.messages, status.errors.content));
        }
        if (typeof status.successes != "undefined")
        {
            if (typeof status.successes.messages == "undefined")
                throw new MessageParsingError("Messages in successes channel are not defined");
            channels.push(new SuccessesChannel(status.successes.messages, status.successes.content));
        }
        if (typeof status.warnings != "undefined")
        {
            if (typeof status.warnings.messages == "undefined")
                throw new MessageParsingError("Messages in warnings channel are not defined");
            channels.push(new WarningsChannel(status.warnings.messages, status.warnings.content));
        }

        //Create and return the res
        return new BonsaiAsyncResponseProtocolMessage(version, hasErrors, channels, content);
    }
}


