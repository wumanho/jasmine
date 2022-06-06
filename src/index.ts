import {UserForm} from "./views/UserForm";
import {User} from "./models/User";

const user = User.buildUser({name: 'name', age: 20})

const userForm = new UserForm(
  document.getElementById('app') as HTMLElement,
  user
)

userForm.render()
