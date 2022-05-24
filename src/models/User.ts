interface UserProps {
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
}
