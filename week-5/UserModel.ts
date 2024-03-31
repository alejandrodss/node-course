import { UUID, randomUUID } from 'crypto';
import type { User, PostUser, UserResponse, HobbiesResponse, SuccessfulResponse } from './types.d.ts';

export default class UserModel {
  users: User[];
  constructor(
    public initialUsers: User[]
  ) {
    this.users = initialUsers;
  }

  getUser(id: string) : User | undefined {
    return this.users.find((user) => user.id === id);
  }

  getUserData(id: string) : UserResponse | undefined {
    const user = this.getUser(id);
    if (user === undefined) {
      return;
    }
    return this._getUserResponse(user);
  }

  createUser(user: PostUser) : UserResponse {
    let newUser: User = {
      id: randomUUID(),
      hobbies: [],
      ...user
    }
    this.users.push(newUser);
    return this._getUserResponse(newUser);
  }

  getUsers() : UserResponse[] {
    let users : UserResponse[] = []
    this.users.forEach(user => {
      users.push(this._getUserResponse(user));
    });
    return users;
  }

  deleteUser(id: string) : SuccessfulResponse {
    const userIndex = this.users.findIndex( (user) => user.id === id);
    if(userIndex >= 0) {
      const deletedUser = this.users.splice(userIndex, 1)[0];
      return({ success: true });
    } else {
      throw new Error(`User with id ${id} doesn't exist`);
    }
  }

  /* Return the deleted user
  deleteUser(id: string) : UserResponse {
    const userIndex = this.users.findIndex( (user) => user.id === id);
    if(userIndex >= 0) {
      const deletedUser = this.users.splice(userIndex, 1)[0];
      return this._getUserResponse(deletedUser);
    } else {
      throw new Error(`User with id ${id} doesn't exist`);
    }
  } */

  updateHobbies(id: string, hobbies: string[]) : UserResponse {
    const user = this.getUser(id);
    if(user === undefined) {
      throw new Error(`User with id ${id} doesn't exist`);
    } else {
      const newHobbies = new Set([...user.hobbies, ...hobbies])
      user.hobbies = [...newHobbies];
      return this._getUserResponse(user);
    }
  }

  getHobbies(id: string) : string[] {
    const user = this.getUser(id);
    if(user === undefined) {
      throw new Error(`User with id ${id} doesn't exist`);
    } else {
      return user.hobbies;
    }
  }

  getHobbiesResponse(id: string): HobbiesResponse {
    const hobbies: string[] = this.getHobbies(id);
    return({
      hobbies,
      links: {
        self: `/api/users/${id}/hobbies`,
        user: `/api/users/${id}`
      }
    });
  }

  private _getUserResponse(user: User): UserResponse {
    return ({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      links: {
        self: `/api/users/${user.id}`,
        hobbies: `/api/users/${user.id}/hobbies`
      }
    });
  }
}

