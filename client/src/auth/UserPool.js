import { CognitoUserPool } from "amazon-cognito-identity-js";
import { cognitoAuthConfig } from "./cognitoConfig";

export default new CognitoUserPool(cognitoAuthConfig);
