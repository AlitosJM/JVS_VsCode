//import React, {useState,useEffect,useContext} from 'react';
import React, {useState,useEffect} from 'react';
import { API } from '../api-service';
// import { TokenContext } from '../index';
import {useCookies} from 'react-cookie'

function Auth(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginView,SetIsLoginView] = useState(true);

    //const {token, setToken} = useContext(TokenContext);
    const [token, setToken] = useCookies(['mr-token']);

    useEffect( () => {
        // console.log(token);
        if (token['mr-token']) window.location.href ='/movies';
    },[token])

    const loginClicked = () =>{
        API.loginUser({username, password})
        .then( resp => setToken('mr-token',resp.token) )
        .catch( error => console.log(error) );
        
        if (token['mr-token'] === 'undefined') 
            {console.log('tokencito indefinido')}
        else
            {console.log(`tokencito bien... ${token['mr-token']}`);}

    }

    const registerClicked= () =>{
        API.registerUser({username, password})
        .then( () => loginClicked() )
        .then( resp => console.log(resp) )
        .catch( error => console.log(error) );

    }
    const isDisable = username.length===0 || password.length===0;
    return (

        <div className="App">
            <header className="App-header">
                {isLoginView ? <h1> Login </h1> : <h1> Register </h1>}  
            </header>

            <div className="login-container">                   

                <label htmlFor = "username"> Username </label><br/>
                <input id="username" type="text" placeholder="username" value={username}
                    onChange={evt => setUsername(evt.target.value)}/>
                <br/>

                <label htmlFor = "password"> Password </label><br/>
                <input id="password" type="password" placeholder="password" value={password}
                onChange={evt => setPassword(evt.target.value)}/>
                <br/>

                {isLoginView ? 
                <button onClick={loginClicked} disable={isDisable}> Login </button> : 
                <button onClick={registerClicked} disable={isDisable}> Register </button>} 
                

                {isLoginView ? 
                <p onClick={()=>SetIsLoginView(false)}> You don't have an account? Register here!</p> 
                : <p onClick={()=>SetIsLoginView(true)}> You already have an accunt? Login here!</p>            
                }
            </div>  
    </div>

    )
}

export default Auth;