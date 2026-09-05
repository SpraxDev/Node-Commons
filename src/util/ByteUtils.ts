export default class ByteUtils {
  /**
   * The returned Buffer is a zero-copy view of the given bytes, if possible – Otherwise the bytes are copied instead
   */
  static toBuffer(bytes: Uint8Array): Buffer<ArrayBuffer> {
    if (bytes.buffer instanceof ArrayBuffer) {
      return Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    }
    return Buffer.copyBytesFrom(bytes);
  }
}
