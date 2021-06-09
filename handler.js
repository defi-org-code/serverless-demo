'use strict'

module.exports.hello = async (event, context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello, the current time is ${new Date().toTimeString()}.`,
    }),
  };
  return response;
};
