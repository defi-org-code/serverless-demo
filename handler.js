'use strict'

const uuid = require("uuid");
const fs = require("fs");
const cp = require("child_process");

module.exports.alive = async (event, context) => doExec(() => {
  return {
    statusCode: 200,
    body: "OK"
  }
});

module.exports.exec = async (event, context) => doExec(() => {
  const result = cp.execSync(event.pathParameters.value, {encoding: "utf8"});

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  }
});

const path = `/mnt/efs/foo.json`;

module.exports.create = async (event, context) => doExec(() => {
  const timestamp = new Date().getTime();

  const key = uuid.v4();
  const value = event.pathParameters.value;

  const data = JSON.stringify({
    timestamp,
    key,
    value
  });

  fs.writeFileSync(path, data, {encoding: "utf8"});

  return {
    statusCode: 200,
    body: data,
  };
});

module.exports.list = async (event, context) => doExec(() => {
  const result = JSON.parse(fs.readFileSync(path, {encoding: "utf8"}));

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
})

async function doExec(fn) {
  try {
    return await fn();
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e.stack)
    }
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
