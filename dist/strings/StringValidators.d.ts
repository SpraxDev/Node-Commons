export declare const HOSTNAME_PATTERN: RegExp;
export declare const EMAIL_PATTERN: RegExp;
export declare type HttpCheckResult = {
    valid: boolean;
    issue?: 'protocol' | 'port' | 'hostname';
};
export default class StringValidators {
    static looksLikeHttpUrl(url: string): HttpCheckResult;
    static looksLikeValidEmail(email: string): boolean;
}
//# sourceMappingURL=StringValidators.d.ts.map