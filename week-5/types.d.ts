export interface User {
  id: string,
  name: string,
  email: string,
  hobbies: string[]
}

export interface PostUser {
  name: string,
  email: string
}

interface UserData {
  id: string,
  name: string,
  email: string
}

interface links {
  self: string,
  hobbies: string
}

export interface UserResponse {
  user: UserData,
  links: links
}

export interface HobbiesResponse {
  hobbies: string [],
  links: {
    self: string,
    user: string
  }
}
