import "./UserAgentGenerator-DHjh4Duu.mjs";
import { t as index_d_exports } from "./http/index.mjs";

//#region src/strings/StringUtils.d.ts
declare namespace StringUtils_d_exports {
  export { StringUtils as default };
}
declare class StringUtils {
  /**
  * Return true if the given string only contains number characters.
  */
  static isNumeric(str: string): boolean;
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
  static format(str: string, args: string[] | {
    [variable: string]: string;
  }, fallbackValue?: string): string;
}
declare namespace StringValidators_d_exports {
  export { EMAIL_PATTERN, HOSTNAME_PATTERN, HttpCheckResult, StringValidators as default };
}
declare const HOSTNAME_PATTERN: RegExp;
declare const EMAIL_PATTERN: RegExp;
type HttpCheckResult = {
  valid: boolean;
  issue?: "hostname" | "port" | "protocol";
};
declare class StringValidators {
  static looksLikeHttpUrl(url: string): HttpCheckResult;
  static looksLikeValidEmail(email: string): boolean;
}
//#endregion
export { StringUtils_d_exports as StringUtils, StringValidators_d_exports as StringValidators, index_d_exports as http };
//# sourceMappingURL=index.d.mts.map