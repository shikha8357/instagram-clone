
import React, { useState, useEffect } from 'react';
import M from "materialize-css";
import { useHistory } from 'react-router';




const CreatePost = () => {
  const history = useHistory();
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [url, setUrl] = useState("")
  useEffect(() => {
    if (url) {
      fetch("/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          title,
          pic: url,
          body
        })
      }).then(res => res.json())
        .then(data => {
          console.log(data);
          if (data.error) {
            M.toast({ html: data.error })
          }
          else {
            M.toast({ html: "created post successfully", classes: "#43a047 green darken-1" })
            history.push("/")
          }

        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [url])
  const postDetail = () => {
    const data = new FormData()
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
  return (
    <div className="card input-field" style={{ margin: "40px auto", maxWidth: "500px", padding: "20px", textAlign: "center" }}>
      <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
      <input type="text" placeholder="body " value={body} onChange={(e) => setBody(e.target.value)}></input>
      <div className="input-field file-field">
        <div className="btn" >
          <span>Upload File</span>
          <input type="file" onChange={(e) => setImage(e.target.files[0])}></input>
        </div>
        <div className="file-path-wrapper">
          <input class="file-path validate" type="text"></input>
        </div>
      </div>

      <button className="btn waves-effect waves-light center" style={{ marginTop: "10px" }} onClick={() => postDetail()}>Submit</button>
    </div>


  )
}
export default CreatePost;
