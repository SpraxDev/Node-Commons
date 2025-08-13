"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpResponse {
    statusCode;
    headers;
    body;
    /**
     * They keys of the `headers`-Map are expected to always be in lowercase.
     */
    constructor(statusCode, headers, body) {
        this.statusCode = statusCode;
        this.headers = headers;
        this.body = body;
    }
    get ok() {
        return this.statusCode >= 200 && this.statusCode < 300;
    }
    getHeader(key) {
        return this.headers.get(key.toLowerCase()) ?? null;
    }
    parseBodyAsText() {
        return this.body.toString('utf8');
    }
    parseBodyAsJson() {
        return JSON.parse(this.parseBodyAsText());
    }
    static async fromUndiciResponse(response) {
        return new HttpResponse(response.statusCode, this.parseHeaders(response.headers), Buffer.from(await response.body.arrayBuffer()));
    }
    static parseHeaders(headers) {
        const parsedHeaders = new Map();
        for (const [key, value] of Object.entries(headers)) {
            if (value != null) {
                parsedHeaders.set(key.toLowerCase(), value);
            }
        }
        return parsedHeaders;
    }
}
exports.default = HttpResponse;
//# sourceMappingURL=HttpResponse.js.map