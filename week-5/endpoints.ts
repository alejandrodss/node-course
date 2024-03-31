import * as url from 'url';
import * as http from 'http';
import UserModel from './UserModel';
import type { HobbiesResponse, PostUser, UserResponse, SuccessfulResponse } from './types';

const domain = "http://localhost:8000";

export const processGetRequest = (userModel: UserModel, req: http.IncomingMessage): HobbiesResponse | undefined | UserResponse[] => {
  const url = req.url;
  if(url === undefined ) {
    return undefined;
  }
  const regexp = /^\/api\/users\/(?<userid>[a-zA-Z0-9\-]+)\/hobbies$/ig;
  if(url === '/api/users'){
    return userModel.getUsers();
  } else {
    for(const match of url.matchAll(regexp)) {
      if(match.groups !== undefined) {
        return userModel.getHobbiesResponse(match.groups.userid);
      } else {
        return undefined;
      }
    }
  }
  return undefined;
};

export const processPostRequest = (userModel: UserModel, req: http.IncomingMessage) => new Promise((resolve, reject) => {
  const url = req.url;
  if (url === undefined) {
    resolve(undefined);
  }
  if(url === '/api/users') {
    parseRequestBody(req).then((parsedBody) => {
      const newUser = userModel.createUser(parsedBody as PostUser);
      resolve(newUser);
    })
    .catch((error: Error) => {
      reject(error);
    });
  } else {
    resolve(undefined);
  }
});

export const processDeleteRequest = (userModel : UserModel, req : http.IncomingMessage) : SuccessfulResponse | undefined => {
  const url = req.url;
  if (url === undefined) {
    return undefined;
  }
  const regexp = /^\/api\/users\/(?<userid>[a-zA-Z0-9\-]+)$/ig;
  for (const match of url.matchAll(regexp)) {
    if (match.groups !== undefined) {
      return userModel.deleteUser(match.groups.userid);
    } else {
      return undefined;
    }
  }
}

export const processPatchRequest = (userModel : UserModel, req : http.IncomingMessage) => new Promise((resolve, reject) => {
  const url = req.url;
  if (url === undefined) {
    resolve(undefined);
  } else {
    const regexp = /^\/api\/users\/(?<userid>[a-zA-Z0-9\-]+)\/hobbies$/ig;
    let isMatched = false;
    for (const match of url.matchAll(regexp)) {
      isMatched = true;
      if (match.groups !== undefined) {
        let userId = match.groups.userid;
        parseRequestBody(req)
        .then((parsedBody) => {
          if((parsedBody as Object).hasOwnProperty("hobbies")){
            let hobbies = (parsedBody as Object)["hobbies"];
            const userResponse = userModel.updateHobbies(userId, hobbies);
            resolve(userResponse);
          } else {
            reject('Missing key \'hobbies\'');
          }
        }).catch((error: Error) => {
          reject(error.message);
        });
      } else {
        resolve(undefined);
      }
    }
    if(!isMatched) resolve(undefined);
  }
});

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
