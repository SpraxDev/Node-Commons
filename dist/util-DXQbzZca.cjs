const require_rolldown_runtime = require("./rolldown-runtime-C0BPl7ul.cjs");
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
var util_exports = /* @__PURE__ */ require_rolldown_runtime.__exportAll({ ByteUtils: () => ByteUtils });
//#endregion
Object.defineProperty(exports, "ByteUtils", {
	enumerable: true,
	get: function() {
		return ByteUtils;
	}
});
Object.defineProperty(exports, "util_exports", {
	enumerable: true,
	get: function() {
		return util_exports;
	}
});

//# sourceMappingURL=util-DXQbzZca.cjs.map