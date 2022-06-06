import {RegionsMapResult, View} from "../../src";
import {User, UserProps} from "./User";
import {UserShow} from "./UserShow";
import {UserForm} from "./UserForm";

export class UserEdit extends View<User, UserProps> {

  regionsMap(): RegionsMapResult {
    return {
      userShow: '.user-show',
      userForm: '.user-form'
    }
  }

  beforeRender() {
    new UserShow(this.regions.userShow, this.model).render()
    new UserForm(this.regions.userForm, this.model).render()
  }

  template(): string {
    return `
      <div>
        <div class="user-show"></div>
        <div class="user-form"></div>
        <div></div>
      </div> 
    `;
  }
}
