"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Undici = __importStar(require("undici"));
const HttpRequest_1 = __importDefault(require("../HttpRequest"));
const HttpResponse_1 = __importDefault(require("../HttpResponse"));
const HttpClient_1 = __importDefault(require("./HttpClient"));
const HttpClientEvents_1 = require("./HttpClientEvents");
class UndiciHttpClient extends HttpClient_1.default {
    userAgent;
    agent;
    constructor(userAgent) {
        super();
        this.userAgent = userAgent;
    }
    get(url, options) {
        return this.request(new HttpRequest_1.default(url, {
            ...options,
            method: 'GET',
        }));
    }
    post(url, options) {
        return this.request(new HttpRequest_1.default(url, {
            ...options,
            method: 'POST',
        }));
    }
    async request(request) {
        await this.emitEvent(new HttpClientEvents_1.PreRequestEvent(request));
        const dispatcher = this.selectDispatcher(request);
        const response = await Undici.request(request.url, {
            dispatcher,
            method: request.options.method,
            query: request.options.query,
            body: request.options.body,
            headers: this.mergeWithDefaultHeaders(request.options.headers),
        });
        const httpResponse = await HttpResponse_1.default.fromUndiciResponse(response);
        await this.emitEvent(new HttpClientEvents_1.PostRequestEvent(request, httpResponse));
        return httpResponse;
    }
    selectDispatcher(_request) {
        if (this.agent === undefined) {
            this.agent = new Undici.Agent(this.getDefaultAgentOptions());
        }
        return this.agent;
    }
    getDefaultAgentOptions() {
        return {
            maxResponseSize: 20 * 1024 * 1024 /* 20 MiB */,
            bodyTimeout: 12_000,
            headersTimeout: 12_000,
        };
    }
    mergeWithDefaultHeaders(headers) {
        const mergedHeaders = new Map();
        mergedHeaders.set('user-agent', this.userAgent);
        mergedHeaders.set('accept', 'application/json');
        if (headers != null) {
            for (const [key, value] of Object.entries(headers)) {
                mergedHeaders.set(key.toLowerCase(), value);
            }
        }
        return mergedHeaders;
    }
}
exports.default = UndiciHttpClient;
//# sourceMappingURL=UndiciHttpClient.js.map