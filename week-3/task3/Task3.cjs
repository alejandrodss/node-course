const {createReadStream, createWriteStream} = require('fs');
const path = require('path');
const csv =require("csvtojson");

const filePath = path.join(__dirname, 'csv', 'data.csv');
const outputFilePath = path.join(__dirname, 'output', 'output.txt');

const readStream = createReadStream(filePath);

const writeStream = createWriteStream(outputFilePath);

readStream.pipe(csv()).pipe(writeStream);
