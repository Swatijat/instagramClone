import React, { useEffect, createContext, useReducer, useContext } from "react";
import "./App.css";
import NavBar from "./components/Navbar";
import SubscribeUserPost from "./components/screens/SubscribeUserPost";

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import Home from "./components/screens/Home";
import Signin from "./components/screens/Signin";
import Profile from "./components/screens/Profile";
import Signup from "./components/screens/Signup";
import CreatePost from "./components/screens/CreatePost";
import UserProfile from "./components/screens/UserProfile";
import { rootreducer, initialState } from "./reducers/userReducer";
import Reset from "./components/screens/Reset";

export const UserContext = createContext();
const Routing = () => {
  const navigate = useNavigate();
  
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
    } else {
      if(!navigate?.location?.pathname?.startsWith('/reset'))
      
      
          navigate('/signin')
    }
  }, []);
  return (
    <Routes>
      <Route exact path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Home />} />



      <Route exact path="/profile" element={<Profile />} />

      <Route path="/create" element={<CreatePost />} />
      <Route path="/profile/:userid" element={<UserProfile />}></Route>
      <Route path="/myfollowingpost" element={<SubscribeUserPost />}></Route>
      <Route path="/reset" element={<Reset />}></Route>
    </Routes>
  );
};

function App() {
  const [state, dispatch] = useReducer(rootreducer, initialState);
  console.log("State-------->>>>>>>>>1111111",state)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
