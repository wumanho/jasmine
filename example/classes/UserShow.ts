import {View} from "../../src";
import {User, UserProps} from "./User";

export class UserShow extends View<User, UserProps> {
  template(): string {
    return `
      <div>
         <h1>User Detail</h1>
         <div>User name:${this.model.get('name')}</div>
         <div>User age:${this.model.get('age')}</div>
      </div>
    `;
  }
}
