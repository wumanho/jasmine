type TemplateUnit = string | number

export class Attributes<T> {
  constructor(private data: T) {
  }

  get(propName: string): TemplateUnit {
    return this.data[propName]
  }

  set(update: Partial<T>): void {
    Object.assign(this.data, update)
  }
}
