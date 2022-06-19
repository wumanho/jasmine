# jasmine:white_flower:

一个简单、可扩展的传统前端框架

- [x] [TypeScript](https://www.typescriptlang.org/)
- [x] [rollup.js](https://rollupjs.org/guide/en/)
- [x] 响应式
- [x] 组件化
- [x] 100% 面向对象

## 如何使用

### 构建

```
pnpm build
```

&nbsp;

### 创建 Model

Model 用于实现增删改查，事件处理和持久化操作。

声明一个 Model ，例如 User Model ，需要先指定该 Model 的属性：

```typescript
interface UserProps {
  id?: number,
  name?: string,
  age?: number
}
```

创建 User 类，继承 Model 类需要同时传入`Attributes`，`Eventing` 和 `APISync` 类的实例，以及用于持久化的接口路径，建议使用静态方法初始化，如下：

```typescript
const rootURL = 'http://localhost:3000/users'

class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new APISync<UserProps>(rootURL)
    )
  }
}
```

继承 Model 类后，会自动拥有以下 Model 方法：

* on（）：注册事件
* trigger（）：触发事件
* get（）：获取属性
* set（update：T）：设置属性
* fetch（）：获取持久化的数据
* save（）：持久化数据

Model 实例可以拥有自己的方法，如：

```typescript
class User extends Model<UserProps> {
  static buildUser(attrs: UserProps): User {
    /* ... */
  }
  setRandomAge(): void {
    const randomAge = Math.round(Math.random() * 100)
    this.set({age: randomAge})
  }
}
```

&nbsp;

### 创建视图

视图用于渲染页面以及注册事件，视图需要跟 Model 进行关联，创建一个 UserShow 视图：

```typescript
class UserShow extends View<User, UserProps> {
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
```



### 注册事件

注册事件需要在视图实例中实现 `eventsMap` 方法。

`eventsMap` 方法返回一个对象：

其中，key 的格式为：“监听事件：监听元素”，

value 则表示回调函数

```typescript
const eventsMap():EventMap{
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick,
    }
}
```

例如：

```typescript
type EventMap = {
  [key: string]: () => void
}

class UserForm extends View<User, UserProps> {

  eventsMap(): EventMap {
    return {
      'click:.set-age': this.onSetAgeClick,
      'click:.set-name': this.onSetNameClick,
      'click:.save-model': this.onSaveClick,
    }
  }

  onSaveClick = (): void => {
    this.model.save()
  }

  onSetNameClick = (): void => {
    const input = this.parent.querySelector('input')
    if (input) {
      const name = input.value
      this.model.set({name})
    }
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge()
  }

  template(): string {
    return `
        <div>
          <input/>
          <button class="set-name">Change Name</button>
          <button class="set-age">Set random age</button>
          <button class="save-model">Save User</button>
        </div>`
  }
}
```

&nbsp;

### 组件化

组件化需要视图实例中实现 `regionsMap` 方法。

`regionsMap` 方法返回一个对象：

其中，key 表示视图实例，value 则表示渲染实例的元素

```typescript
const regionsMap(): RegionsMapResult {
    return {
      userShow: '.user-show',
      userForm: '.user-form'
    }
  }
```

将 `UserShow` 和 `UserForm` 两个视图注册为 `UserEdit` 的子组件：

```typescript
class UserEdit extends View<User, UserProps> {

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
```

&nbsp;

### 创建 APP

```typescript
// APP.ts
import {UserEdit} from "./classes/UserEdit";
import {User} from "./classes/User";

const user = User.buildUser({name: 'name', age: 20})

const userEdit = new UserEdit(
  document.getElementById('app') as Element,
  user
)

userEdit.render()
```







