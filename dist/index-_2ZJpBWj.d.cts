//#region src/util/ByteUtils.d.ts
declare class ByteUtils {
  /**
   * The returned Buffer is a zero-copy view of the given bytes, if possible – Otherwise the bytes are copied instead
   */
  static toBuffer(bytes: Uint8Array): Buffer<ArrayBuffer>;
}
declare namespace index_d_exports {
  export { ByteUtils };
}
//#endregion
export { ByteUtils as n, index_d_exports as t };
//# sourceMappingURL=index-_2ZJpBWj.d.cts.map