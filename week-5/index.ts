import UserModel from './UserModel';
import { processDeleteRequest, processGetRequest, processPatchRequest, processPostRequest } from './endpoints';
import * as http from 'http';
import type { UserResponse, HobbiesResponse } from './types.d.ts';
import Datasource from './Datasource';

const userModel = new UserModel(Datasource);

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if(req.method === 'GET') {
    let response: HobbiesResponse | UserResponse[] | undefined;
    try {
      response = processGetRequest(userModel, req);
      const cacheVisibility =  req.url === '/api/users' ? true : false
      setCacheHeaders(cacheVisibility, res);
      setServerResponse(response, res);
    } catch(error) {
      res.statusCode = 404;
      res.end(`{"data": null,\n"error": "${error.message}"}`);
    }
  }
  else if(req.method === 'POST') {
      let response = processPostRequest(userModel, req);
      
      response.then((response) => {
        setServerResponse(response, res);
      })
      .catch((error: Error) => {
        res.statusCode = 500;
        res.end(`{"data": null,\n"status": "There was an error processing the request. Reason: ${error.message}"}`);
      });
  }
  else if(req.method === 'DELETE') {
    try {
      let response = processDeleteRequest(userModel, req);
      setServerResponse(response, res);
    } catch(error) {
      res.statusCode = 404;
      res.end(`{"data": null,\n"error": "${error.message}"}`);
    }
  }
  else if( req.method === 'PATCH' || req.method === 'PUT') {
    try {
      let response = processPatchRequest(userModel, req);
      response.then((response) => {
        setServerResponse(response, res);
      })
      .catch((error: Error) => {
        res.statusCode = 422;
        res.end(`{"data": null,\n"error": "${error}"}`);
      });
    } catch (error) {
      res.statusCode = 404;
      res.end(`{"data": null,\n"error": "${error.message}"}`);
    }
  }
  else {
    res.statusCode = 400;
    res.end('{"error": "Invalid HTTP method"}');
  }
});

server.listen(8000, () => {
  console.log('Server is running on port 8000');
});

const setServerResponse = (response, res:http.ServerResponse) => {
  if (response !== undefined) {
    res.statusCode = 200;
    const serverResponse = {
      data: response,
      error: null
    }
    res.end(JSON.stringify(serverResponse));
  } else {
    res.statusCode = 404;
    res.end('{"data": null,\n"status": "Not found"}');
  }
};

const setCacheHeaders = (visibility: Boolean, res : http.ServerResponse) : void => {
  const date = new Date();
  const visibilityValue = visibility ? 'public' : 'private'
  res.setHeader('Cache-Control', `max-age=3600, ${visibilityValue}`);
  res.setHeader('ETag', `nc-${date.getTime()}`);
  res.setHeader('Last-Modified', date.toISOString());
  date.setSeconds(date.getSeconds()+ 3600);
  res.setHeader('Expires', date.toISOString());
}
