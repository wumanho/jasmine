import {UserList} from "./classes/UserList";
import {Collection} from "../src";
import {User, UserProps} from "./classes/User";

const users = new Collection('http://localhost:3000/users', (json: UserProps) => {
  return User.buildUser(json)
})

users.on('change', () => {
  const root = document.getElementById('app')
  if (root) {
    new UserList(root, users).render()
  }
})
users.fetch()
