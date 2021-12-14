import React, { useState, useEffect, useContext } from "react";
import { AccountContext } from "./account";

const Setting = () => {
    const { getSession } = useContext(AccountContext);
    const [loggedin, setLoggedin] = useState(false)
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    useEffect(() => {
        getSession()
        .then(() => {
            setLoggedin(true)
        })
    }, [])

    const onSubmit = (event) => {
        event.preventDefault();

        getSession()
        .then(({user}) => {
            user.changePassword(password, newPassword, (err, result) => {
                if(err){
                    console.error(err);
                }else{
                    console.log(result)
                }
            })
        })
    }

    return(
        <div>
            {loggedin && (
                <div>
                    <h1>Settings</h1>                
                    <form onSubmit={onSubmit}>
                        <label htmlFor="password">Password</label>
                        <input value={password} onChange={(event) => { setPassword(event.target.value) }}></input><br />

                        <label htmlFor="newPassword">New password</label>
                        <input value={newPassword} onChange={(event) => { setNewPassword(event.target.value) }}></input><br />
                        <button type="submit">Change password</button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default Setting;