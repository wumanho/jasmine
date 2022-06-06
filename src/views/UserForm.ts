import {User} from "../models/User";

type EventMap = {
  [key: string]: () => void
}

export class UserForm {

  constructor(public parent: HTMLElement, public model: User) {
    this.bindModel()
  }

  // 注册响应式
  bindModel(): void {
    this.model.on('change', () => {
      this.render()
    })
  }

  eventsMap(): EventMap {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
    }
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input')
    if (input) {
      const name = input.value
      this.model.set({name})
    }
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge()
  }

  template(): string {
    return `
        <div>
          <h1>User Form</h1>
          <div>User name : ${this.model.get('name')}</div>
          <div>User age : ${this.model.get('age')}</div>
          <input/>
          <button class="set-name">Change Name</button>
          <button class="set-age">Set random age</button>
        </div>`
  }

  render(): void {
    // 避免重复渲染
    this.parent.innerHTML = ''
    // 挂载 template
    const templateElement = document.createElement('template')
    templateElement.innerHTML = this.template()
    this.bindEvents(templateElement.content)
    this.parent.append(templateElement.content)
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
