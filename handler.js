'use strict'

const uuid = require("uuid");
const AWS = require('aws-sdk');
const fs = require("fs");

module.exports.create = async (event, context) => {
  const timestamp = new Date().getTime();

  const key = uuid.v4();
  const value = event.pathParameters.value;

  const path = `${process.cwd()}/my-example/foo.json`;

  fs.writeFileSync(path, JSON.stringify({key: value}), {encoding: "utf8"});

  return {
    statusCode: 200,
    body: JSON.stringify("OK"),
  };
};

module.exports.list = async (event, context) => {

  const path = `${process.cwd()}/my-example/foo.json`;

  const result = JSON.parse(fs.readFileSync(path, {encoding: "utf8"}));

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
}

// module.exports.update = async (event, context) => {
//   const key = uuid.v4();
//   const value = event.pathParameters.value;
//
//   return {
//     statusCode: 200,
//     body: JSON.stringify({key, value})
//   }
// }
//
// module.exports.get = async (event, context) => {
// }
//
// module.exports.delete = async (event, context) => {
// }
//
