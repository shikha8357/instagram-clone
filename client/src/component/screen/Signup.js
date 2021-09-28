import react from 'react'
import { Link, useHistory } from "react-router-dom";
import { useState,useEffect } from 'react';
import M from "materialize-css";

const Signup = () => {
  const history = useHistory();
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState(undefined)

useEffect(() => {
  if(url){
    uploadFields()
  }
}, [url])
  const uploadPic=()=>
  {
    const data=new FormData()
    data.append("file", image)
    data.append("upload_preset", "instagram-clone")
    data.append("cloud_name", "shikha123")
    fetch(" https://api.cloudinary.com/v1_1/shikha123/image/upload", {
      method: "post",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data)
        setUrl(data.url)
      })
      .catch(err => console.log(err))
  }
const uploadFields=()=>{
  if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
    return M.toast({ html: "invalid email" });
  }
  fetch("http://localhost:5000/signup", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password,
      pic:url
    })
  }).then(res => res.json())
    .then(data => {
      if (data.error) {

        M.toast({ html: data.error })
      }
      else {
        M.toast({ html: data.message, classes: "#43a047 green darken-1" })
        history.push("/login")
      }

    }).catch(err => {
      console.log(err)
    })
}

  const PostData = () => {
    if(image){
      uploadPic()
    }
    else{
      uploadFields()
    }
    // if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
    //   return M.toast({ html: "invalid email" });
    // }
    // fetch("http://localhost:5000/signup", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     name,
    //     email,
    //     password
    //   })
    // }).then(res => res.json())
    //   .then(data => {
    //     if (data.error) {

    //       M.toast({ html: data.error })
    //     }
    //     else {
    //       M.toast({ html: data.message, classes: "#43a047 green darken-1" })
    //       history.push("/login")
    //     }

    //   }).catch(err => {
    //     console.log(err)
    //   })
  }
  return (
    <div>
      <div className="mycard ">
        <div className="card auth-card input-field">
          <h2>Instagram</h2>
          <input type="text" placeholder="name " value={name} onChange={(e) => setName(e.target.value)}></input>
          <input type="text" placeholder="email " value={email} onChange={(e) => setEmail(e.target.value)}></input>
          {/* <input type="text" placeholder="email " value={email} onChange={(e) => setEmail(e.target.value)}></input> */}
          <input type="password" placeholder="password " value={password} onChange={(e) => setPassword(e.target.value)}></input>
          <div className="input-field file-field">
            <div className="btn" >
              <span>Upload Image</span>
              <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
            </div>
            <div className="file-path-wrapper">
              <input class="file-path validate" type="text"></input>
            </div>
          </div>

          <button className="btn waves-effect waves-light center" style={{ marginTop: "10px" }} onClick={() => PostData()}>SignUp</button>
          <h5 Link to="/login">Already have an account?</h5>
          

        </div>
      </div>


    </div>
  );
}
export default Signup;