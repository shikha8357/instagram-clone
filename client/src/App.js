import React,{useEffect,createContext,useReducer,useContext} from 'react'
import Navbar from './component/Navbar';
import {BrowserRouter,Route,Switch,useHistory} from "react-router-dom";
import Home from "./component/screen/Home"
import Profile from "./component/screen/Profile"
import Login from "./component/screen/Login"
import Signup from "./component/screen/Signup"
import CreatePost from "./component/screen/CreatePost";
import UserProfile from "./component/screen/UserProfile";
import SubscribeUserPost from "./component/screen/SubscribeUserPost";
import Reset from "./component/screen/Reset";
import Newpassword from "./component/screen/Newpassword";
import "./App.css"
import {reducer, initialState} from './reducers/userReducer';

export const UserContext=createContext();


const Routing=()=>{
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  useEffect(() => {
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      // history.push("/")
    }
    else{
      if(!history.location.pathname.startsWith('/reset'))
      history.push("/login")
    }
  }, [])
return (

  <Switch>
  <Route exact path="/">   <Home /> </Route>
    <Route path="/signup">   <Signup /> </Route>
    <Route path="/login">   <Login /> </Route>
    <Route exact  path="/profile">   <Profile /> </Route>
    <Route path="/create">   <CreatePost /> </Route>
    <Route path="/profile/:userid">   <UserProfile /> </Route>
    <Route path="/myfollowingpost">   < SubscribeUserPost/> </Route>
    <Route exact path="/reset">   < Reset/> </Route>
    <Route path="/reset/:token">   < Newpassword/> </Route>
  </Switch>  
  
  
)
}

function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <UserContext.Provider value={{state,dispatch}}>
    <BrowserRouter>
    <Navbar/>
    <Routing />
    </BrowserRouter>
     </UserContext.Provider>
  );
}
export default App;
