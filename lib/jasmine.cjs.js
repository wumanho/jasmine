'use strict';

class User {
    constructor(data) {
        this.data = data;
        this.events = {};
    }
    get(propName) {
        return this.data[propName];
    }
    set(update) {
        Object.assign(this.data, update);
    }
    on(eventName, callback) {
        // 如果不存在就初始化
        const handlers = this.events[eventName] || [];
        handlers.push(callback);
        this.events[eventName] = handlers;
    }
    trigger(eventName) {
        const handlers = this.events[eventName];
        if (!handlers || handlers.length === 0)
            return;
        handlers.forEach(callback => {
            callback();
        });
    }
}

const user = new User({ name: "wu", age: 20 });
user.set({ name: 'wumanho' });
user.on('click', () => {
    console.log('click 01');
});
user.on('change', () => {
    console.log('change 01');
});
user.on('click', () => {
    console.log('click 02');
});
user.trigger('click');
user.trigger('change');
console.log(user);
