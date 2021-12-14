import React, { useState } from "react";
import UserPool from "../userpool";
import { CognitoUser } from "amazon-cognito-identity-js";

const Verify = () => {

    const [vcode, setVcode] = useState("");
    const [email, setEmail] = useState("");

    const userData = { Username: email, Pool: UserPool }
    const cognitoUser = new CognitoUser(userData);

    const verifyCode = (event) => {
        event.preventDefault();
        console.log(userData)
        cognitoUser.confirmRegistration(vcode, true, function (err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log('call result: ' + result);
        });
    }

    const resendCode = (event) => {

        event.preventDefault();
        cognitoUser.resendConfirmationCode(function(err, result) {
            if (err) {
                alert(err.message || JSON.stringify(err));
                return;
            }
            console.log('call result: ' + result);
        });
    }

    return (
        <div>
            <h1>Verify</h1>
            <form onSubmit={verifyCode}>
                <label htmlFor="email"> Email</label>
                <input value={email} onChange={(event) => { setEmail(event.target.value) }}></input><br />

                <label htmlFor="vcode"> Verification code</label>
                <input value={vcode} onChange={(event) => { setVcode(event.target.value) }}></input><br />
                <button type="submit">Verify your email</button>
            </form><br />

            <button onClick={resendCode}>Resend verification code</button>
        </div>
    )
}
export default Verify;