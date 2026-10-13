//#region src/util/ByteUtils.d.ts
declare class ByteUtils {
  /**
   * The returned Buffer is a zero-copy view of the given bytes, if possible – Otherwise the bytes are copied instead
   */
  static toBuffer(bytes: Uint8Array): Buffer<ArrayBuffer>;
}
//#endregion
//#region src/util/TimeUnit.d.ts
/**
 * Inspired by Java's `java.util.concurrent.TimeUnit`.
 *
 * Unlike Java, conversions to a coarser unit are not truncated, e.g. `TimeUnit.MINUTES.toHours(90) === 1.5`.
 * Being floating point, a round trip may drift slightly: `SECONDS.toMillis(MILLISECONDS.toSeconds(1001)) === 1000.9999999999999`.
 */
declare class TimeUnit {
  private readonly nanosPerUnit;
  static readonly NANOSECONDS: TimeUnit;
  static readonly MICROSECONDS: TimeUnit;
  static readonly MILLISECONDS: TimeUnit;
  static readonly SECONDS: TimeUnit;
  static readonly MINUTES: TimeUnit;
  static readonly HOURS: TimeUnit;
  static readonly DAYS: TimeUnit;
  private constructor();
  convert(sourceDuration: number, sourceUnit: TimeUnit): number;
  toNanos(duration: number): number;
  toMicros(duration: number): number;
  toMillis(duration: number): number;
  toSeconds(duration: number): number;
  toMinutes(duration: number): number;
  toHours(duration: number): number;
  toDays(duration: number): number;
}
declare namespace index_d_exports {
  export { ByteUtils, TimeUnit };
}
//#endregion
export { TimeUnit as n, ByteUtils as r, index_d_exports as t };
//# sourceMappingURL=index-C9jHMaq_.d.mts.map