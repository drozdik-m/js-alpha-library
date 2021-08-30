

export class FetchHelper
{
    /**
     * Skips all except an inputted method
     */
    static RespondWithServer(fetchRequest: FetchEvent)
    {
        //Pass the fetch request and return server's reponse
        fetchRequest.respondWith(
            fetch(fetchRequest.request).catch(function (error: any)
            {
                console.error("Service worker: Fetch to " + fetchRequest.request + " failed:");
                console.error(error)
            }).then(function (fetchResponse: Response)
            {
                return fetchResponse;
            })
        );
    }

}


