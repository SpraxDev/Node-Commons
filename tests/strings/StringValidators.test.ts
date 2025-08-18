import StringValidators, { HttpCheckResult } from '../../src/strings/StringValidators.js';

describe('Check if strings look like valid HTTP(s)-URLs', () => {
  const valid: HttpCheckResult = {valid: true};

  test('Test protocols', () => {
    expect(StringValidators.looksLikeHttpUrl('htt' + 'p://example.com/'))
        .toStrictEqual(valid);
    expect(StringValidators.looksLikeHttpUrl('https://www.example.com/'))
        .toStrictEqual(valid);

    expect(StringValidators.looksLikeHttpUrl('hhttps://www.example.com/'))
        .toStrictEqual({valid: false, issue: 'protocol'});
    expect(StringValidators.looksLikeHttpUrl('sftp://www.example.com/'))
        .toStrictEqual({valid: false, issue: 'protocol'});
    expect(StringValidators.looksLikeHttpUrl('https://\nexample.com/'))
        .toStrictEqual({valid: false, issue: 'protocol'});

    expect(StringValidators.looksLikeHttpUrl('example.com/'))
        .toStrictEqual({valid: false, issue: 'protocol'});
  });

  test('Test Hostnames (+ localhost, IPv4, punycode)', () => {
    expect(StringValidators.looksLikeHttpUrl('https://www.example.com/'))
        .toStrictEqual(valid);
    expect(StringValidators.looksLikeHttpUrl('https://example.com/'))
        .toStrictEqual(valid);
    expect(StringValidators.looksLikeHttpUrl('https://localhost/'))
        .toStrictEqual(valid);

    expect(StringValidators.looksLikeHttpUrl('https://1.1.1.1/'))
        .toStrictEqual(valid);

    expect(StringValidators.looksLikeHttpUrl('https://xn--xmpl-loa1ab.com/'))
        .toStrictEqual(valid);
    expect(StringValidators.looksLikeHttpUrl('https://éxämplè.com/'))
        .toStrictEqual({valid: false, issue: 'hostname'});
  });

  test('Test ports', () => {
    expect(StringValidators.looksLikeHttpUrl('https://www.example.com:8080/'))
        .toStrictEqual(valid);
    expect(StringValidators.looksLikeHttpUrl('https://www.example.com:65535/'))
        .toStrictEqual(valid);

    expect(StringValidators.looksLikeHttpUrl('https://www.example.com:99999/'))
        .toStrictEqual({valid: false, issue: 'port'});
    expect(StringValidators.looksLikeHttpUrl('https://www.example.com:0/'))
        .toStrictEqual({valid: false, issue: 'port'});
    expect(StringValidators.looksLikeHttpUrl('https://www.example.com:abc/'))
        .toStrictEqual({valid: false, issue: 'port'});
  });

  test('With path and query parameters', () => {
    expect(StringValidators.looksLikeHttpUrl('https://example.com'))
        .toStrictEqual(valid);
    expect(StringValidators.looksLikeHttpUrl('https://example.com/Hellû'))
        .toStrictEqual(valid);
    expect(StringValidators.looksLikeHttpUrl('https://example.com/Hell%C3%BB?foo=bar'))
        .toStrictEqual(valid);
  });
});

describe('Check if strings look like valid email addresses', () => {
  const validAddresses = [
    '0123456789@example.com', 'foo@bar.example.com', 'foobar@1.1.1.1', 'foobar@localhost', 'foobar@xn--xmpl-loa1ab.com',
    'foo+bar@example.com', 'foo.bar@example.com', '_!*-?%~@example.com', '"foo"."bar"@example.com'
  ];
  const invalidAddresses = ['foobar@example,com', 'foo@example..com', 'example.com', 'foo@', 'foo@.com'];

  it.each(validAddresses)('Valid address: %s', (address) => {
    expect(StringValidators.looksLikeValidEmail(address))
        .toBe(true);
  });
  it.each(invalidAddresses)('Invalid address: %s', (address) => {
    expect(StringValidators.looksLikeValidEmail(address))
        .toBe(false);
  });
});
