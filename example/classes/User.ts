import {Model} from "../../src";
import {Attributes} from "../../src";
import {APISync} from "../../src";
import {Eventing} from "../../src";
import {Collection} from "../../src";

export interface UserProps {
  id?: number,
  name?: string,
  age?: number
}

const init = (json: UserProps) => User.buildUser(json)

const rootURL = 'http://localhost:3000/users'

export class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new APISync<UserProps>(rootURL)
    )
  }

  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(
      rootURL,
      init
    )
  }


  setRandomAge(): void {
    const randomAge = Math.round(Math.random() * 100)
    this.set({age: randomAge})
  }
}
