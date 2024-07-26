import React, {useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'

export default function Login() {

  const [credentials, setcredentials] = useState({email:"",password:""})
  let navigate=useNavigate()
  const handlesubmit=async(e)=>{
      e.preventDefault();
      const response= await fetch("http://localhost:5000/api/loginuser",{
          method:'POST',
          headers:{
              'Content-type':'application/json'
          },
          body:JSON.stringify({
              email:credentials.email,
              password:credentials.password
          })

      })
      const json=await response.json()
      console.log(json)

      if(!json.success){
          alert("Enter valid credentials")
      }
      if(json.success){
          localStorage.setItem("useremail",credentials.email)
          localStorage.setItem("authToken",json.authToken)
          // console.log(localStorage.getItem("authToken"))
          navigate("/")
      }
  }

  const onchange=(e)=>{
      setcredentials({...credentials,[e.target.name]:e.target.value})
  }


  return (
    <>
    <div className='container'>

    <form  onSubmit={handlesubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" name='email' value={credentials.email}  id="exampleInputEmail1" aria-describedby="emailHelp" onChange={onchange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" name='password' value={credentials.password}  id="exampleInputPassword1" onChange={onchange}/>
  </div>
  <button type="submit" className="m-3 btn btn-danger">Submit</button>
  <Link to="/signup" className='m-3 btn btn-danger'>I'm a new user</Link>
</form>
    </div>
    
    </>
  )
}
