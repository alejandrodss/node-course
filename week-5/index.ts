import UserModel from './UserModel.js';
import * as endpoint from './endpoints.js';
import * as http from 'http';
import type { User } from './types.d.ts';
import Datasource from './Datasource';

const userModel = new UserModel(Datasource);

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  if(req.method === 'GET') {
    let response: User | User[] | undefined;
    response = endpoint.processGetRequest(userModel, req);
    if(response !== undefined) {
      res.statusCode = 200;
      console.log(response);
      res.end(JSON.stringify(response));
    } else {
      res.statusCode = 404;
      res.end('{"status": "Not found"}');
    }
  } else if(req.method === 'POST') {

  } else if(req.method === 'DELETE') {

  } else if( req.method === 'PATCH' || req.method === 'PUT') {

  } else {
    res.statusCode = 400;
    res.end('{error: "Invalid HTTP method"}');
  }
});

server.listen(8000, () => {
  console.log('Server is running on port 3000');
});
