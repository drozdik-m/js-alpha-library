import { BrowserTest } from "@drozdik.m/web-unit-test";
import { IncomingMessage, ServerResponse } from "http";
let url = require('url');
let http = require('http');

http.createServer(function (request: IncomingMessage, response: ServerResponse)
{
    //Get request URL
    let requestUrl = url.parse(request.url, true);
    let repeat = requestUrl.query.repeat;
    if (!repeat)
        repeat = "";

    //Write the repeater
    response.setHeader('Access-Control-Allow-Origin', '*');
    if (requestUrl.pathname == "/error")
        response.writeHead(500, { "Content-Type": "text/html" });
    else
        response.writeHead(200, { "Content-Type": "text/html" });
    response.write(repeat);
    response.end();
}).listen(8888);


let browserTest = new BrowserTest(
    BrowserTest.GetHTMLPath(),
    "dist/tests/Ajax/AjaxAgent.browser.js",
    BrowserTest.GetCSSPath()
);

browserTest.Run(7000); 