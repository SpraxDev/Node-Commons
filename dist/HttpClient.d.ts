/// <reference types="node" />
import superagent from 'superagent';
export declare type HttpClientOptions = {
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
    }): Promise<superagent.Response & {
        body: Buffer;
    }>;
    post(url: string, headers?: {
        [key: string]: string;
    }, body?: string | object): Promise<superagent.Response & {
        body: Buffer;
    }>;
    protected applyDefaults(req: superagent.Request, headers?: {
        [key: string]: string;
    }, body?: string | object): superagent.Request;
    static generateUserAgent(appName: string, appVersion: string, includeSystemInfo?: boolean, appUrl?: string): string;
    protected static getReqHandler(resolve: Function, reject: Function): (err: any, res: superagent.Response) => void;
}
//# sourceMappingURL=HttpClient.d.ts.map