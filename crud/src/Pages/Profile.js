import React,{useEffect, useState} from 'react'
import jwtDecode from 'jwt-decode'
function Profile() {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');

  async function showProfile()
  {

  }
  useEffect(() => {   
      const token=localStorage.getItem('accessToken');
      console.log(token)
      const user=jwtDecode(token)
      if(!user)
      {
        console.log("Not a user")
        localStorage.removeItem('accessToken')
      }   else{
        console.log(user)
        setName(user.name)
        setEmail(user.email)
        showProfile();
      }
  }, [])
  
  return (
    <div>
        <h1>Profile</h1>
        Nams is {name||"Not Name found"} <br/>
        Email is {email || "Email is not found"}
        {/* <input type="text" value={email} onChange={(e)=>setEmail(email)}/> */}
        
    </div>
  )
}

export default Profile