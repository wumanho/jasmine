import {Eventing} from "./Eventing";
import {Sync} from "./Sync";
import {Attributes} from "./Attributes";
import {AxiosResponse} from "axios";

export interface UserProps {
  id?: number,
  name?: string,
  age?: number
}


const rootURL = 'http://localhost:3000/users'

export class User {
  public events: Eventing = new Eventing()
  public sync: Sync<UserProps> = new Sync<UserProps>(rootURL)
  public attributes: Attributes<UserProps>

  constructor(public attrs: UserProps) {
    this.attributes = new Attributes<UserProps>(attrs)
  }

  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  get get() {
    return this.attributes.get
  }

  set(update: UserProps): void {
    // 每次保存值后，都需要触发 change 事件
    this.attributes.set(update)
    this.trigger('change')
  }

  fetch(): void {
    const id = this.get('id')
    if (!id) {
      throw new Error('Cannot fetch without an id')
    }
    this.sync.fetch(id).then((res: AxiosResponse): void => {
      this.set(res.data)
    })
  }

  save(): void {

  }
}
