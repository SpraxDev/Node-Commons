import Net from 'net';
import StringUtils from './StringUtils';

export const HOSTNAME_PATTERN = /(?=^.{4,253}$)(^((?!-)[a-z0-9-]{0,62}[a-z0-9]\.)+[a-z]{2,63}\.?$)/i;
export const EMAIL_PATTERN = /^[a-z0-9.!#$%&'*+/="?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;

export type HttpCheckResult = { valid: boolean, issue?: 'hostname' | 'port' | 'protocol' };

export default class StringValidators {
  public static looksLikeHttpUrl(url: string): HttpCheckResult {
    // Protocol
    if (!/^https?:\/\/.*$/i.test(url)) {
      return {valid: false, issue: 'protocol'};
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

      if (!StringUtils.isNumeric(portStr) || port <= 0 || port > 65535 /* unsigned int2 */) {
        return {valid: false, issue: 'port'};
      }
    }

    if (Net.isIPv4(lowerHost) || Net.isIPv6(lowerHost) || lowerHost == 'localhost') {
      return {valid: true};
    }

    const valid = HOSTNAME_PATTERN.test(lowerHost);

    if (valid) {
      return {valid};
    }

    return {valid, issue: 'hostname'};
  }

  public static looksLikeValidEmail(email: string): boolean {
    return EMAIL_PATTERN.test(email);
  }
}
