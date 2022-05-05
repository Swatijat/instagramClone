import React, { useContext, useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";

const NavBar = () => {
  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const { state, dispatch } = useContext(UserContext);

  const [userDetails, setUserDetails] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const renderList = () => {
    if (state) {
      return [
        <li key="1">
          <i
            data-target="modal1"
            className="large material-icons modal-trigger"
            style={{ color: "black" }}
          >
            search
          </i>
        </li>,
        <li key="2">
          <Link to="/profile">Profile</Link>
        </li>,
        <li key="3">
          <Link to="/create">Create Post</Link>
        </li>,
        <li key="4">
          <Link to="/myfollowingpost">My following Posts</Link>
        </li>,
        <li>
          <button
            className="btn #c62828 red darken-3"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" });
              navigate("/signin");
            }}
          >
            logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li key="5">
          <Link to="/signin">Signin</Link>
        </li>,
        <li key="6">
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };
  const fetchUsers = (query) => {
    setSearch(query);
    fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setUserDetails(result.user);
      });
  };

  return (
    <nav>
      <div className="nav-wrapper white">
     
      <Link to={state?"/":"/signin"} className="brand-logo left">Instagram</Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
      <div id="modal1" className="modal" ref={searchModal}>
        <div className="modal-content">
          <input
            type="text"
            value={search}
            onChange={(e) => fetchUsers(e.target.value)}
            placeholder="search-users"
          />
          <ul className="collection">
            {userDetails.map((item) => {
              return (
                <Link
                  to={
                    item._id !== state._id ? "/profile/" + item._id : "/profile"
                  }
                  onClick={() => {
                    M.Modal.getInstance(searchModal.current).close();
                    setSearch("");
                  }}
                >
                  <li className="collection-item">{item.email}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="modal-footer">
          <button
            href="#!"
            className="modal-close waves-effect waves-green btn-flat"
            onClick={() => setSearch("")}
          >
            close
          </button>
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
