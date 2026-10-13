/**
 * Inspired by Java's `java.util.concurrent.TimeUnit`.
 *
 * Unlike Java, conversions to a coarser unit are not truncated, e.g. `TimeUnit.MINUTES.toHours(90) === 1.5`.
 * Being floating point, a round trip may drift slightly: `SECONDS.toMillis(MILLISECONDS.toSeconds(1001)) === 1000.9999999999999`.
 */
export default class TimeUnit {
  public static readonly NANOSECONDS: TimeUnit = new TimeUnit(1);
  public static readonly MICROSECONDS: TimeUnit = new TimeUnit(1_000);
  public static readonly MILLISECONDS: TimeUnit = new TimeUnit(1_000_000);
  public static readonly SECONDS: TimeUnit = new TimeUnit(1_000_000_000);
  public static readonly MINUTES: TimeUnit = new TimeUnit(60 * 1_000_000_000);
  public static readonly HOURS: TimeUnit = new TimeUnit(60 * 60 * 1_000_000_000);
  public static readonly DAYS: TimeUnit = new TimeUnit(24 * 60 * 60 * 1_000_000_000);

  static {
    Object.freeze(this);
  }

  private constructor(private readonly nanosPerUnit: number) {
    Object.freeze(this);
  }

  convert(sourceDuration: number, sourceUnit: TimeUnit): number {
    if (sourceUnit.nanosPerUnit >= this.nanosPerUnit) {
      return sourceDuration * (sourceUnit.nanosPerUnit / this.nanosPerUnit);
    }
    return sourceDuration / (this.nanosPerUnit / sourceUnit.nanosPerUnit);
  }

  toNanos(duration: number): number {
    return TimeUnit.NANOSECONDS.convert(duration, this);
  }

  toMicros(duration: number): number {
    return TimeUnit.MICROSECONDS.convert(duration, this);
  }

  toMillis(duration: number): number {
    return TimeUnit.MILLISECONDS.convert(duration, this);
  }

  toSeconds(duration: number): number {
    return TimeUnit.SECONDS.convert(duration, this);
  }

  toMinutes(duration: number): number {
    return TimeUnit.MINUTES.convert(duration, this);
  }

  toHours(duration: number): number {
    return TimeUnit.HOURS.convert(duration, this);
  }

  toDays(duration: number): number {
    return TimeUnit.DAYS.convert(duration, this);
  }
}
