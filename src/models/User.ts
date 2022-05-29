import axios, {AxiosResponse} from 'axios/dist/axios';

interface UserProps {
  id?: number,
  name: string,
  age: number
}

type TemplateUnit = string | number

export class User {

  constructor(private data: UserProps) {
  }

  get(propName: string): TemplateUnit {
    return this.data[propName]
  }

  set(update: Partial<UserProps>): void {
    Object.assign(this.data, update)
  }

  fetch() {
    axios.get(`http://localhost:3000/users/${this.get('id')}`)
      .then((res: AxiosResponse): void => {
        this.set(res.data)
      })
  }

  save(): void {
    const id = this.get('id')
    // 如果已经有了 id，就更新这个对象
    if (id) {
      axios.put(`http://localhost:3000/users/${id}`, this.data)
    } else {
      // 否则，保存对象
      axios.post('http://localhost:3000/users', this.data)
    }
  }
}
