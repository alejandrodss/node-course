import * as url from 'url';
import * as http from 'http';
import UserModel from './UserModel';
import type { User } from './types';

const domain = "http://localhost:8000";

export const processGetRequest = (userModel: UserModel, req: http.IncomingMessage): User | undefined | User[] => {
  const url = req.url;
  if(url === undefined ) {
    return undefined;
  }
  const regexp = /api\/users\/(?<userid>[a-zA-Z0-9]+)\/hobbies/ig;
  if(url === '/api/users'){
    return userModel.getUsers();
  } else {
    /*console.log("regexp pass");
    const matches = [...url.matchAll(regexp)];
    console.log(matches);*/
    for(const match of url.matchAll(regexp)) {
      console.log("matches regexp");
      if(match.groups !== undefined) {
        console.log("fetching hobbies");
        return userModel.getUser(match.groups.userid);
      } else {
        return undefined;
      }
    }
  }
  console.log(url);
  return undefined;
};