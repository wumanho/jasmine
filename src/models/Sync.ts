import axios, {AxiosPromise} from 'axios/dist/axios';
import {UserProps} from './User'

export class Sync {

  constructor(public rootURL: string) {
  }

  fetch(id: number): AxiosPromise {
    return axios.get(`${this.rootURL}/${id}`)
  }

  save(data: UserProps): AxiosPromise {
    const {id} = data
    // 如果已经有了 id，就更新这个对象
    if (id) {
      return axios.put(`${this.rootURL}/${id}`, data)
    } else {
      // 否则，保存对象
      return axios.post(this.rootURL, data)
    }
  }
}
