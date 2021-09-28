import React from 'react'
import { Link, useHistory } from "react-router-dom";
import { useState,useContext } from 'react';
import M from "materialize-css";
// import {UserContext} from "../../App";

const Reset = () => {
//   const {state,dispatch}=useContext(UserContext)
  const history = useHistory();
//   const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const PostData = () => {
    // console.log(email,password)
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
  M.toast({html:"invalid email"})
  return;
}
    fetch("/reset-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
       body: JSON.stringify({
        //  password,
        email
      })
    }).then(res=>res.json())
    .then(data=>{
    //   console.log(data);
      if(data.error){
        M.toast({html: data.error})
      }
      else {
        // localStorage.setItem("jwt",data.token)
        // localStorage.setItem("user",JSON.stringify(data.user))
        // dispatch({type:"USER",payload:data.user})
M.toast({html:data.message , classes:"#43a047 green darken-1"})
history.push("/login")
      }

    })
    .catch(err=>{
      console.log(err)
    })
  }
        

  return (
    <div>
      <div className="mycard ">
        <div className="card auth-card input-field">
          <h2>Instagram</h2>
          <input type="text" placeholder="email " value={email} onChange={(e) => setEmail(e.target.value)}></input>
          {/* <input type="password" placeholder="password " value={password} onChange={(e) => setPassword(e.target.value)}></input> */}

          
          <button className="btn waves-effect waves-light center" style={{ marginTop: "10px" }} onClick={() => PostData()}>reset password
          </button>
          {/* <h5 Link to="/signup">Don't have an account?</h5> */}

        </div>
      </div>


    </div>
  );
}

export default Reset;