import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
//#region src/util/ByteUtils.ts
var ByteUtils = class {
	/**
	* The returned Buffer is a zero-copy view of the given bytes, if possible – Otherwise the bytes are copied instead
	*/
	static toBuffer(bytes) {
		if (bytes.buffer instanceof ArrayBuffer) return Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength);
		return Buffer.copyBytesFrom(bytes);
	}
};
//#endregion
//#region src/util/index.ts
var util_exports = /* @__PURE__ */ __exportAll({ ByteUtils: () => ByteUtils });
//#endregion
export { ByteUtils as n, util_exports as t };

//# sourceMappingURL=util-B8oSgenN.mjs.map