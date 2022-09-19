import React, { useState } from 'react'


function Register() {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    async function userRegister(e)
    {
        e.preventDefault();
        const response=await fetch('http://localhost:1337/api/register',{
            method:'POST',
            headers:
            {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                name,email,password
            })
        })
        const data=await response.json()
        console.log(data)
    }
  return (
    <div>
        <h1>Register</h1>
        <form onSubmit={userRegister}>
            Name:<input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
            Email:<input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
            Password:<input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <input type="submit" value="Register"/>
        </form>
    </div>
  )
}

export default Register
