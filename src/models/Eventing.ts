export type CallBack = () => void

type Events = {
  [key: string]: CallBack[]
}

export class Eventing {
  events: Events = {}

  on(eventName: string, callback: CallBack): void {
    // 如果不存在就初始化
    const handlers = this.events[eventName] || []
    handlers.push(callback)
    this.events[eventName] = handlers
  }

  trigger(eventName: string): void {
    const handlers = this.events[eventName]
    if (!handlers || handlers.length === 0) return
    handlers.forEach(callback => {
      callback()
    })
  }
}
