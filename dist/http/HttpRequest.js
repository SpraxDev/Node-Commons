"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpRequest {
    url;
    options;
    requestFlowPersistentData;
    constructor(url, options, requestFlowPersistentData = {}) {
        this.url = url;
        this.options = options;
        this.requestFlowPersistentData = requestFlowPersistentData;
    }
}
exports.default = HttpRequest;
//# sourceMappingURL=HttpRequest.js.map