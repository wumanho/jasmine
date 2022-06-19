import { Model } from "../index";
export interface EventMapResult {
    [key: string]: () => void;
}
export interface Regions {
    [key: string]: Element;
}
export interface RegionsMapResult {
    [key: string]: string;
}
export declare abstract class View<T extends Model<M>, M> {
    parent: Element;
    model: T;
    regions: Regions;
    constructor(parent: Element, model: T);
    abstract template(): string;
    regionsMap(): RegionsMapResult;
    eventsMap(): EventMapResult;
    bindModel(): void;
    render(): void;
    beforeRender(): void;
    mapRegions(fragment: DocumentFragment): void;
    bindEvents(fragment: DocumentFragment): void;
}
