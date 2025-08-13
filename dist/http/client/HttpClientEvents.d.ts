import type HttpRequest from '../HttpRequest';
import type HttpResponse from '../HttpResponse';
export type HttpClientEventType = 'preRequest' | 'postRequest';
export declare class PreRequestEvent {
    readonly request: HttpRequest;
    constructor(request: HttpRequest);
}
export declare class PostRequestEvent {
    readonly request: HttpRequest;
    readonly response: HttpResponse;
    constructor(request: HttpRequest, response: HttpResponse);
}
//# sourceMappingURL=HttpClientEvents.d.ts.map