export const buildResponse = (statusCode: number, body: unknown) => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  },
  body: JSON.stringify(body),
});
