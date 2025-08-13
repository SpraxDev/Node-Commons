import type { FullRequestOptions } from './client/HttpClient';

export default class HttpRequest {
  constructor(
    public url: string,
    public options: FullRequestOptions,
    public readonly requestFlowPersistentData: Record<string, unknown> = {},
  ) {
  }
}
