export declare type ConfigFileValues = string | number | boolean | null | string[] | number[] | boolean[] | {
    [key: string | number]: ConfigFileValues;
};
export interface LazyDefaults {
    [key: string]: ConfigFileValues | (() => ConfigFileValues);
}
export default class ConfigFile<T> {
    readonly path: string;
    readonly prettyPrint: number | string;
    readonly atomicWrites: boolean;
    readonly defaults: T;
    data: T;
    constructor(path: string, defaults: T, prettyPrint?: number | string | false, autoLoad?: boolean, atomicWrites?: boolean);
    load(): void;
    save(): void;
    saveIfChanged(): void;
    private lazyDeepMerge;
    private resolveLazyValues;
}
//# sourceMappingURL=ConfigFile.d.ts.map