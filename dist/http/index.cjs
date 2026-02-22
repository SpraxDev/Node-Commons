Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
const require_UserAgentGenerator = require('../UserAgentGenerator-B8SgunEG.cjs');

//#region src/http/index.ts
var http_exports = /* @__PURE__ */ require_UserAgentGenerator.__exportAll({
	HttpClient: () => require_UserAgentGenerator.HttpClient,
	HttpClientEvents: () => require_UserAgentGenerator.HttpClientEvents_exports,
	HttpRequest: () => require_UserAgentGenerator.HttpRequest,
	HttpResponse: () => require_UserAgentGenerator.HttpResponse,
	UndiciHttpClient: () => require_UserAgentGenerator.UndiciHttpClient,
	UserAgentGenerator: () => require_UserAgentGenerator.UserAgentGenerator
});

//#endregion
exports.HttpClient = require_UserAgentGenerator.HttpClient;
Object.defineProperty(exports, 'HttpClientEvents', {
  enumerable: true,
  get: function () {
    return require_UserAgentGenerator.HttpClientEvents_exports;
  }
});
exports.HttpRequest = require_UserAgentGenerator.HttpRequest;
exports.HttpResponse = require_UserAgentGenerator.HttpResponse;
exports.UndiciHttpClient = require_UserAgentGenerator.UndiciHttpClient;
exports.UserAgentGenerator = require_UserAgentGenerator.UserAgentGenerator;
Object.defineProperty(exports, 'http_exports', {
  enumerable: true,
  get: function () {
    return http_exports;
  }
});
//# sourceMappingURL=index.cjs.map