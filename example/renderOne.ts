import {UserEdit} from "./classes/UserEdit";
import {User} from "./classes/User";

const user = User.buildUser({name: 'name', age: 20})

const userEdit = new UserEdit(
  document.getElementById('app') as Element,
  user
)

userEdit.render()

console.log(userEdit)
