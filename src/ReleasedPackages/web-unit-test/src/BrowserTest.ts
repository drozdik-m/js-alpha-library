import { IncomingMessage, ServerResponse, Server } from "http";
import { spawn, spawnSync } from "child_process";
import { setTimeout, clearInterval } from "timers";
import { UnitTest, IResultJSON } from "@drozdik.m/unit-test";

let http = require('http');
let fs = require('fs');
let url = require('url');

import { BrowserTestAgent } from "./BrowserTestAgent";
import { ServerTimeoutError } from "../error/ServerTimeoutError";

export { BrowserTestAgent };

export class BrowserTest
{
    //--------------------------------------------------
    //----------ATTRIBUTES------------------------------
    //--------------------------------------------------
    //Server
    private port = Math.floor(Math.random() * 60000) + 5000;
    private server: Server = null;

    //Timeout
    private timeout: number = 60 * 1000;
    private timeoutCoroutine: any = null;

    //Browser
    private browser: any = null;
    private browserType = Browser.Chrome;

    //Files
    private htmlFile: string = "";
    private scriptSourceFile: string = "";
    private scriptFile: string = "_temp.js";
    private styleFile: string = "";

    //--------------------------------------------------
    //----------CONSTRUCTOR-----------------------------
    //--------------------------------------------------
    constructor(
        htmlFile: string,
        scriptSourceFile: string,
        styleFile: string)
    {
        this.htmlFile = htmlFile;
        this.scriptSourceFile = scriptSourceFile;
        this.styleFile = styleFile;
    }

    /**
     * Sets timeout [ms] (default is 60 sec)
     * Muset be set before server launch
     * @param timeout Timeout [ms]
     */
    SetTimeout(timeout: number)
    {
        this.timeout = timeout;
    }

    //--------------------------------------------------
    //----------BROWSER---------------------------------
    //--------------------------------------------------
    /**
     * Runs the browser and starts the server
     * @param timeout Timeout [ms] (default 60 sec)
     */
    Run(timeout: number = 60000)
    {
        this.SetTimeout(timeout);
        this.RunBrowser();
    }

    /**
     * Run server and then launch the server
     * */
    private RunBrowser()
    {
        //Run response server 
        this.RunServer();

        //Compile script
        console.log(`Compiling...`);
        spawnSync("cmd", ["/c", `browserify ${this.scriptSourceFile} -o ${this.scriptFile}`]);
        console.log(`Script compiled (${this.scriptSourceFile} -> ${this.scriptFile})`);

        //Run the browser
        let url = `http://localhost:${this.port}`;
        if (this.browserType == Browser.Chrome)
            this.browser = spawn("cmd", ["/c", `start chrome ${url}`]);
        else if (this.browserType == Browser.Edge)
            this.browser = spawn("cmd", ["/c", `start microsoft-edge:${url}`]);
        console.log("Browser launched");

        //this.browser = spawn("cmd", ["/c", `start microsoft-edge:http://localhost:${this.port}`]);
        //const ls = spawn("cmd", ["/c", "dir"]);
        //const ls = spawn("cmd", ["/c", "start chrome https://bonsai-development.cz /incognito"]);
    }

    /**
     * Handle incoming test results
     * @param testResults test results (string)
     */
    private HandleTestResults(testResults: string)
    {
        console.log("----------RESULTS----------");
        UnitTest.ShowResults(JSON.parse(testResults) as IResultJSON);
        console.log("");
        console.log("---------------------------");
    }

    //--------------------------------------------------
    //----------SERVER----------------------------------
    //--------------------------------------------------
    /**
     * Creates and returns server using provided html, script and style
     * - Responds with HTML on and adress except:
     * - /script
     * - /style
     * - /test-results
     * @param html HTML
     * @param script JavaScript
     * @param style Stylesheet
     */
    private CreateServer(html: string, script: string, style: string): Server
    {
        let object = this;
        return http.createServer(function (request: IncomingMessage, response: ServerResponse)
        {
            //Get request URL
            let requestUrl = url.parse(request.url, true);

            //Request contains results
            if (requestUrl.pathname == "/test-results")
            {
                //Read results
                let results = requestUrl.query.results;

                //Handle results
                object.HandleTestResults(results);

                //Respond
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(`<!DOCTYPE html><html><head><title>Test finished</title></head>`);
                response.write(`<body><h1>Test finished</h1>`);
                response.write(`<script>window.close();</script>`);
                response.write(`</body></html>`);
                response.end();

                //Stop the server
                object.StopServer();
            }

            //Request for script
            else if (requestUrl.pathname == "/script")
            {
                //Respond
                response.writeHead(200, { "Content-Type": "text/javascript" });
                response.write(script);
                response.end();
            }

            //Request for style
            else if (requestUrl.pathname == "/style")
            {
                //Respond
                response.writeHead(200, { "Content-Type": "stylesheet" });
                response.write(style);
                response.end();
            }

            //Return loaded HTML page
            else
            {
                response.writeHead(200, { "Content-Type": "text/html" });
                response.write(html);
                response.end();
            }
        });
    }

    /**
     * Reads all important files, stars timeout and tuns the server on defined port
     * */
    private RunServer()
    {
        //Start the timeout
        this.StartTimeout();

        //Create and run server
        let object = this;
        (async function ()
        {
            let html = (await object.ReadFile(object.htmlFile)) as string;
            let script: string = (await object.ReadFile(object.scriptFile)) as string;
            let style: string = (await object.ReadFile(object.styleFile)) as string;

            object.server = object.CreateServer(html, script, style);

            object.server.listen(object.port);
            console.log(`Server up and running (http://localhost:${object.port})`);
        })();
        
    }

    /**
     * Stops running server
     * */
    private StopServer()
    {
        console.log("Closing process...");
        let object = this;
        (async function ()
        {
            await object.RemoveFile(object.scriptFile);

            if (object.timeoutCoroutine)
                clearTimeout(object.timeoutCoroutine);
            if (object.browser)
            {
                object.browser.stdin.pause();
                object.browser.kill();
            }

            if (object.server)
                object.server.close();

            console.log("Process closed\n");
            process.exit(0);
        })();

    }

     /**
      * Start server timeout
      */
    private StartTimeout()
    {
        let object = this;
        this.timeoutCoroutine = setTimeout(function ()
        {
            object.StopServer();
            console.error("Server timed out");
            throw new ServerTimeoutError("Server timed out");
            process.exit(1);
        }, object.timeout);
    }

    //--------------------------------------------------
    //----------FILES AND PROMISES----------------------
    //--------------------------------------------------
    /**
     * Promise: Reads a file and returns its content
     * @param filePath File path
     */
    private ReadFile(filePath: string)
    {
        return new Promise(function (resolve: Function, reject: Function)
        {
            fs.readFile(filePath, function (error: Error, fileContent: string)
            {
                //Throw error
                if (error)
                {
                    reject(error);
                    return;
                }

                //Success
                console.log(`Read file success (${filePath})`);
                resolve(fileContent);
            });
        });
    }

    /**
     * Promise: Removes a file
     * @param filePath File path
     */
    private RemoveFile(filePath: string)
    {
        return new Promise(function (resolve: Function, reject: Function)
        {
            fs.unlink(filePath, function (error: Error)
            {
                //Throw error
                if (error)
                {
                    reject(error);
                    return;
                }

                //Success
                console.log(`Delete file success (${filePath})`);
                resolve();
            });
        });
    }

    /**
     * Promise: Wait for [ms]
     * @param time Time to wait [ms]
     */
    private Wait(time: number)
    {
        return new Promise(function (resolve: Function, reject: Function)
        {
            setTimeout(function ()
            {
                resolve();
            }, time);
        });
    }

    //--------------------------------------------------
    //----------PATHS-----------------------------------
    //--------------------------------------------------
    /**
     * Returns default path for css
     * */
    static GetCSSPath(): string
    {
        return "node_modules/@drozdik.m/web-unit-test/dist/browser/style.css";
    }
    static GetHTMLPath(): string
    {
        return "node_modules/@drozdik.m/web-unit-test/browser/index.html";
    }
}

export enum Browser
{
    Chrome,
    Edge
}