"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const superagent_1 = __importDefault(require("superagent"));
class HttpClient {
    userAgent;
    agent;
    options;
    constructor(userAgent, options = {}) {
        this.userAgent = userAgent;
        this.options = options;
        this.agent = options.dontUseGlobalAgent ? superagent_1.default.agent() : superagent_1.default;
    }
    async get(url, headers) {
        return new Promise((resolve, reject) => {
            this.applyDefaults(this.agent.get(url), headers)
                .end(HttpClient.getReqHandler(resolve, reject));
        });
    }
    async post(url, headers, body) {
        return new Promise((resolve, reject) => {
            this.applyDefaults(this.agent.post(url), headers, body)
                .end(HttpClient.getReqHandler(resolve, reject));
        });
    }
    applyDefaults(req, headers, body) {
        req.set('User-Agent', this.userAgent);
        if (this.options.defaultHeaders) {
            for (const headerKey in this.options.defaultHeaders) {
                req.set(headerKey, this.options.defaultHeaders[headerKey]);
            }
        }
        if (headers) {
            for (const headerKey in headers) {
                req.set(headerKey, headers[headerKey]);
            }
        }
        // Force the response body to be a Buffer
        req.buffer(true)
            .parse(superagent_1.default.parse['application/octet-stream']);
        if (body) {
            req.send(body);
        }
        return req;
    }
    static generateUserAgent(appName, appVersion, includeSystemInfo = true, appUrl) {
        let userAgent = `${appName}/${appVersion}`;
        if (includeSystemInfo) {
            userAgent += ` (${os_1.default.type()}; ${process.arch}; ${process.platform})`;
        }
        if (appUrl != null) {
            userAgent += ` (+${appUrl})`;
        }
        return userAgent;
    }
    static getReqHandler(resolve, reject) {
        return (err, res) => {
            if (err && !res)
                return reject(err); // An error occurred (HTTP errors are excluded! 404 is not an error in my eyes as the request itself was successful)
            return resolve(res);
        };
    }
}
exports.default = HttpClient;
//# sourceMappingURL=HttpClient.js.map