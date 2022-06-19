import { Eventing } from "./Eventing";
export declare class Collection<T, K> {
    rootURL: string;
    deserialize: (json: K) => T;
    models: T[];
    events: Eventing;
    constructor(rootURL: string, deserialize: (json: K) => T);
    get on(): (eventName: string, callback: import("./Eventing").CallBack) => void;
    get trigger(): (eventName: string) => void;
    /**
     * 获取 db 中所有数据，实例化后保存在集合中
     */
    fetch(): void;
}
