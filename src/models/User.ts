import {Eventing} from "./Eventing";

export interface UserProps {
  id?: number,
  name: string,
  age: number
}

type TemplateUnit = string | number

export class User {

  public events: Eventing = new Eventing()

  constructor(private data: UserProps) {
  }

  get(propName: string): TemplateUnit {
    return this.data[propName]
  }

  set(update: Partial<UserProps>): void {
    Object.assign(this.data, update)
  }

}
