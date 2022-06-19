import { CallBack } from "./Eventing";
import { AxiosPromise } from "axios";
interface ModelAttributes<T> {
    set(update: T): void;
    getAll(): T;
    get<K extends keyof T>(key: K): T[K];
}
interface Sync<T> {
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}
interface Events {
    on(eventName: string, callback: CallBack): void;
    trigger(eventName: string): void;
}
interface HasId {
    id?: number;
}
export declare class Model<T extends HasId> {
    private attributes;
    private events;
    private sync;
    constructor(attributes: ModelAttributes<T>, events: Events, sync: Sync<T>);
    get on(): (eventName: string, callback: CallBack) => void;
    get trigger(): (eventName: string) => void;
    get get(): <K extends keyof T>(key: K) => T[K];
    set(update: T): void;
    fetch(): void;
    save(): void;
}
export {};
