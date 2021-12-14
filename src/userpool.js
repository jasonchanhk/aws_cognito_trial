import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
    UserPoolId: "eu-west-2_vNvllnLEW",
    ClientId: "5772keba0gokemn41ol8ve8r7h"
}

export default new CognitoUserPool(poolData)