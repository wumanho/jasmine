import {View} from "../../src";
import {User, UserProps} from "./User";

type EventMap = {
  [key: string]: () => void
}

export class UserForm extends View<User, UserProps> {

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
