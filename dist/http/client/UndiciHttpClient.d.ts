import * as Undici from 'undici';
import HttpRequest from '../HttpRequest';
import HttpResponse from '../HttpResponse';
import HttpClient, { type GetRequestOptions, type PostRequestOptions } from './HttpClient';
export default class UndiciHttpClient extends HttpClient {
    protected userAgent: string;
    private agent?;
    constructor(userAgent: string);
    get(url: string, options?: GetRequestOptions): Promise<HttpResponse>;
    post(url: string, options?: PostRequestOptions): Promise<HttpResponse>;
    protected request(request: HttpRequest): Promise<HttpResponse>;
    protected selectDispatcher(_request: HttpRequest): Undici.Dispatcher;
    protected getDefaultAgentOptions(): Undici.Agent.Options;
    private mergeWithDefaultHeaders;
}
//# sourceMappingURL=UndiciHttpClient.d.ts.map