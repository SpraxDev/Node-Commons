"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_os_1 = __importDefault(require("node:os"));
class UserAgentGenerator {
    static generate(appName, appVersion, includeSystemInfo = true, infoOrAppUrl) {
        let userAgent = `${appName}/${appVersion}`;
        if (includeSystemInfo) {
            userAgent += ` (${node_os_1.default.type()}; ${process.arch}; ${process.platform})`;
        }
        if (infoOrAppUrl != null) {
            userAgent += ` (+${infoOrAppUrl})`;
        }
        return userAgent;
    }
}
exports.default = UserAgentGenerator;
//# sourceMappingURL=UserAgentGenerator.js.map