exports.handler = async (event) => {
  const response = {
    statusCode: 200,
    body: require("./docs"),
  };
  return response;
};
