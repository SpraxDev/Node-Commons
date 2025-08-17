import { __export } from "./chunk-BAaT8Ki0.js";
import { http_exports } from "./http-UqpGCz5x.js";
import Net from "node:net";

//#region src/strings/StringUtils.ts
var StringUtils_exports = {};
__export(StringUtils_exports, { default: () => StringUtils });
var StringUtils = class {
	/**
	* Return true if the given string only contains number characters.
	*/
	static isNumeric(str) {
		return /^\d+$/.test(str);
	}
	/**
	* Arguments are formatted as `{key}` inside a string and may not be nested.
	* The arguments may be provided as an array which means that `key` is equivalent to the element's index.
	* If the arguments are provided as key-value pairs, `key` is equivalent to the key.
	*
	* If you provide an array of arguments,
	* you do not need to worry about escaping non-numeric keys in the string (e.g. `{name}`).
	*
	*
	* Arguments may be escaped using double braces:
	* `{{key}}` will be replaced with `{key}` not touching `key` inside the braces.
	*
	*
	* By default, found keys which cannot be mapped to an argument will be skipped:
	* `('{0}{1}', ['a'])` will return `'a{1}'`.
	* This behaviour can be changed by setting the `fallbackValue`.
	*
	* In the example above a `fallbackValue` of `'.'` would return `'a.'` instead.
	*
	*
	* **Example usage**
	*
	* ```
	* formatStr('{0} ({0}) is {{0}} **{2}** using {1}!', ['Sprax', 'TypeScript']);
	* // Sprax (Sprax) is {0} **{2}** using TypeScript!
	*
	* formatStr('{name} ({name}) is {{name}} **{2}** using {uses}!', {name: 'Sprax', uses: 'TypeScript'});
	* // Sprax (Sprax) is {name} **{2}** using TypeScript!
	* ```
	*
	* @param str The string to apply the replacing
	* @param args An array or key-value pairs of arguments to replace
	* @param fallbackValue The string to use if an index is not present. `undefined` means to skip it
	*/
	static format(str, args, fallbackValue) {
		const regex = Array.isArray(args) ? /{{|}}|{(\d+)}/g : /{{|}}|{(.+?)}/g;
		return str.replace(regex, (curlyBracket, key) => {
			if (curlyBracket == "{{") {
				return "{";
			}
			if (curlyBracket == "}}") {
				return "}";
			}
			return args[key] ?? fallbackValue ?? `{${key}}`;
		});
	}
};

//#endregion
//#region src/strings/StringValidators.ts
var StringValidators_exports = {};
__export(StringValidators_exports, {
	EMAIL_PATTERN: () => EMAIL_PATTERN,
	HOSTNAME_PATTERN: () => HOSTNAME_PATTERN,
	default: () => StringValidators
});
const HOSTNAME_PATTERN = /(?=^.{4,253}$)(^((?!-)[a-z0-9-]{0,62}[a-z0-9]\.)+[a-z]{2,63}\.?$)/i;
const EMAIL_PATTERN = /^[a-z0-9.!#$%&'*+/="?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;
var StringValidators = class {
	static looksLikeHttpUrl(url) {
		if (!/^https?:\/\/.*$/i.test(url)) {
			return {
				valid: false,
				issue: "protocol"
			};
		}
		let lowerHost = url.toLowerCase().substring(url.indexOf("/") + 2);
		if (lowerHost.indexOf("/") != -1) {
			lowerHost = lowerHost.substring(0, lowerHost.indexOf("/"));
		}
		if (lowerHost.lastIndexOf(":") != -1) {
			const portStr = lowerHost.substring(lowerHost.lastIndexOf(":") + 1);
			const port = parseInt(portStr, 10);
			lowerHost = lowerHost.substring(0, lowerHost.lastIndexOf(":"));
			if (!StringUtils.isNumeric(portStr) || port <= 0 || port > 65535) {
				return {
					valid: false,
					issue: "port"
				};
			}
		}
		if (Net.isIPv4(lowerHost) || Net.isIPv6(lowerHost) || lowerHost == "localhost") {
			return { valid: true };
		}
		const valid = HOSTNAME_PATTERN.test(lowerHost);
		if (valid) {
			return { valid };
		}
		return {
			valid,
			issue: "hostname"
		};
	}
	static looksLikeValidEmail(email) {
		return EMAIL_PATTERN.test(email);
	}
};

//#endregion
export { StringUtils_exports as StringUtils, StringValidators_exports as StringValidators, http_exports as http };
//# sourceMappingURL=index.js.map