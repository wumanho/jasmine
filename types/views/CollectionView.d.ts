import { Collection } from "../index";
export declare abstract class CollectionView<T, K> {
    parent: Element;
    collection: Collection<T, K>;
    constructor(parent: Element, collection: Collection<T, K>);
    /**
     * 渲染集合
     * @param model 需要渲染的数据
     * @param itemParent 需要渲染的元素
     */
    abstract renderItem(model: T, itemParent: Element): void;
    render(): void;
}
