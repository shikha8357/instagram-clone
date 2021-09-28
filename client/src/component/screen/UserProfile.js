import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../App'
import { useParams } from "react-router-dom"
const Profile = () => {
    // const [mypic,setPic]=useState([])
    const [userProfile, setProfile] = useState(null)
    // const [showfollow, setShowFollow] = useState(true)
    const { state, dispatch } = useContext(UserContext)
    const { userid } = useParams()
    const [showfollow, setShowFollow] = useState(state ? !state.following.includes(userid): true)

    // console.log(userid)
    useEffect(() => {
        // /user/:id
        fetch(`/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(result => {
                // console.log(result)
                // dispatch({type:"UPDATE",payload:following:result})
                setProfile(result)
            })
    }, [])

    const followUser = () => {
        fetch("/follow", {
            method: "put",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json"

            },
            body: JSON.stringify({

                followId: userid
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                setProfile((prevState) => {
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: [...prevState.user.followers, data._id]
                        }

                    }
                })
                setShowFollow(false)

            })
    }



    const unfollowUser = () => {
        fetch("/unfollow", {
            method: "put",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
                "Content-Type": "application/json"

            },
            body: JSON.stringify({
                unfollowId: userid
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                dispatch({ type: "UPDATE", payload: { following: data.following, followers: data.followers } })
                localStorage.setItem("user", JSON.stringify(data))
                setProfile((prevState) => {
                    const newFollower = prevState.user.folowers.filter(item => item != data._id)
                    return {
                        ...prevState,
                        user: {
                            ...prevState.user,
                            followers: newFollower
                        }

                    }
                })
                setShowFollow(true)
            })
    }

    return (
        <>
            {
                userProfile ?
                    <div style={{ maxWidth: "600px", margin: "0px auto" }}>
                        <div style={{
                            display: "flex", justifyContent: "space-around", padding:"10px",margin: "18px auto", borderBottom: "1px solid gray"
                        }}>
                            <div>
                                <img src={userProfile.user.pic} style={{ width: "160px", height: "160px", borderRadius: "80px" }} /></div>
                            <div>
                                <h4>{userProfile.user.name}</h4>
                                <h4>{userProfile.user.email}</h4>
                                <div style={{ display: "flex", justifyContent: "space-between", width: "110%" }}>
                                    <h6>{userProfile.posts.length} post</h6>
                                    <h6> {userProfile.user.followers.length} followers</h6>
                                    <h6>{userProfile.user.following.length} Following</h6>
                                </div>
                                {
                                    showfollow ? <button style={{
                                        marginTop: "12px",
                                        marginBottom: "22px",
                                        marginLeft: "89px"
                                    }} className="btn waves-effect waves-light center" style={{ marginTop: "10px" }} onClick={() => followUser()}>FOLLOW
                                    </button> :
                                        <button style={{ marginTop: "12px",marginBottom: "22px",
                                        marginLeft: "89px" }} className="btn waves-effect waves-light center" style={{ marginTop: "10px" }} onClick={() => unfollowUser()}>UNFOLLOW
                                        </button>
                                }
                                {/* <button className="btn waves-effect waves-light center" style={{ marginTop: "10px" }} onClick={() => followUser()}>FOLLOW
                                </button> */}
                                {/* <button className="btn waves-effect waves-light center" style={{ marginTop: "10px" }} onClick={() => unfollowUser()}>UNFOLLOW
                                </button> */}
                            </div>
                        </div>
                        <div className="gallery">
                            {/* <img className="item" src="https://images.unsplash.com/photo-1519625594242-7db544018926?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" /> */}
                            {
                                userProfile.posts.map(item => {
                                    return (
                                        <img key={item._id} className="item" src={item.photo} alt={item.title} />
                                    )
                                })
                            }
                        </div>
                    </div>
                    : <h2>loading...</h2>
            }

        </>

    );
}
export default Profile;

