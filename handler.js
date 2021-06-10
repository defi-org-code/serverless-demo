'use strict'

const uuid = require("uuid");
const fs = require("fs");

module.exports.alive = async (event, context) => exec(() => {
  return {
    statusCode: 200,
    body: "OK"
  }
});

const path = `/mnt/efs/foo.json`;

module.exports.create = async (event, context) => exec(() => {
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

module.exports.list = async (event, context) => exec(() => {
  const result = JSON.parse(fs.readFileSync(path, {encoding: "utf8"}));

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  }
})

async function exec(fn) {
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
