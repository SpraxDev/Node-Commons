"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMAIL_PATTERN = exports.HOSTNAME_PATTERN = void 0;
const net_1 = __importDefault(require("net"));
const StringUtils_1 = __importDefault(require("./StringUtils"));
exports.HOSTNAME_PATTERN = /(?=^.{4,253}$)(^((?!-)[a-z0-9-]{0,62}[a-z0-9]\.)+[a-z]{2,63}\.?$)/i;
exports.EMAIL_PATTERN = /^[a-z0-9.!#$%&'*+/="?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;
class StringValidators {
    static looksLikeHttpUrl(url) {
        // Protocol
        if (!/^https?:\/\/.*$/i.test(url)) {
            return { valid: false, issue: 'protocol' };
        }
        let lowerHost = url.toLowerCase().substring(url.indexOf('/') + 2);
        // Path
        if (lowerHost.indexOf('/') != -1) {
            lowerHost = lowerHost.substring(0, lowerHost.indexOf('/'));
        }
        // Port
        if (lowerHost.lastIndexOf(':') != -1) {
            const portStr = lowerHost.substring(lowerHost.lastIndexOf(':') + 1);
            const port = parseInt(portStr, 10);
            lowerHost = lowerHost.substring(0, lowerHost.lastIndexOf(':'));
            if (!StringUtils_1.default.isNumeric(portStr) || port <= 0 || port > 65535 /* unsigned int2 */) {
                return { valid: false, issue: 'port' };
            }
        }
        if (net_1.default.isIPv4(lowerHost) || net_1.default.isIPv6(lowerHost) || lowerHost == 'localhost') {
            return { valid: true };
        }
        const valid = exports.HOSTNAME_PATTERN.test(lowerHost);
        if (valid) {
            return { valid };
        }
        return { valid, issue: 'hostname' };
    }
    static looksLikeValidEmail(email) {
        return exports.EMAIL_PATTERN.test(email);
    }
}
exports.default = StringValidators;
//# sourceMappingURL=StringValidators.js.map