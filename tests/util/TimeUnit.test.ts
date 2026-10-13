import TimeUnit from '../../src/util/TimeUnit.js';

type UnitName = 'NANOSECONDS' | 'MICROSECONDS' | 'MILLISECONDS' | 'SECONDS' | 'MINUTES' | 'HOURS' | 'DAYS';
type ConversionMethod = 'toNanos' | 'toMicros' | 'toMillis' | 'toSeconds' | 'toMinutes' | 'toHours' | 'toDays';

describe(TimeUnit, () => {
  test.for<{ from: UnitName, method: ConversionMethod, duration: number, expected: number }>([
    { from: 'MICROSECONDS', method: 'toNanos', duration: 1, expected: 1_000 },
    { from: 'MILLISECONDS', method: 'toMicros', duration: 1, expected: 1_000 },
    { from: 'SECONDS', method: 'toMillis', duration: 1, expected: 1_000 },
    { from: 'MINUTES', method: 'toSeconds', duration: 1, expected: 60 },
    { from: 'HOURS', method: 'toMinutes', duration: 1, expected: 60 },
    { from: 'DAYS', method: 'toHours', duration: 1, expected: 24 },
    { from: 'DAYS', method: 'toNanos', duration: 1, expected: 86_400_000_000_000 },
    { from: 'NANOSECONDS', method: 'toMicros', duration: 1_000, expected: 1 },
    { from: 'MICROSECONDS', method: 'toMillis', duration: 1_000, expected: 1 },
    { from: 'MILLISECONDS', method: 'toSeconds', duration: 1_000, expected: 1 },
    { from: 'SECONDS', method: 'toMinutes', duration: 60, expected: 1 },
    { from: 'MINUTES', method: 'toHours', duration: 60, expected: 1 },
    { from: 'HOURS', method: 'toDays', duration: 24, expected: 1 },
    { from: 'NANOSECONDS', method: 'toDays', duration: 86_400_000_000_000, expected: 1 },
  ])('Converts $duration $from via $method to $expected', ({ from, method, duration, expected }) => {
    expect(TimeUnit[from][method](duration)).toBe(expected);
  });

  test('Keeps the fraction when converting to a coarser unit', () => {
    expect(TimeUnit.MINUTES.toHours(90)).toBe(1.5);
  });

  test('Converts to a coarser unit without floating point noise', () => {
    expect(TimeUnit.NANOSECONDS.toMicros(9)).toBe(0.009);
  });

  test('Accepts a fractional duration', () => {
    expect(TimeUnit.HOURS.toMillis(1.5)).toBe(5_400_000);
  });

  test('Converts a negative duration', () => {
    expect(TimeUnit.SECONDS.toMillis(-2)).toBe(-2_000);
  });

  test('Returns the duration unchanged when converting to the same unit', () => {
    expect(TimeUnit.MINUTES.toMinutes(42)).toBe(42);
  });

  test('Converts a duration given in the source unit into the unit it is called on', () => {
    expect(TimeUnit.SECONDS.convert(5, TimeUnit.MINUTES)).toBe(300);
  });

  test('Converts 100,000 years of 365 days to milliseconds exactly', () => {
    expect(TimeUnit.DAYS.toMillis(36_500_000)).toBe(3_153_600_000_000_000);
  });

  test('Rejects replacing a unit constant', () => {
    expect(() => {
      (TimeUnit as any).SECONDS = TimeUnit.MINUTES;
    }).toThrow(TypeError);
  });

  test('Prevents modifying a unit', () => {
    expect(Object.isFrozen(TimeUnit.SECONDS)).toBe(true);
  });
});
