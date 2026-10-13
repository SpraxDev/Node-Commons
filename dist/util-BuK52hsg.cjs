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
//#region src/util/TimeUnit.ts
/**
* Inspired by Java's `java.util.concurrent.TimeUnit`.
*
* Unlike Java, conversions to a coarser unit are not truncated, e.g. `TimeUnit.MINUTES.toHours(90) === 1.5`.
* Being floating point, a round trip may drift slightly: `SECONDS.toMillis(MILLISECONDS.toSeconds(1001)) === 1000.9999999999999`.
*/
var TimeUnit = class TimeUnit {
	nanosPerUnit;
	static NANOSECONDS = new TimeUnit(1);
	static MICROSECONDS = new TimeUnit(1e3);
	static MILLISECONDS = new TimeUnit(1e6);
	static SECONDS = new TimeUnit(1e9);
	static MINUTES = new TimeUnit(6e10);
	static HOURS = new TimeUnit(36e11);
	static DAYS = new TimeUnit(864e11);
	static {
		Object.freeze(this);
	}
	constructor(nanosPerUnit) {
		this.nanosPerUnit = nanosPerUnit;
		Object.freeze(this);
	}
	convert(sourceDuration, sourceUnit) {
		if (sourceUnit.nanosPerUnit >= this.nanosPerUnit) return sourceDuration * (sourceUnit.nanosPerUnit / this.nanosPerUnit);
		return sourceDuration / (this.nanosPerUnit / sourceUnit.nanosPerUnit);
	}
	toNanos(duration) {
		return TimeUnit.NANOSECONDS.convert(duration, this);
	}
	toMicros(duration) {
		return TimeUnit.MICROSECONDS.convert(duration, this);
	}
	toMillis(duration) {
		return TimeUnit.MILLISECONDS.convert(duration, this);
	}
	toSeconds(duration) {
		return TimeUnit.SECONDS.convert(duration, this);
	}
	toMinutes(duration) {
		return TimeUnit.MINUTES.convert(duration, this);
	}
	toHours(duration) {
		return TimeUnit.HOURS.convert(duration, this);
	}
	toDays(duration) {
		return TimeUnit.DAYS.convert(duration, this);
	}
};
//#endregion
//#region src/util/index.ts
var util_exports = /* @__PURE__ */ require_rolldown_runtime.__exportAll({
	ByteUtils: () => ByteUtils,
	TimeUnit: () => TimeUnit
});
//#endregion
Object.defineProperty(exports, "ByteUtils", {
	enumerable: true,
	get: function() {
		return ByteUtils;
	}
});
Object.defineProperty(exports, "TimeUnit", {
	enumerable: true,
	get: function() {
		return TimeUnit;
	}
});
Object.defineProperty(exports, "util_exports", {
	enumerable: true,
	get: function() {
		return util_exports;
	}
});

//# sourceMappingURL=util-BuK52hsg.cjs.map