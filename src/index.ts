import {User} from "./models/User";

const user = new User({name: "wu", age: 20})
user.set({name: 'wumanho'})

user.on('click',()=>{
    console.log('click 01')
})
user.on('change',()=>{
    console.log('change 01')
})
user.on('click',()=>{
    console.log('click 02')
})

user.trigger('click')
user.trigger('change')

console.log(user)
