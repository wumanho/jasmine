import {Eventing} from "./Eventing";
import axios, {AxiosResponse} from 'axios/dist/axios';

export class Collection<T, K> {
  models: T[] = []
  events: Eventing = new Eventing()

  constructor(
    public rootURL: string,
    // parse each json models to models collection
    public deserialize: (json: K) => T
  ) {
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
        res.data.forEach((val: K) => {
          this.models.push(this.deserialize(val))
        })
        this.trigger('change')
      })
  }

}
