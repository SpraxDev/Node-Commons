"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRequestEvent = exports.PreRequestEvent = void 0;
class PreRequestEvent {
    request;
    constructor(request) {
        this.request = request;
    }
}
exports.PreRequestEvent = PreRequestEvent;
class PostRequestEvent {
    request;
    response;
    constructor(request, response) {
        this.request = request;
        this.response = response;
    }
}
exports.PostRequestEvent = PostRequestEvent;
//# sourceMappingURL=HttpClientEvents.js.map