'use strict'

const path = require("path");
const fs = require("fs-extra");

const storage = path.resolve(process.env.HOME_DIR, "storage.json");

async function reader(event, context) {
  const param = event.pathParameters.param;

  const result = await fs.readJson(storage);

  return success({param, timestamp: new Date(result.timestamp).toString()});
}

async function writer(event, context) {
  await fs.ensureFile(storage);

  const timestamp = new Date().getTime();
  await fs.writeJson(storage, {timestamp});

  return success("OK");
}

function success(result) {
  return {
    statusCode: 200,
    body: result,
  };
}

async function catchErrors(event, context) {
  try {
    return await this(event, context);
  } catch (e) {
    return {
      statusCode: 500,
      body: e
    }
  }
}

module.exports = {
  reader: catchErrors.bind(reader),
  writer: catchErrors.bind(writer),
}
