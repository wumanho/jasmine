import {Model} from "../index";
import {getTemplate} from '../shared'

export interface EventMapResult {
  [key: string]: () => void
}

export interface Regions {
  [key: string]: Element
}

export interface RegionsMapResult {
  [key: string]: string
}

export abstract class View<T extends Model<M>, M> {

  regions: Regions = {}

  constructor(public parent: Element, public model: T) {
    this.bindModel()
  }

  abstract template(): string

  regionsMap(): RegionsMapResult {
    return {}
  }

  eventsMap(): EventMapResult {
    return {}
  }

  // 注册响应式
  bindModel(): void {
    this.model.on('change', () => {
      this.render()
    })
  }

  render(): void {
    // 避免重复渲染
    this.parent.innerHTML = ''
    // 挂载 template
    const templateElement = getTemplate()
    templateElement.innerHTML = this.template()
    // 初始化事件绑定
    this.bindEvents(templateElement.content)
    // 初始化组件
    this.mapRegions(templateElement.content)
    this.beforeRender()
    // 渲染到 app
    this.parent.append(templateElement.content)
  }

  beforeRender(): void {

  }

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap()
    for (let key in regionsMap) {
      // 获取一个选择器
      const selector = regionsMap[key]
      // 赋值
      const element = fragment.querySelector(selector)
      if (element) {
        this.regions[key] = element
      }
    }
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventMap = this.eventsMap()
    for (let eventsKey in eventMap) {
      const [eventName, selector] = eventsKey.split(':')
      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventMap[eventsKey])
      })
    }
  }
}
