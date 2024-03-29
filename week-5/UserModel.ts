import type { User } from './types.d.ts';

export default class UserModel {
  users: User[];
  constructor(
    public initialUsers: User[]
  ) {
    this.users = initialUsers;
  }

  getUser(id: string) : User | undefined {
    return this.users.find( (user) => user.id === id);
  }

  createUser(user: User) : void {
    const currentUser = this.getUser(user.id);
    if(currentUser === undefined) {
      this.users.push(user);
    } else {
      throw new Error("Duplicated user");
    }
  }

  getUsers() : User[] {
    return this.users;
  }

  deleteUser(id: string) : User | void {
    const userIndex = this.users.findIndex( (user) => user.id === id);
    if(userIndex >= 0) {
      return this.users.splice(userIndex, 1)[0];
    } else {
      throw new Error("User not found")
    }
  }

  updateHobbies(id: string, hobbies: string[]) : void {
    const user = this.getUser(id);
    if(user === undefined) {
      throw new Error("User not found");
    } else {
      user.hobbies = hobbies;
    }
    console.log(this.users);
  }

  getHobbies(id: string) : string[] {
    const user = this.getUser(id);
    if(user === undefined) {
      throw new Error("User not found");
    } else {
      return user.hobbies;
    }
  }
}