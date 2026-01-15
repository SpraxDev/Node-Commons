import "node:module";
import * as Undici from "undici";

//#region rolldown:runtime
//#endregion
//#region src/http/HttpResponse.d.ts
declare class HttpResponse {
  readonly statusCode: number;
  readonly headers: Map<string, string | string[]>;
  readonly body: Buffer;
  /**
  * They keys of the `headers`-Map are expected to always be in lowercase.
  */
  constructor(statusCode: number, headers: Map<string, string | string[]>, body: Buffer);
  get ok(): boolean;
  getHeader(key: string): string | null;
  getHeader(key: "Set-Cookie"): string[] | null;
  parseBodyAsText(): string;
  parseBodyAsJson<T>(): T;
  static fromUndiciResponse(response: Undici.Dispatcher.ResponseData): Promise<HttpResponse>;
  private static parseHeaders;
}
declare namespace HttpClientEvents_d_exports {
  export { HttpClientEventType, PostRequestEvent, PreRequestEvent };
}
type HttpClientEventType = "preRequest" | "postRequest";
declare class PreRequestEvent {
  readonly request: HttpRequest;
  constructor(request: HttpRequest);
}
declare class PostRequestEvent {
  readonly request: HttpRequest;
  readonly response: HttpResponse;
  constructor(request: HttpRequest, response: HttpResponse);
}
//#endregion
//#region src/http/client/HttpClient.d.ts
type BaseRequestOptions = {
  headers?: {
    [key: string]: string;
  };
};
interface GetRequestOptions extends BaseRequestOptions {
  query?: {
    [key: string]: string | number | boolean;
  };
}
interface PostRequestOptions extends BaseRequestOptions {
  body?: Buffer | string;
}
interface FullRequestOptions extends BaseRequestOptions, GetRequestOptions, PostRequestOptions {
  method: "GET" | "POST";
}
declare abstract class HttpClient {
  protected readonly eventListener: {
    pre: ((event: PreRequestEvent) => Promise<void> | void)[];
    post: ((event: PostRequestEvent) => Promise<void> | void)[];
  };
  abstract get(url: string, options?: GetRequestOptions): Promise<HttpResponse>;
  abstract post(url: string, options?: PostRequestOptions): Promise<HttpResponse>;
  protected abstract request(request: HttpRequest): Promise<HttpResponse>;
  protected emitEvent(event: PreRequestEvent | PostRequestEvent): Promise<void>;
  addEventListener(event: "preRequest", callback: (event: PreRequestEvent) => void | Promise<void>): void;
  addEventListener(event: "postRequest", callback: (event: PostRequestEvent) => void | Promise<void>): void;
}
//#endregion
//#region src/http/HttpRequest.d.ts
declare class HttpRequest {
  url: string;
  options: FullRequestOptions;
  readonly requestFlowPersistentData: Record<string, unknown>;
  constructor(url: string, options: FullRequestOptions, requestFlowPersistentData?: Record<string, unknown>);
}
//#endregion
//#region src/http/client/UndiciHttpClient.d.ts
declare class UndiciHttpClient extends HttpClient {
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
//#endregion
//#region src/http/util/UserAgentGenerator.d.ts
declare class UserAgentGenerator {
  static generate(appName: string, appVersion: string, includeSystemInfo?: boolean, infoOrAppUrl?: string): string;
}
declare namespace index_d_exports {
  export { FullRequestOptions, GetRequestOptions, HttpClient, HttpClientEvents_d_exports as HttpClientEvents, HttpRequest, HttpResponse, PostRequestOptions, UndiciHttpClient, UserAgentGenerator };
}
//#endregion
export { FullRequestOptions as a, PostRequestOptions as c, __exportAll as d, HttpRequest as i, HttpClientEvents_d_exports as l, UserAgentGenerator as n, GetRequestOptions as o, UndiciHttpClient as r, HttpClient as s, index_d_exports as t, HttpResponse as u };
//# sourceMappingURL=index-e8HLBmu3.d.cts.map