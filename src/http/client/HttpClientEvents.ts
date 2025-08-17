import type HttpRequest from '../HttpRequest.ts';
import type HttpResponse from '../HttpResponse.ts';

export type HttpClientEventType = 'preRequest' | 'postRequest';

export class PreRequestEvent {
  constructor(
    public readonly request: HttpRequest,
  ) {
  }
}

export class PostRequestEvent {
  constructor(
    public readonly request: HttpRequest,
    public readonly response: HttpResponse,
  ) {
  }
}
