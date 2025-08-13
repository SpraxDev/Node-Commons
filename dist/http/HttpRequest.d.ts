import type { FullRequestOptions } from './client/HttpClient';
export default class HttpRequest {
    url: string;
    options: FullRequestOptions;
    readonly requestFlowPersistentData: Record<string, unknown>;
    constructor(url: string, options: FullRequestOptions, requestFlowPersistentData?: Record<string, unknown>);
}
//# sourceMappingURL=HttpRequest.d.ts.map