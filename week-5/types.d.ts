export interface User {
  id: string,
  name: string,
  email: string,
  hobbies: string[]
}

export type PostUser = Pick<User, 'name' | 'email'>;

type UserData = Omit<User, 'hobbies'>;

interface Links {
  self: string,
  hobbies: string
}

export interface UserResponse {
  user: UserData,
  links: Links
}

export interface HobbiesResponse {
  hobbies: string [],
  links: {
    self: string,
    user: string
  }
}

export interface SuccessfulResponse {
  success: true
}
