/* eslint-disable @typescript-eslint/no-var-requires */
const { buildResponse } = require("./utils");
const products = require("./data.json");

exports.handler = async (event) => {
  try {
    const id = event.pathParameters.productId;
    const product = products.find(p => p.id === id);
    return buildResponse(200, product);
  } catch (err) {
    return buildResponse(500, {
      message: err.message,
    });
  }
};
