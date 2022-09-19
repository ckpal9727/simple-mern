import React, { useState } from 'react'

function Login() {
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    async function userLogin(e)
    {
        e.preventDefault();
       const response=await fetch('http://localhost:1337/api/login',{
            method:'POST',
            headers:
            {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email,password
            })
        })
        const data=await response.json();
        if(data.accessToken)
        {
            localStorage.setItem('accessToken',data.accessToken)
            window.location.href='/profile'
            console.log("You are loged In")
        }else{
            console.log('Jane vastal')
        }
        // console.log(data)
    }
  return (
    <div><h1>Login</h1>
    <form onSubmit={userLogin}>
    Email:<input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
    Password:<input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} />
    <input type="submit" value="Login"/>
    </form>
    </div>
  )
}

export default Login