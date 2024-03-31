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

export interface UserResponse {
  id: string,
  name: string,
  email: string
}

export interface ResponseWithData {
  data: {
    user: UserResponse,
    links: {
      self: string,
      hobbies: string
    }
  }
}
