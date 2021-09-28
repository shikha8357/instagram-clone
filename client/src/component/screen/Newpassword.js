import React from 'react'
import { Link, useHistory, useParams } from "react-router-dom";
import { useState, useContext } from 'react';
import M from "materialize-css";
// import { UserContext } from "../../App";

const Login = () => {
  //   const {state,dispatch}=useContext(UserContext)
  const history = useHistory();
  const [password, setPassword] = useState("")
  const { token } = useParams()
  console.log(token)
  //   const [email, setEmail] = useState("")

  const PostData = () => {
    fetch("/new-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password,
        token
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error })
        }
        else {
          M.toast({ html: data.message, classes: "#43a047 green darken-1" })
          history.push("/login")
        }

      })
      .catch(err => {
        console.log(err)
      })
  }


  return (
    <div>
      <div className="mycard ">
        <div className="card auth-card input-field">
          <h2>Instagram</h2>
          {/* <input type="text" placeholder="email " value={email} onChange={(e) => setEmail(e.target.value)}></input> */}
          <input type="password" placeholder="Enter new password " value={password} onChange={(e) => setPassword(e.target.value)}></input>


          <button className="btn waves-effect waves-light center" style={{ marginTop: "10px" }} onClick={() => PostData()}>Update Password
          </button>


        </div>
      </div>


    </div>
  );
}

export default Login;