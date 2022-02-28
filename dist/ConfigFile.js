"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ts_deepmerge_1 = __importDefault(require("ts-deepmerge"));
class ConfigFile {
    constructor(path, defaults, prettyPrint = 4, autoLoad = true) {
        this.path = path;
        this.prettyPrint = prettyPrint !== false ? prettyPrint : 0;
        this.defaults = Object.freeze(defaults);
        this.data = {};
        if (!autoLoad) {
            this.data = this.lazyDeepMerge(this.defaults);
            return;
        }
        this.load();
    }
    load() {
        let parsedJson = {};
        if (fs_1.default.existsSync(this.path)) {
            parsedJson = JSON.parse(fs_1.default.readFileSync(this.path, 'utf-8'));
        }
        this.data = this.lazyDeepMerge(this.defaults, parsedJson);
    }
    save() {
        fs_1.default.mkdirSync(path_1.default.dirname(this.path), { recursive: true });
        fs_1.default.writeFileSync(this.path, JSON.stringify(this.data, null, this.prettyPrint), 'utf-8');
    }
    saveIfChanged() {
        if (JSON.stringify(this.data) != JSON.stringify(JSON.parse(fs_1.default.readFileSync(this.path, 'utf-8')))) {
            this.save();
        }
    }
    lazyDeepMerge(...objects) {
        const merged = ts_deepmerge_1.default.withOptions({ mergeArrays: false }, ...objects);
        this.resolveLazyValues(merged);
        return merged;
    }
    resolveLazyValues(object) {
        if (object === null) {
            return;
        }
        for (const key of Object.keys(object)) {
            const value = object[key];
            if (typeof value == 'function') {
                object[key] = value();
                break;
            }
            if (typeof value == 'object') {
                this.resolveLazyValues(value);
            }
        }
    }
}
exports.default = ConfigFile;
//# sourceMappingURL=ConfigFile.js.map