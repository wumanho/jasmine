class User {
    constructor(data) {
        this.data = data;
    }
    get(propName) {
        return this.data[propName];
    }
    set(update) {
        Object.assign(this.data, update);
    }
}

const user = new User({ name: "wu", age: 20 });
console.log(user.get("name"));
user.set({ name: 'wumanho' });
console.log(user.get("name"), 'updated');
console.log(user.get("age"), 'not update');
