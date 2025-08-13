"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClientEvents_1 = require("./HttpClientEvents");
class HttpClient {
    eventListener = { pre: [], post: [] };
    async emitEvent(event) {
        let listener;
        if (event instanceof HttpClientEvents_1.PreRequestEvent) {
            listener = this.eventListener.pre;
        }
        else {
            listener = this.eventListener.post;
        }
        for (const listenerFunction of listener) {
            await listenerFunction(event);
        }
    }
    addEventListener(event, callback) {
        if (event === 'preRequest') {
            this.eventListener.pre.push(callback);
        }
        else if (event === 'postRequest') {
            this.eventListener.post.push(callback);
        }
        throw new Error(`Unknown event type: ${event}`);
    }
}
exports.default = HttpClient;
//# sourceMappingURL=HttpClient.js.map