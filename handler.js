'use strict'

const uuid = require("uuid");
const AWS = require('aws-sdk');

const db = new AWS.DynamoDB.DocumentClient();

module.exports.create = async (event, context) => {
  const timestamp = new Date().getTime();

  const key = uuid.v4();
  const value = event.pathParameters.value;

  const r = await db.put({
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      key,
      value,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  })

  return {
    statusCode: 200,
    body: JSON.stringify(r),
  };
};

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
// module.exports.list = async (event, context) => {
//   const result = await db.scan({TableName: process.env.DYNAMODB_TABLE});
//
//   return {
//     statusCode: 200,
//     body: JSON.stringify(result.Items),
//   }
// }
