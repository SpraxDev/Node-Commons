"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringUtils {
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
            if (curlyBracket == '{{') {
                return '{';
            }
            if (curlyBracket == '}}') {
                return '}';
            }
            return args[key] ?? fallbackValue ?? `{${key}}`;
        });
    }
}
exports.default = StringUtils;
//# sourceMappingURL=StringUtils.js.map