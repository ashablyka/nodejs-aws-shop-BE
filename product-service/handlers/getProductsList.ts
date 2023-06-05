import { buildResponse } from "./utils";

export const handler = async (event: any) => {
  try {
    console.log("event:", event);
    return buildResponse(200, {
      products: [],
    });
  } catch (err: any) {
    return buildResponse(500, {
      message: err.message,
    });
  }
};
