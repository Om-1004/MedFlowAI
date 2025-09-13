import { CognitoUserPool } from "amazon-cognito-identity-js";

export const cognitoAuthConfig = {
  UserPoolId: import.meta.env.VITE_USER_POOL_ID,
  ClientId: import.meta.env.VITE_CLIENT_ID,
};

console.log("Cognito Config:", cognitoAuthConfig);

export const userPool = new CognitoUserPool(cognitoAuthConfig);