import Os from 'node:os';

export default class UserAgentGenerator {
  static generate(appName: string, appVersion: string, includeSystemInfo: boolean = true, infoOrAppUrl?: string): string {
    let userAgent = `${appName}/${appVersion}`;

    if (includeSystemInfo) {
      userAgent += ` (${Os.type()}; ${process.arch}; ${process.platform})`;
    }

    if (infoOrAppUrl != null) {
      userAgent += ` (+${infoOrAppUrl})`;
    }

    return userAgent;
  }
}
