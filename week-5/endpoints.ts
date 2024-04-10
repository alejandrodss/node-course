import * as url from 'url';
import * as http from 'http';
import UserModel from './UserModel';
import type { HobbiesResponse, PostUser, UserResponse, SuccessfulResponse } from './types';

const domain = "http://localhost:8000";

export const processGetRequest = (userModel: UserModel, req: http.IncomingMessage): HobbiesResponse | undefined | UserResponse[] => {
  const url = req.url;
  if(url === undefined ) {
    return;
  }
  const regexp = /^\/api\/users\/(?<userid>[a-zA-Z0-9\-]+)\/hobbies$/ig;
  if(url === '/api/users'){
    return userModel.getUsers();
  } else {
    for(const match of url.matchAll(regexp)) {
      if(match.groups !== undefined) {
        return userModel.getHobbiesResponse(match.groups.userid);
      } else {
        return;
      }
    }
  }
  return;
};

export const processPostRequest = async (userModel : UserModel, req: http.IncomingMessage) => {
  const url = req.url;
  if (url === undefined) {
    undefined;
  }
  try {
    if (url === '/api/users') {
      const parsedBody = await parseRequestBody(req);
      return userModel.createUser(parsedBody as PostUser);
    } else {
      return;
    }
  } catch (error) {
    throw error;
  }
}

export const processDeleteRequest = (userModel : UserModel, req : http.IncomingMessage) : SuccessfulResponse | undefined => {
  const url = req.url;
  if (url === undefined) {
    return;
  }
  const regexp = /^\/api\/users\/(?<userid>[a-zA-Z0-9\-]+)$/ig;
  for (const match of url.matchAll(regexp)) {
    if (match.groups !== undefined) {
      return userModel.deleteUser(match.groups.userid);
    } else {
      return;
    }
  }
}

export const processPatchRequest = async (userModel : UserModel, req : http.IncomingMessage) => {
  const url = req.url;
  if (url === undefined) {
    return;
  }
  const regexp = /^\/api\/users\/(?<userid>[a-zA-Z0-9\-]+)\/hobbies$/ig;
  try {
    const parsedBody = await parseRequestBody(req);
    for (const match of url.matchAll(regexp)) {
      if (match.groups !== undefined) {
        let userId = match.groups.userid;
        if ((parsedBody as Object).hasOwnProperty("hobbies")) {
          let hobbies = (parsedBody as Object)["hobbies"];
          return userModel.updateHobbies(userId, hobbies);
        } else {
          const error = new Error('Missing key \'hobbies\'');
          error.name = 'MissingKeyError';
          throw error;
        }
      } else {
        return;
      }
    }
  } catch (error) {
    throw error;
  }
}

const parseRequestBody = (req: http.IncomingMessage) => new Promise((resolve, reject) => {
  let body: string = '';

  req.on('data', (chunk) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    resolve(JSON.parse(body));
  });

  req.on('error', (error: Error) => {
    reject(error);
  });
});
