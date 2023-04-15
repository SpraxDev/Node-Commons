/// <reference types="node" />
import superagent from 'superagent';
export type HttpResponse = {
    accepted: boolean;
    badRequest: boolean;
    body: Buffer;
    charset: string;
    clientError: boolean;
    error: false | superagent.HTTPError;
    files: any;
    forbidden: boolean;
    get(header: string): string;
    get(header: 'Set-Cookie'): string[];
    header: any;
    headers: any;
    info: boolean;
    links: Record<string, string>;
    noContent: boolean;
    notAcceptable: boolean;
    notFound: boolean;
    ok: boolean;
    redirect: boolean;
    serverError: boolean;
    status: number;
    statusCode: number;
    statusType: number;
    text: string;
    type: string;
    unauthorized: boolean;
    xhr: any;
    redirects: string[];
};
export type HttpClientOptions = {
    dontUseGlobalAgent?: boolean;
    defaultHeaders?: {
        [key: string]: string;
    };
};
export default class HttpClient {
    readonly userAgent: string;
    readonly agent: superagent.SuperAgentStatic;
    readonly options: HttpClientOptions;
    constructor(userAgent: string, options?: HttpClientOptions);
    get(url: string, headers?: {
        [key: string]: string;
    }): Promise<HttpResponse>;
    post(url: string, headers?: {
        [key: string]: string;
    }, body?: string | object): Promise<HttpResponse>;
    protected applyDefaults(req: superagent.Request, headers?: {
        [key: string]: string;
    }, body?: string | object): superagent.Request;
    static generateUserAgent(appName: string, appVersion: string, includeSystemInfo?: boolean, appUrl?: string): string;
    protected static getReqHandler(resolve: Function, reject: Function): (err: any, res: superagent.Response) => void;
}
//# sourceMappingURL=HttpClient.d.ts.map