const path = require("path");
const fs = require("fs-extra");
const fetch = require("node-fetch");

const storage = path.resolve(process.env.HOME_DIR, "storage.json");

// handlers

async function reader(event, context) {
  const param = event.pathParameters.param;
  console.log(`reader running with param = ${param}`);
  const {timestamp, writeIP} = await fs.readJson(storage);
  const readIP = (await fetchJson()).origin;
  return success({param, timestamp: new Date(timestamp), writeIP, readIP, event, context});
}

async function writer(event, context) {
  await fs.ensureFile(storage);
  const timestamp = new Date().getTime();
  const writeIP = (await fetchJson()).origin;
  await fs.writeJson(storage, {timestamp, writeIP});
  return success("OK");
}

// wrapper

function success(result) {
  return {
    statusCode: 200,
    body: JSON.stringify(result, null, 2),
  };
}

async function catchErrors(event, context) {
  try {
    return await this(event, context);
  } catch (err) {
    const message = err.stack || err.toString();
    console.error(message);
    return {
      statusCode: 500,
      body: message,
    };
  }
}

// example

async function fetchJson() {
  const response = await fetch("https://httpbin.org/gzip"); // some example JSON web service
  return await response.json();
}

// exports

module.exports = {
  reader: catchErrors.bind(reader),
  writer: catchErrors.bind(writer),
}
