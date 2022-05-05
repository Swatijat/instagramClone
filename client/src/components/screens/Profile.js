import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../App";
import userpic from "../assets/userpic.png";
const Profile = () => {
  const [mypics, setPics] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [image, setImage] = useState("");
  useEffect(() => {
    fetch("/mypost", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPics(result.mypost);
      });
    console.log("==============", state);
  }, []);

  useEffect(() => {
    if (image) {
      const data = new FormData();
      data.append("file", image[0]);
      data.append("upload_preset", "insta-clone");
      data.append("cloud_name", "deqqmptro");

      fetch("https://api.cloudinary.com/v1_1/deqqmptro/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          localStorage.setItem(
            "user",
            JSON.stringify({ ...state, pic: data.url })
          );
          dispatch({ type: "UPDATEPIC", payload: data.url });
          fetch("/updatepic", {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },

            body: JSON.stringify({
              pic: data.url,
            }),
          })
            .then((res) => res.json())
            .then((result) => {
              console.log("result in profile page--->>>>>>>11111", result);
              console.log(
                "result in profile page--->>>>>>>22222",
                JSON.stringify({ ...state, pic: result.pic })
              );<input
                        id="inputComment"
                        type="text"
                        placeholder="add a comment"
                      />

              localStorage.setItem(
                "user",
                JSON.stringify({ ...state, pic: result.pic })
              );
              dispatch({ type: "UPDATEPIC", payload: result.pic });
            });
          //   window.location.reload()
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [image]);
  const updatePhoto = (file) => {
    setImage(file);
  };
  return (
    <div style={{ maxWidth: "550px", margin: "0px auto" }}>
      <div
        style={{
          margin: "18px 0px",
          borderBottom: "1px solid grey",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <div className="profileImageBack">
            <img
              className="profileImage"
              style={{ width: "148px", height: "150px", borderRadius: "80px",border:"solid 2px black",
              position:"relative"}}
              src={state?.pic ? state.pic : userpic}
            />
          </div>
          <div>
            <h4>{state ? state.name : "loading"}</h4>
            <h5>{state ? state.email : "loading"}</h5>  
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "108%",
              }}
            >
              <h6>{mypics.length} posts</h6>
              <h6>{state ? state.followers.length : "0"} followers</h6>
              <h6>{state ? state.following.length : "0"} following</h6>
            </div>
          </div>
        </div>

        <div className="file-field input-field" style={{ margin: "10px" }}>
          <div>
            <span><i className="material-icons" id="plusbtn" style={{color:"#38e5c6"}}>add_circle</i></span>
            <input type="file" onChange={(e) => updatePhoto(e.target.files)} />
          </div>
          <div className="file-path-wrapper">
            {/* <input className="file-path validate" type="text" /> */}
          </div>
        </div>
      </div>
      <div className="gallery">
        {mypics.map((item) => {
          return (
            <img
              key={item._id}
              className="item"
              src={item.photo}
              alt={item.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
