import { HandleSuccessfulServerResponse, HandleUnsuccessfulServerResponse } from "./CommonServerHandlers";

export function HandleResponseAsOfflineCacheWorker(fetchRequest: FetchEvent)
{
    //HANDLE GET REQUEST
    fetchRequest.respondWith(
        fetch(fetchRequest.request)
            .then(function (fetchResponse: Response)
            {
                return HandleSuccessfulServerResponse(fetchRequest.request, fetchResponse);
            })
            .catch(function (fetchResponse: Response)
            {
                return HandleUnsuccessfulServerResponse(fetchRequest.request, fetchResponse);
            })
    );
}