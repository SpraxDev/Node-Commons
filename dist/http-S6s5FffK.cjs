//#region rolldown:runtime
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));

//#endregion
const undici = __toESM(require("undici"));
const node_os = __toESM(require("node:os"));

//#region src/http/HttpRequest.ts
var HttpRequest = class {
	constructor(url, options, requestFlowPersistentData = {}) {
		this.url = url;
		this.options = options;
		this.requestFlowPersistentData = requestFlowPersistentData;
	}
};

//#endregion
//#region src/http/HttpResponse.ts
var HttpResponse = class HttpResponse {
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
		return this.body.toString("utf8");
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
};

//#endregion
//#region src/http/client/HttpClientEvents.ts
var HttpClientEvents_exports = {};
__export(HttpClientEvents_exports, {
	PostRequestEvent: () => PostRequestEvent,
	PreRequestEvent: () => PreRequestEvent
});
var PreRequestEvent = class {
	constructor(request) {
		this.request = request;
	}
};
var PostRequestEvent = class {
	constructor(request, response) {
		this.request = request;
		this.response = response;
	}
};

//#endregion
//#region src/http/client/HttpClient.ts
var HttpClient = class {
	eventListener = {
		pre: [],
		post: []
	};
	async emitEvent(event) {
		let listener;
		if (event instanceof PreRequestEvent) {
			listener = this.eventListener.pre;
		} else {
			listener = this.eventListener.post;
		}
		for (const listenerFunction of listener) {
			await listenerFunction(event);
		}
	}
	addEventListener(event, callback) {
		if (event === "preRequest") {
			this.eventListener.pre.push(callback);
			return;
		} else if (event === "postRequest") {
			this.eventListener.post.push(callback);
			return;
		}
		throw new Error(`Unknown event type: ${event}`);
	}
};

//#endregion
//#region src/http/client/UndiciHttpClient.ts
var UndiciHttpClient = class extends HttpClient {
	agent;
	constructor(userAgent) {
		super();
		this.userAgent = userAgent;
	}
	get(url, options) {
		return this.request(new HttpRequest(url, {
			...options,
			method: "GET"
		}));
	}
	post(url, options) {
		return this.request(new HttpRequest(url, {
			...options,
			method: "POST"
		}));
	}
	async request(request) {
		await this.emitEvent(new PreRequestEvent(request));
		const dispatcher = this.selectDispatcher(request);
		const response = await undici.request(request.url, {
			dispatcher,
			method: request.options.method,
			query: request.options.query,
			body: request.options.body,
			headers: this.mergeWithDefaultHeaders(request.options.headers)
		});
		const httpResponse = await HttpResponse.fromUndiciResponse(response);
		await this.emitEvent(new PostRequestEvent(request, httpResponse));
		return httpResponse;
	}
	selectDispatcher(_request) {
		if (this.agent === undefined) {
			this.agent = new undici.Agent(this.getDefaultAgentOptions());
		}
		return this.agent;
	}
	getDefaultAgentOptions() {
		return {
			maxResponseSize: 20 * 1024 * 1024,
			bodyTimeout: 12e3,
			headersTimeout: 12e3
		};
	}
	mergeWithDefaultHeaders(headers) {
		const mergedHeaders = new Map();
		mergedHeaders.set("user-agent", this.userAgent);
		mergedHeaders.set("accept", "application/json");
		if (headers != null) {
			for (const [key, value] of Object.entries(headers)) {
				mergedHeaders.set(key.toLowerCase(), value);
			}
		}
		return mergedHeaders;
	}
};

//#endregion
//#region src/http/util/UserAgentGenerator.ts
var UserAgentGenerator = class {
	static generate(appName, appVersion, includeSystemInfo = true, infoOrAppUrl) {
		let userAgent = `${appName}/${appVersion}`;
		if (includeSystemInfo) {
			userAgent += ` (${node_os.default.type()}; ${process.arch}; ${process.platform})`;
		}
		if (infoOrAppUrl != null) {
			userAgent += ` (+${infoOrAppUrl})`;
		}
		return userAgent;
	}
};

//#endregion
//#region src/http/index.ts
var http_exports = {};
__export(http_exports, {
	HttpClient: () => HttpClient,
	HttpClientEvents: () => HttpClientEvents_exports,
	HttpRequest: () => HttpRequest,
	HttpResponse: () => HttpResponse,
	UndiciHttpClient: () => UndiciHttpClient,
	UserAgentGenerator: () => UserAgentGenerator
});

//#endregion
Object.defineProperty(exports, 'HttpClient', {
  enumerable: true,
  get: function () {
    return HttpClient;
  }
});
Object.defineProperty(exports, 'HttpClientEvents_exports', {
  enumerable: true,
  get: function () {
    return HttpClientEvents_exports;
  }
});
Object.defineProperty(exports, 'HttpRequest', {
  enumerable: true,
  get: function () {
    return HttpRequest;
  }
});
Object.defineProperty(exports, 'HttpResponse', {
  enumerable: true,
  get: function () {
    return HttpResponse;
  }
});
Object.defineProperty(exports, 'UndiciHttpClient', {
  enumerable: true,
  get: function () {
    return UndiciHttpClient;
  }
});
Object.defineProperty(exports, 'UserAgentGenerator', {
  enumerable: true,
  get: function () {
    return UserAgentGenerator;
  }
});
Object.defineProperty(exports, '__export', {
  enumerable: true,
  get: function () {
    return __export;
  }
});
Object.defineProperty(exports, '__toESM', {
  enumerable: true,
  get: function () {
    return __toESM;
  }
});
Object.defineProperty(exports, 'http_exports', {
  enumerable: true,
  get: function () {
    return http_exports;
  }
});
//# sourceMappingURL=http-S6s5FffK.cjs.map