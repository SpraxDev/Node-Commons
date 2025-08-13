import type HttpRequest from '../HttpRequest';
import type HttpResponse from '../HttpResponse';

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
