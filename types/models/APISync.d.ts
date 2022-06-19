import { AxiosPromise } from 'axios/dist/axios';
interface HasId {
    id?: number;
}
export declare class APISync<T extends HasId> {
    rootURL: string;
    constructor(rootURL: string);
    fetch(id: number): AxiosPromise;
    save(data: T): AxiosPromise;
}
export {};
