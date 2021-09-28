import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'
const Profile = () => {
    const [mypic, setPic] = useState([])
    const { state, dispatch } = useContext(UserContext)
    const [image, setImage] = useState("")
    //   const [url, setUrl] = useState("")


    useEffect(() => {
        fetch("/mypost", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                setPic(result.mypost)
            }).catch(err => { console.log(err) })
    }, [])

    useEffect(() => {
        if (image) {
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
                    console.log(data)
                    fetch("/updatepic", {
                        method: "put",
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("jwt"),
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            pic: data.url
                        })
                    }).then(res => res.json())
                        .then(result => {
                            console.log(result)
                            localStorage.setItem("user", JSON.stringify({ ...state, pic: result.pic }))
                            dispatch({ type: "UPDATEPIC", payload: result.pic })
                        })
                })
            
                .catch(err => console.log(err))
        }
    }, [image])

    const updatePhoto = (file) => {
        setImage(file)
    }

    
    return (

        <div style={{ maxWidth: "600px", margin: "0px auto" }}>
            <div style={{
                margin: "18px auto", borderBottom: "1px solid gray"
            }} >
                <div style={{
                    display: "flex", justifyContent: "space-around"
                }}>

                    <div>
                        <img src={state ? state.pic : "loading text"} style={{ width: "160px", height: "160px", borderRadius: "80px" }} />
                        {/* <button className="btn waves-effect waves-light center" style={{ marginTop: "10px" }} >Update Image</button> */}
                    </div>


                    <div>

                        <h4>{state ? state.name : "loading"}</h4>
                        <h5>{state ? state.email : "loading"}</h5>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "110%" }}>
                            <h6>{mypic.length} post</h6>
                            <h6>{state ? state.followers.length : "0"} followers</h6>
                            <h6>{state ? state.following.length : "0"} following</h6>
                        </div>

                    </div>
                </div>

                {/* <button className="btn waves-effect waves-light center" style={{ margin: "10px 0px 10px 52px", }} onClick={()=>updatePhoto()} >Update Image
                    </button> */}
                <div className="input-field file-field" style={{ margin: "10px" }}>
                    <div className="btn" >
                        <span>Update Image</span>
                        <input type="file" onChange={(e) => updatePhoto(e.target.files[0])}></input>
                    </div>
                    
                    <div className="file-path-wrapper">
                        <input class="file-path validate" type="text"></input>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {/* <img className="item" src="https://images.unsplash.com/photo-1519625594242-7db544018926?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" /> */}
                {
                    mypic.map(item => {
                        return (
                            <img key={item._id} className="item" src={item.photo} alt={item.title} />
                        )
                    })
                }
            </div>
        </div >
    );
}
export default Profile;