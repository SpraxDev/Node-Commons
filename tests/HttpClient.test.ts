import Os from 'os';
import superagent from 'superagent';
import HttpClient from '../src/HttpClient';

let mockError: Error | undefined;
let mockResponse: any = {};

jest.mock('superagent', () => {
  return {
    agent: jest.fn(() => `AgentInstance_${Date.now()}`),

    get: jest.fn().mockReturnThis(),
    post: jest.fn().mockReturnThis(),

    set: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    buffer: jest.fn().mockReturnThis(),
    parse: jest.fn().mockReturnThis(),

    end: jest.fn((callback) => callback(mockError, mockResponse))
  };
});


beforeEach(() => {
  mockError = undefined;
  mockResponse = undefined;
});

describe('Generate UserAgent string', () => {
  test('Without systemInfo, appUrl', async () => {
    const userAgent = HttpClient.generateUserAgent('App', '1.2.3', false);

    expect(userAgent).toBe('App/1.2.3');
  });

  test('Without systemInfo, with appUrl', async () => {
    const userAgent = HttpClient.generateUserAgent('App', '1.2.3', false, 'https://example.com/');

    expect(userAgent).toBe('App/1.2.3 (+https://example.com/)');
  });

  test('With systemInfo, without appUrl', async () => {
    const userAgent = HttpClient.generateUserAgent('App', '1.2.3');

    expect(userAgent.startsWith('App/1.2.3 (')).toBeTruthy();
    expect(userAgent.endsWith(')')).toBeTruthy();

    expect(userAgent.includes(Os.type())).toBeTruthy();
    expect(userAgent.includes(process.arch)).toBeTruthy();
    expect(userAgent.includes(process.platform)).toBeTruthy();
  });
});

describe('', () => {
  test('Normal GET request without any configuration', async () => {
    const httpClient = new HttpClient('TestAgent');

    expect(httpClient.userAgent).toEqual('TestAgent');
    expect(httpClient.agent).toBe(superagent);

    await expect(httpClient.get('https://example.com/')).resolves;

    const mockedSet = (superagent as any).set as jest.Mock;
    expect(superagent.get).toHaveBeenCalledTimes(1);
    expect(mockedSet).toHaveBeenCalledTimes(1);

    expect(mockedSet.mock.calls[0]).toEqual(['User-Agent', 'TestAgent']);
  });

  test('Normal GET request with headers', async () => {
    const httpClient = new HttpClient('TestAgent');

    await expect(httpClient.get('https://example.com/', {Accept: 'application/json'})).resolves;

    const mockedSet = (superagent as any).set as jest.Mock;
    expect(superagent.get).toHaveBeenCalledTimes(1);
    expect(mockedSet).toHaveBeenCalledTimes(2);

    expect(mockedSet.mock.calls[0]).toEqual(['User-Agent', 'TestAgent']);
    expect(mockedSet.mock.calls[1]).toEqual(['Accept', 'application/json']);
  });

  test('Normal GET request with response status code 500', async () => {
    const httpClient = new HttpClient('TestAgent');

    mockError = new Error('Internal Server Error');
    mockResponse = {status: 500};
    await expect(httpClient.get('https://example.com/')).resolves;
  });

  test('Normal POST request without any configuration', async () => {
    const httpClient = new HttpClient('TestAgent');

    expect(httpClient.userAgent).toEqual('TestAgent');
    expect(httpClient.agent).toBe(superagent);

    await expect(httpClient.post('https://example.com/')).resolves;

    expect(superagent.post).toHaveBeenCalledTimes(1);
    expect((superagent as any).set).toHaveBeenCalledTimes(1);
  });

  test('Normal POST request with headers and body', async () => {
    const httpClient = new HttpClient('TestAgent');

    expect(httpClient.userAgent).toEqual('TestAgent');
    expect(httpClient.agent).toBe(superagent);

    await expect(httpClient.post('https://example.com/', {Accept: 'application/json'}, 'Test-Body')).resolves;

    expect(superagent.post).toHaveBeenCalledTimes(1);
    expect((superagent as any).set).toHaveBeenCalledTimes(2);
    expect((superagent as any).send).toHaveBeenCalledTimes(1);
  });

  test('With failed request', async () => {
    mockError = new Error('TestError');

    const httpClient = new HttpClient('TestAgent');
    await expect(httpClient.get('https://example.com/'))
        .rejects
        .toHaveProperty('message', 'TestError');
  });

  test('With default headers', async () => {
    const httpClient = new HttpClient('TestAgent',
        {
          defaultHeaders: {
            'User-Agent': 'OverwrittenAgent',
            'Accept': 'application/json'
          }
        });
    await expect(httpClient.get('https://example.com/')).resolves;

    const mockedSet = (superagent as any).set as jest.Mock;
    expect(superagent.get).toHaveBeenCalledTimes(1);
    expect(mockedSet).toHaveBeenCalledTimes(3);

    expect(mockedSet.mock.calls[0]).toEqual(['User-Agent', 'TestAgent']);
    expect(mockedSet.mock.calls[1]).toEqual(['User-Agent', 'OverwrittenAgent']);
    expect(mockedSet.mock.calls[2]).toEqual(['Accept', 'application/json']);
  });

  test('Set option to not use global agent', async () => {
    const httpClient = new HttpClient('TestAgent', {dontUseGlobalAgent: true});
    expect(httpClient.agent).not.toBe(superagent);
  });
});
