import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import M from "materialize-css";
import { UserContext } from "../../App";

const Signin = () => {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const PostData = () => {
    //eslint-disable-next-line
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "invalid email", classes: "#c62828 red darken-3" });
      return;
    }
    fetch("http://localhost:8080/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      })
    })
      .then((res) => res.json())

      .then((data) => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: "#c62828 red darken-3" });
        } else {
          console.log("===============>",JSON.stringify(data.user))
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          M.toast({
            html: "signedin successfully",
            classes: "#43a047 green darken-1",
          });
          navigate("/");
        }
      });
  };

  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />

        <button
          className="btn waves-effect waves-light #64b5f6 blue darken-1"
          onClick={() => PostData()}
        >
          Signin
        </button>
        <br></br>
        <Link to="/signup">Don't have an account</Link>
      </div>
    </div>
  );
};

export default Signin;
