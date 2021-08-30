import { Version } from "@drozdik.m/version";


export interface BonsaiAsyncResponseProtocolJSON
{
    protocol: string;
    version: Version;
    status: BonsaiAsyncResponseProtocolStatusJSON;
    content: any;
}

export interface BonsaiAsyncResponseProtocolStatusJSON
{
    hasErrors: boolean;
    infos: BonsaiAsyncResponseProtocolChannelJSON;
    successes: BonsaiAsyncResponseProtocolChannelJSON;
    warnings: BonsaiAsyncResponseProtocolChannelJSON;
    errors: BonsaiAsyncResponseProtocolChannelJSON;
}

export interface BonsaiAsyncResponseProtocolChannelJSON
{
    messages: string[];
    content: any;
}