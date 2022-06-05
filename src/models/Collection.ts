import {User, UserProps} from "./User";
import {Eventing} from "./Eventing";
import axios, {AxiosResponse} from 'axios/dist/axios';

export class Collection {
  models: User[] = []
  events: Eventing = new Eventing()

  constructor(public rootURL: string) {
  }

  get on() {
    return this.events.on
  }

  get trigger() {
    return this.events.trigger
  }

  /**
   * 获取 db 中所有数据，实例化后保存在集合中
   */
  fetch(): void {
    axios.get(this.rootURL)
      .then((res: AxiosResponse) => {
        res.data.forEach((val: UserProps) => {
          const user = User.buildUser(val)
          this.models.push(user)
        })
        this.trigger('change')
      })
  }

}
