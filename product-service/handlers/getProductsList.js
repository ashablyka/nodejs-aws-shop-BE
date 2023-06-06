/* eslint-disable @typescript-eslint/no-var-requires */
const { buildResponse } = require("./utils");
const products = require("./data.json");

exports.handler = async () => {
  try {
    return buildResponse(200, products);
  } catch (err) {
    return buildResponse(500, {
      message: err.message,
    });
  }
};
