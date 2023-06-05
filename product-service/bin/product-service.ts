#!/usr/bin/env node
// import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apiGateway from "@aws-cdk/aws-apigatewayv2-alpha";
import { HttpLambdaIntegration } from "@aws-cdk/aws-apigatewayv2-integrations-alpha";
import {
  NodejsFunction,
  NodejsFunctionProps,
} from "aws-cdk-lib/aws-lambda-nodejs";

const app = new cdk.App();

const stack = new cdk.Stack(app, "ProductServiceStack", {
  env: { region: "eu-west-1" },
});

const sharedLambdaProps: Partial<NodejsFunctionProps> = {
  runtime: lambda.Runtime.NODEJS_18_X,
  environment: {
    PRODUCT_AWS_REGION: "eu-west-1",
  },
};

const getProductsList = new NodejsFunction(stack, "GetProductsListLambda", {
  ...sharedLambdaProps,
  functionName: "getProductsList",
  entry: "handlers/getProductsList.ts",
});

const api = new apiGateway.HttpApi(stack, "ProductApi", {
  corsPreflight: {
    allowHeaders: ["*"],
    allowOrigins: ["*"],
    allowMethods: [apiGateway.CorsHttpMethod.ANY],
  },
});

api.addRoutes({
  integration: new HttpLambdaIntegration(
    "GetProductsListIntegration",
    getProductsList
  ),
  path: "/products",
  methods: [apiGateway.HttpMethod.GET],
});
