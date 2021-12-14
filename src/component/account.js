import React, { createContext } from "react";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import UserPool from "../userpool";

const AccountContext = createContext()

const Account = (props) => {

    const getSession = async() => {
        return await new Promise((resolve, reject) => {
            const user = UserPool.getCurrentUser() //retrieve current user from local storage
            if(user){
                user.getSession(async (err, session) => {
                    if(err){
                        reject()
                    }else{
                        const attributes = await new Promise((resolve, reject) => {
                            user.getUserAttributes((err, attributes) => {
                                if(err){
                                    reject(err);                                    
                                }else{
                                    console.log('session validity: ' + session.isValid())
                                    const results = {};
                                    for (let attribute of attributes){
                                        const { Name, Value } = attribute;
                                        results[Name] = Value
                                    }
                                    resolve(results);
                                }
                            })
                        })
                        resolve({user, ...session, ...attributes});
                    }
                })
            }else{
                reject()
            }
        })
    }

    const authenticate = async (Email, Password) => {
        return await new Promise((resolve, reject) => {
            const authenticationDetails = new AuthenticationDetails({ Email, Password });
            const cognitoUser = new CognitoUser({ Username: Email, Pool: UserPool, });
        
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: function (data) {
                    console.log("onSuccess :", data)
                    resolve(data)
                },
            
                onFailure: function (err) {
                    alert(err.message || JSON.stringify(err));
                    reject(err)
                },
            });
        })
        
    }

    const logout = () => {
        const user = UserPool.getCurrentUser()
        if(user){
            user.signOut();            
        }
    }

    return(
        <AccountContext.Provider value={{ authenticate, getSession, logout }}>
            {props.children}
        </AccountContext.Provider>
    )
};

export {Account, AccountContext}