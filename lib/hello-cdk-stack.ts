import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { ApiGateway } from './ApiGateway';
import { Lambda } from './Lambda';


// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const api = new ApiGateway(this);
    // The code that defines your stack goes here
    const healthLambda = new Lambda(this, "health");
    const postLambda = new Lambda(this, "post");
    api.getIntegration("GET","/health",healthLambda);
    api.postIntegration("POST","/post",postLambda);
    // example resource
    // const queue = new sqs.Queue(this, 'HelloCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
