import React, { useState } from "react";
import UserPool from "../userpool";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";

const Signup = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");    
    const [ given_name, setGiven_name ] = useState("");    
    const [ family_name, setFamily_name ] = useState("");    
    const [ locale, setLocale ] = useState("");
    const [ phone_number, setPhone_number ] = useState("");

    const attributefam = new CognitoUserAttribute({Name: 'family_name', Value: family_name});
    const attributegiv = new CognitoUserAttribute({Name: 'given_name', Value: given_name})
    const attributeloca = new CognitoUserAttribute({Name: 'locale', Value:locale})
    const attributephone = new CognitoUserAttribute({Name: 'phone_number', Value:phone_number})

    const attributelist = [attributefam, attributegiv, attributephone, attributeloca];

    const onSubmit = (event) => {
        event.preventDefault();
        
        console.log(attributelist)
        UserPool.signUp(email, password, [attributefam, attributegiv, attributeloca, attributephone], null, (err, data) => {
            if(err){
                console.log(err);
            }
            console.log(data)
        })
    }

    return(
        <div>
            <h1>Sign up</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="email"> Email</label>
                <input value={email} onChange={(event) => {setEmail(event.target.value)}}></input><br/>

                <label htmlFor="given_name"> given_name</label>
                <input value={given_name} onChange={(event) => {setGiven_name(event.target.value)}}></input><br/>

                <label htmlFor="family_name"> family_name</label>
                <input value={family_name} onChange={(event) => {setFamily_name(event.target.value)}}></input><br/>

                <label htmlFor="locale"> locale</label>
                <input value={locale} onChange={(event) => {setLocale(event.target.value)}}></input><br/>

                <label htmlFor="phone_number"> phone_number</label>
                <input value={phone_number} onChange={(event) => {setPhone_number(event.target.value)}}></input><br/>
                
                <label htmlFor="password"> Password</label>
                <input value={password} onChange={(event) => {setPassword(event.target.value)}}></input><br/>
                <button type="submit">Sign up</button>
            </form>
        </div>
    )
}
export default Signup;