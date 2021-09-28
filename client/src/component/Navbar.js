
import react, { useContext, useRef, useEffect, useState } from "react";
import { UserContext } from "../App";
import M from "materialize-css";

import { Link, useHistory } from "react-router-dom";
const Navbar = () => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("")
  const history = useHistory()
  const [userDetail, setUserDetail] = useState([])
  useEffect(() => {
    M.Modal.init(searchModal.current)
  }, [])
  const { state, dispatch } = useContext(UserContext)
  const renderList = () => {
    if (state) {
      return [
        <li key="1"><i data-target="modal1" className=" modal-trigger large material-icons" style={{ color: "black" ,margin:"5px"}}>search</i></li>,
        <li key="2"><Link to="/profile">Profile</Link></li>,
        <li key="3"><Link to="/create">Create Post</Link></li>,
        <li key="4"><Link to="/myfollowingpost">Following Post</Link></li>,
        <li key="5"><button className="btn #e53935 red darken-1" style={{ marginTop: "-6px" }} onClick={() => {
          localStorage.clear()
          dispatch({ type: "CLEAR" })
          history.push("/login")
        }}>LogOut
        </button></li>
      ]
    }
    else {
      return [
        <li key="6"><Link to="/login">Login</Link></li>,
        <li key="7"><Link to="/signup">SignUp</Link></li>

      ]
    }
  }
  const fetchUser = (query) => {
    setSearch(query)
    fetch("/search-user", {
      method: "post",
      headers: {
        "Content-Type": "application/json",

      },
      body: JSON.stringify({
        query,

      })
    }).then(res => res.json())
      .then(result => {
         console.log(result)
        setUserDetail(result.user)
      })
  }

  return (
    <nav>
      <div Name="nav-wrapper" style={{ color: "black", background: "white" }}>
        <Link to={state ? "/" : "/login"} className="brand-logo left" >Instagram</Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
      <div id="modal1" className="modal" ref={searchModal} style={{ color: "black" }}>
        <div className="modal-content" style={{ color: "black" }}>
          <input type="text" placeholder="search users " value={search} onChange={(e) => fetchUser(e.target.value)} />
          <div>
            <ul className="collection" style={{ display: "flex", flexDirection: "column" }}>
              {userDetail.map(item => {
                return <Link style={{outline:"none",color:"black"}} to={item._id!==state._id?
                
                "/profile/"+item._id :"/profile"} 
                 onClick={()=>{M.Modal.getInstance(searchModal.current).close()
                  setSearch("")
                }}
                >
                  <li className="collection-item" style={{color:"black"}}>{item.email}</li>
                </Link>
              })}

            </ul>
          </div>
        </div>
        <div class="modal-footer">
          <button className="modal-close waves-effect waves-green btn-flat" onClick={()=>setSearch("")}>Close</button>
        </div>
      </div>
    </nav>
  )
}
export default Navbar;