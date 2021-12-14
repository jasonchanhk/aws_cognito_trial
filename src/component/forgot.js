import React, { useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../userpool";

const Forgot = () => {

    const [email, setEmail] = useState("");
    const [canProceed, setCanProceed] = useState(false);
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");

    const userData = { Username: email, Pool: UserPool }
    const cognitoUser = new CognitoUser(userData);

    const onSubmit = (event) => {
        event.preventDefault();

        cognitoUser.forgotPassword({
            onSuccess: function (data) {
                // successfully initiated reset password request
                console.log('CodeDeliveryData from forgotPassword: ' + JSON.stringify(data));                
            },
            onFailure: function (err) {
                alert(err.message || JSON.stringify(err));
            },
            inputVerificationCode: data => {
              console.log("Input code:", data);
              setCanProceed(true)
            }
        });
    }

    const onReset = (event) => {
        event.preventDefault();

        cognitoUser.confirmPassword(code, password, {
            onSuccess() {
                console.log('Password confirmed!');
            },
            onFailure: function (err) {
                console.log('Password not confirmed!');
            }
        });
    }

    return (
        <div>
            <h1>Forgot your password?</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(event) => { setEmail(event.target.value) }}></input><br />
                <button type="submit">{canProceed ? "Resend email" : "Continue"}</button>
            </form>
            {canProceed &&
                <form onSubmit={onReset}>
                    <label htmlFor="code">Verification code</label>
                    <input value={code} onChange={(event) => { setCode(event.target.value) }}></input><br />

                    <label htmlFor="password">New Password</label>
                    <input value={password} onChange={(event) => { setPassword(event.target.value) }}></input><br />
                    <button type="submit">Reset password</button>
                </form>
            }
        </div>
    )
}

export default Forgot;