import {UserEdit} from "./views/UserEdit";
import {User} from "./models/User";

const user = User.buildUser({name: 'name', age: 20})

const userEdit = new UserEdit(
  document.getElementById('app') as Element,
  user
)

userEdit.render()

console.log(userEdit)
