import UserModel from './UserModel';
import { processDeleteRequest, processGetRequest, processPatchRequest, processPostRequest } from './endpoints';
import * as http from 'http';
import type { User } from './types.d.ts';
import Datasource from './Datasource';

const userModel = new UserModel(Datasource);

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if(req.method === 'GET') {
    let response: User | User[] | undefined;
    response = processGetRequest(userModel, req);
    getServerResponse(response, res);
  }
  else if(req.method === 'POST') {
      let response = processPostRequest(userModel, req);
      
      response.then((response) => {
        getServerResponse(response, res);
      })
      .catch((error: Error) => {
        res.statusCode = 500;
        res.end('{"status": "There was an error processing the request"}');
      });
  }
  else if(req.method === 'DELETE') {
    try {
      let response = processDeleteRequest(userModel, req);
      getServerResponse(response, res);
    } catch(error) {
      res.statusCode = 404;
      res.end(`{"status": "${error.message}"}`);
    }
  }
  else if( req.method === 'PATCH' || req.method === 'PUT') {
    try {
      let response = processPatchRequest(userModel, req);
      response.then((response) => {
        getServerResponse(response, res);
      })
      .catch((error: Error) => {
        res.statusCode = 422;
        res.end(`{"status": "${error}"}`);
      });
    } catch (error) {
      res.statusCode = 404;
      res.end(`{"status": "${error.message}"}`);
    }
  }
  else {
    res.statusCode = 400;
    res.end('{error: "Invalid HTTP method"}');
  }
});

server.listen(8000, () => {
  console.log('Server is running on port 8000');
});

const getServerResponse = (response, res:http.ServerResponse) => {
  if (response !== undefined) {
    res.statusCode = 200;
    console.log(response);
    res.end(JSON.stringify(response));
  } else {
    res.statusCode = 404;
    res.end('{"status": "Not found"}');
  }
};
