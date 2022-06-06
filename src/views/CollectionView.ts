import {Collection} from "../index";
import {getTemplate} from "../shared";

export abstract class CollectionView<T, K> {
  constructor(public parent: Element, public collection: Collection<T, K>) {
  }

  /**
   * 渲染集合
   * @param model 需要渲染的数据
   * @param itemParent 需要渲染的元素
   */
  abstract renderItem(model: T, itemParent: Element): void

  render(): void {
    this.parent.innerHTML = ''
    const templateElement = getTemplate()
    for (const model of this.collection.models) {
      const div = document.createElement('div')
      this.renderItem(model, div)
      templateElement.content.append(div)
    }
    this.parent.append(templateElement.content)
  }
}
