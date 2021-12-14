import { AccountContext } from "./account"
import React, { useState, useContext } from "react";

const Signin = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { authenticate } = useContext(AccountContext);
    const onSignin = (event) => {
        event.preventDefault();

        authenticate(email, password)
            .then(data => {
                console.log("Logged in!", data)
            })
            .catch(err => {
                console.log("Failed to login", err)
            })
    }

    return (
        <div>
            <h1>Sign in</h1>
            <form onSubmit={onSignin}>
                <label htmlFor="email"> Email</label>
                <input value={email} onChange={(event) => { setEmail(event.target.value) }}></input><br />

                <label htmlFor="password"> Password</label>
                <input value={password} onChange={(event) => { setPassword(event.target.value) }}></input><br />
                <button type="submit">Sign in</button>
            </form>
        </div>
    )
}

export default Signin;


