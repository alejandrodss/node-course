import { UUID, randomUUID } from 'crypto';
import type { User, PostUser } from './types.d.ts';

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

  createUser(user: PostUser) : User {
    let newUser: User = {
      id: randomUUID(),
      hobbies: [],
      ...user
    }
    this.users.push(newUser);
    return newUser;
  }

  getUsers() : User[] {
    return this.users;
  }

  deleteUser(id: string) : User {
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
      const newHobbies = new Set([...user.hobbies, ...hobbies])
      user.hobbies = [...newHobbies];
    }
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