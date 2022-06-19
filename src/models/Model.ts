import {CallBack, Eventing} from "./Eventing";
import {AxiosError, AxiosPromise, AxiosResponse} from "axios";
import {Attributes} from "./Attributes";
import {APISync} from "./APISync";
import {UserProps} from "../../example/classes/User";

interface ModelAttributes<T> {
  set(update: T): void

  getAll(): T

  get<K extends keyof T>(key: K): T[K]
}

interface Sync<T> {
  fetch(id: number): AxiosPromise

  save(data: T): AxiosPromise
}

interface Events {
  on(eventName: string, callback: CallBack): void

  trigger(eventName: string): void
}

interface HasId {
  id?: number
}

export class Model<T extends HasId> {
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {
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

  set(update: T): void {
    this.attributes.set(update)
    // change 钩子
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
    this.sync.save(
      this.attributes.getAll()
    )
      .then((res: AxiosResponse): void => {
        // save 钩子
        this.trigger('save')
      })
      .catch((e: AxiosError) => {
        this.trigger('error')
        console.warn(e)
      })
  }
}
