import type HttpRequest from '../HttpRequest';
import HttpResponse from '../HttpResponse.js';
import { PostRequestEvent, PreRequestEvent } from './HttpClientEvents';
export type BaseRequestOptions = {
    headers?: {
        [key: string]: string;
    };
};
export interface GetRequestOptions extends BaseRequestOptions {
    query?: {
        [key: string]: string | number | boolean;
    };
}
export interface PostRequestOptions extends BaseRequestOptions {
    body?: Buffer | string;
}
export interface FullRequestOptions extends BaseRequestOptions, GetRequestOptions, PostRequestOptions {
    method: 'GET' | 'POST';
}
export default abstract class HttpClient {
    protected readonly eventListener: {
        pre: ((event: PreRequestEvent) => Promise<void> | void)[];
        post: ((event: PostRequestEvent) => Promise<void> | void)[];
    };
    abstract get(url: string, options?: GetRequestOptions): Promise<HttpResponse>;
    abstract post(url: string, options?: PostRequestOptions): Promise<HttpResponse>;
    protected abstract request(request: HttpRequest): Promise<HttpResponse>;
    protected emitEvent(event: PreRequestEvent | PostRequestEvent): Promise<void>;
    addEventListener(event: 'preRequest', callback: (event: PreRequestEvent) => void | Promise<void>): void;
    addEventListener(event: 'postRequest', callback: (event: PostRequestEvent) => void | Promise<void>): void;
}
//# sourceMappingURL=HttpClient.d.ts.map