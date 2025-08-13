import * as Undici from 'undici';
import HttpRequest from '../HttpRequest';
import HttpResponse from '../HttpResponse';
import HttpClient, { type FullRequestOptions, type GetRequestOptions, type PostRequestOptions } from './HttpClient';
import { PostRequestEvent, PreRequestEvent } from './HttpClientEvents';

export default class UndiciHttpClient extends HttpClient {
  private agent?: Undici.Dispatcher;

  constructor(
    protected userAgent: string,
  ) {
    super();
  }

  get(url: string, options?: GetRequestOptions): Promise<HttpResponse> {
    return this.request(new HttpRequest(url, {
      ...options,
      method: 'GET',
    }));
  }

  post(url: string, options?: PostRequestOptions): Promise<HttpResponse> {
    return this.request(new HttpRequest(url, {
      ...options,
      method: 'POST',
    }));
  }

  protected async request(request: HttpRequest): Promise<HttpResponse> {
    await this.emitEvent(new PreRequestEvent(request));

    const dispatcher = this.selectDispatcher(request);
    const response = await Undici.request(request.url, {
      dispatcher,

      method: request.options.method,
      query: request.options.query,
      body: request.options.body,
      headers: this.mergeWithDefaultHeaders(request.options.headers),
    });

    const httpResponse = await HttpResponse.fromUndiciResponse(response);
    await this.emitEvent(new PostRequestEvent(request, httpResponse));
    return httpResponse;
  }

  protected selectDispatcher(_request: HttpRequest): Undici.Dispatcher {
    if (this.agent === undefined) {
      this.agent = new Undici.Agent(this.getDefaultAgentOptions());
    }
    return this.agent;
  }

  protected getDefaultAgentOptions(): Undici.Agent.Options {
    return {
      maxResponseSize: 20 * 1024 * 1024 /* 20 MiB */,
      bodyTimeout: 12_000,
      headersTimeout: 12_000,
    };
  }

  private mergeWithDefaultHeaders(headers?: FullRequestOptions['headers']): Map<string, string | string[]> {
    const mergedHeaders = new Map<string, string | string[]>();
    mergedHeaders.set('user-agent', this.userAgent);
    mergedHeaders.set('accept', 'application/json');

    if (headers != null) {
      for (const [key, value] of Object.entries(headers)) {
        mergedHeaders.set(key.toLowerCase(), value);
      }
    }
    return mergedHeaders;
  }
}
