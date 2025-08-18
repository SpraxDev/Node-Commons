import StringUtils from '../../src/strings/StringUtils.js';

describe('Formatting strings (array)', () => {
  test('Simple strings', () => {
    expect(StringUtils.format('Hello {0}', ['World']))
        .toBe('Hello World');

    expect(StringUtils.format('{1} {0}', ['World', 'Hello']))
        .toBe('Hello World');
  });

  test('With fallback string defined', () => {
    expect(StringUtils.format('Hello {0}', ['World'], '!'))
        .toBe('Hello World');

    expect(StringUtils.format('Hello {0}{50}', ['World'], '!'))
        .toBe('Hello World!');
  });

  test('Use same index twice, an undefined one and escape one', () => {
    expect(StringUtils.format('{0} ({0}) is {{0}} **{2}** using {1}!', ['Sprax', 'TypeScript']))
        .toBe('Sprax (Sprax) is {0} **{2}** using TypeScript!');
  });

  // FIXME
  test.skip('input string with random double curly braces', () => {
    expect(StringUtils.format('( ・ω・)o-{{[〃]}', []))
        .toBe('( ・ω・)o-{{[〃]}');
  });
});

describe('Formatting strings (key-value pairs)', () => {
  test('Simple strings', () => {
    expect(StringUtils.format('Hello {0}', {'0': 'World'}))
        .toBe('Hello World');

    expect(StringUtils.format('{h} {w}', {w: 'World', h: 'Hello'}))
        .toBe('Hello World');
  });

  test('With fallback string defined', () => {
    expect(StringUtils.format('Hello {w}', {w: 'World'}, '!'))
        .toBe('Hello World');

    expect(StringUtils.format('Hello {w}{5}', {w: 'World'}, '!'))
        .toBe('Hello World!');
  });

  test('Use same index twice, an undefined one and escape one', () => {
    expect(StringUtils.format('{name} ({name}) is {{name}} **{2}** using {uses}!', {
      name: 'Sprax',
      uses: 'TypeScript'
    }))
        .toBe('Sprax (Sprax) is {name} **{2}** using TypeScript!');
  });
});

describe('Check if strings are numeric', () => {
  test('Integers', () => {
    expect(StringUtils.isNumeric('0'))
        .toBe(true);
    expect(StringUtils.isNumeric('010'))
        .toBe(true);

    expect(StringUtils.isNumeric('-0'))
        .toBe(false);
    expect(StringUtils.isNumeric('-10'))
        .toBe(false);
  });

  test('Floats', () => {
    expect(StringUtils.isNumeric('0.0'))
        .toBe(false);
    expect(StringUtils.isNumeric('100.5'))
        .toBe(false);
  });
});
