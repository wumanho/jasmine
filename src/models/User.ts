import axios, {AxiosResponse} from 'axios/dist/axios';

interface UserProps {
  id?: number,
  name: string,
  age: number
}

type TemplateUnit = string | number
type CallBack = () => void
type Events = {
  [key: string]: CallBack[]
}


export class User {

  events: Events = {}

  constructor(private data: UserProps) {
  }

  get(propName: string): TemplateUnit {
    return this.data[propName]
  }

  set(update: Partial<UserProps>): void {
    Object.assign(this.data, update)
  }

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

  fetch() {
    axios.get(`http://localhost:3000/users/${this.get('id')}`)
      .then((res: AxiosResponse): void => {
        this.set(res.data)
      })
  }
}
