import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";

export class ProductServiceStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const partialLambdaProps: Pick<lambda.FunctionProps, "runtime" | "code"> = {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset("handlers"),
    };

    const getProductsList = new lambda.Function(this, "GetProductsListLambda", {
      ...partialLambdaProps,
      handler: "getProductsList.handler",
    });

    const getProduct = new lambda.Function(this, "GetProductLambda", {
      ...partialLambdaProps,
      handler: "getProduct.handler",
    });

    const api = new apigateway.RestApi(this, "ProductApi", {
      restApiName: "Product API",
    });

    const products = api.root.addResource("products");
    products.addMethod(
      "GET",
      new apigateway.LambdaIntegration(getProductsList)
    );

    const product = products.addResource("{productId}");
    product.addMethod("GET", new apigateway.LambdaIntegration(getProduct));
  }
}
