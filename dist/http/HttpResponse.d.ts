import type * as Undici from 'undici';
export default class HttpResponse {
    readonly statusCode: number;
    readonly headers: Map<string, string | string[]>;
    readonly body: Buffer;
    /**
     * They keys of the `headers`-Map are expected to always be in lowercase.
     */
    constructor(statusCode: number, headers: Map<string, string | string[]>, body: Buffer);
    get ok(): boolean;
    getHeader(key: string): string | null;
    getHeader(key: 'Set-Cookie'): string[] | null;
    parseBodyAsText(): string;
    parseBodyAsJson<T>(): T;
    static fromUndiciResponse(response: Undici.Dispatcher.ResponseData): Promise<HttpResponse>;
    private static parseHeaders;
}
//# sourceMappingURL=HttpResponse.d.ts.map