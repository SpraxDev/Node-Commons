import type HttpRequest from '../HttpRequest.ts';
import HttpResponse from '../HttpResponse.ts';
import { HttpClientEventType, PostRequestEvent, PreRequestEvent } from './HttpClientEvents.ts';

export type BaseRequestOptions = {
  headers?: { [key: string]: string };
}

export interface GetRequestOptions extends BaseRequestOptions {
  query?: { [key: string]: string | number | boolean };
}

export interface PostRequestOptions extends BaseRequestOptions {
  body?: Buffer | string;
}

export interface FullRequestOptions extends BaseRequestOptions, GetRequestOptions, PostRequestOptions {
  method: 'GET' | 'POST';
}

export default abstract class HttpClient {
  protected readonly eventListener: {
    pre: ((event: PreRequestEvent) => Promise<void> | void)[],
    post: ((event: PostRequestEvent) => Promise<void> | void)[],
  } = { pre: [], post: [] };

  public abstract get(url: string, options?: GetRequestOptions): Promise<HttpResponse>;

  public abstract post(url: string, options?: PostRequestOptions): Promise<HttpResponse>;

  protected abstract request(request: HttpRequest): Promise<HttpResponse>;

  protected async emitEvent(event: PreRequestEvent | PostRequestEvent): Promise<void> {
    let listener: ((event: any) => Promise<void> | void)[];
    if (event instanceof PreRequestEvent) {
      listener = this.eventListener.pre;
    } else {
      listener = this.eventListener.post;
    }

    for (const listenerFunction of listener) {
      await listenerFunction(event);
    }
  }

  public addEventListener(event: 'preRequest', callback: (event: PreRequestEvent) => void | Promise<void>): void;
  public addEventListener(event: 'postRequest', callback: (event: PostRequestEvent) => void | Promise<void>): void;
  public addEventListener(event: HttpClientEventType, callback: ((event: PreRequestEvent) => void | Promise<void>) | ((event: PostRequestEvent) => void | Promise<void>)): void {
    if (event === 'preRequest') {
      this.eventListener.pre.push(callback as any);
      return;
    } else if (event === 'postRequest') {
      this.eventListener.post.push(callback as any);
      return;
    }

    throw new Error(`Unknown event type: ${event}`);
  }
}
