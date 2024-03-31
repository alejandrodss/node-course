import * as url from 'url';
import * as http from 'http';
import UserModel from './UserModel';
import type { PostUser, User } from './types';

const domain = "http://localhost:8000";

export const processGetRequest = (userModel: UserModel, req: http.IncomingMessage): User | undefined | User[] => {
  const url = req.url;
  if(url === undefined ) {
    return undefined;
  }
  const regexp = /^\/api\/users\/(?<userid>[a-zA-Z0-9]+)\/hobbies$/ig;
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
  return undefined;
};

export const processPostRequest = (userModel: UserModel, req: http.IncomingMessage) => new Promise((resolve, reject) => {
  const url = req.url;
  if (url === undefined) {
    resolve(undefined);
  }
  console.log("url is ", url);
  if(url === '/api/users') {
    console.log("we're here");
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

export const processDeleteRequest = (userModel : UserModel, req : http.IncomingMessage) : User | undefined => {
  const url = req.url;
  if (url === undefined) {
    return undefined;
  }
  console.log("requested url", url);
  const regexp = /^\/api\/users\/(?<userid>[a-zA-Z0-9]+)$/ig;
  for (const match of url.matchAll(regexp)) {
    console.log("matches regexp");
    if (match.groups !== undefined) {
      console.log("deleting user");
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
    console.log("url is ", url);
    const regexp = /^\/api\/users\/(?<userid>[a-zA-Z0-9\-]+)\/hobbies$/ig;
    //resolver promesa si no hay match
    for (const match of url.matchAll(regexp)) {
      console.log("matches regexp");
      if (match.groups !== undefined) {
        let userId = match.groups.userid;
        console.log("updating user's hobbies");

        parseRequestBody(req)
        .then((parsedBody) => {
          if((parsedBody as Object).hasOwnProperty("hobbies")){
            let hobbies = (parsedBody as Object)["hobbies"];
            userModel.updateHobbies(userId, hobbies);
            resolve(`{"status": "User ${userId} updated"}`);
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
