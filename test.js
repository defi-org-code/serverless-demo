const handler = require("./handler")

async function main() {
  const result1 = await handler.writer();
  console.log(result1)
  const result2 = await handler.reader({pathParameters: {param: "foo"}});
  console.log(result2)
}

main().catch(e => {
  console.error(e)
})
