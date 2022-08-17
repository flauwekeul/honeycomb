export declare class DefaultMap<K, V> extends Map<K, V> {
    private creator;
    constructor(creator: () => V);
    get(key: K): V;
}
