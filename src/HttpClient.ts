import Os from 'os';
import superagent from 'superagent';

export type HttpClientOptions = {
  dontUseGlobalAgent?: boolean;
  defaultHeaders?: { [key: string]: string };
};

export default class HttpClient {
  readonly userAgent: string;
  readonly agent: superagent.SuperAgentStatic;
  readonly options: HttpClientOptions;

  constructor(userAgent: string, options: HttpClientOptions = {}) {
    this.userAgent = userAgent;
    this.options = options;

    this.agent = options.dontUseGlobalAgent ? superagent.agent() : superagent;
  }

  async get(url: string, headers?: { [key: string]: string }): Promise<superagent.Response & { body: Buffer }> {
    return new Promise((resolve, reject) => {
      this.applyDefaults(this.agent.get(url), headers)
          .end(HttpClient.getReqHandler(resolve, reject));
    });
  }

  async post(url: string, headers?: { [key: string]: string }, body?: string | object): Promise<superagent.Response & { body: Buffer }> {
    return new Promise((resolve, reject) => {
      this.applyDefaults(this.agent.post(url), headers, body)
          .end(HttpClient.getReqHandler(resolve, reject));
    });
  }

  protected applyDefaults(req: superagent.Request, headers?: { [key: string]: string }, body?: string | object): superagent.Request {
    req.set('User-Agent', this.userAgent);

    if (this.options.defaultHeaders) {
      for (const headerKey in this.options.defaultHeaders) {
        req.set(headerKey, this.options.defaultHeaders[headerKey]);
      }
    }

    if (headers) {
      for (const headerKey in headers) {
        req.set(headerKey, headers[headerKey]);
      }
    }

    // Force the response body to be a Buffer
    req.buffer(true)
        .parse(superagent.parse['application/octet-stream']);

    if (body) {
      req.send(body);
    }

    return req;
  }

  static generateUserAgent(appName: string, appVersion: string, includeSystemInfo: boolean = true, appUrl?: string): string {
    let userAgent = `${appName}/${appVersion}`;

    if (includeSystemInfo) {
      userAgent += ` (${Os.type()}; ${process.arch}; ${process.platform})`;
    }

    if (appUrl != null) {
      userAgent += ` (+${appUrl})`;
    }

    return userAgent;
  }

  protected static getReqHandler(resolve: Function, reject: Function): (err: any, res: superagent.Response) => void {
    return (err, res) => {
      if (err && !res) return reject(err);  // An error occurred (HTTP errors are excluded! 404 is not an error in my eyes as the request itself was successful)

      return resolve(res);
    };
  }
}
