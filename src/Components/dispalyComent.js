import React, { useState, useEffect } from "react";
import { app } from "./Base";
import moment from "moment";
const db = app.firestore().collection("facebook");

function DisplayComent({ id, poster, com, timer, createdAt }) {
  const [getUserData, setGetUserData] = useState([]);

  const getData = async () => {
    const newUser = await app.auth().currentUser;
    if (newUser) {
      await db
        .doc(poster)
        .get()
        .then((doc) => {
          setGetUserData(doc.data());
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div
        style={{
          display: "flex",
          margin: "10px",
          justifyContent: "center",
          // alignItems: "center",
          width: "90%",
          // background: "red",
        }}
      >
        <img
          src={getUserData && getUserData.avatar}
          style={{
            height: 30,
            width: 30,
            borderRadius: 50,
            backgroundColor: "silver",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "14px",
            fontSize: "12px",
            backgroundColor: "lightgray",
            width: "70%",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              marginLeft: "12px",
              fontSize: "12px",
            }}
          >
            {getUserData && getUserData.name}
            <div style={{ color: "white", marginLeft: "10px" }}> 2h</div>
          </div>
          <div
            style={{
              marginLeft: "12px",
              fontWeight: "bold",
              width: "90%",
            }}
          >
            {com}
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayComent;
