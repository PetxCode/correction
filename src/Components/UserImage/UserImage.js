import React, { useState, useEffect } from "react";
import { app } from "../Base";

const db = app.firestore().collection("facebook");

function UserImage({ postedBy }) {
  const [naming, setNaming] = useState("");

  const getName = async () => {
    const newUser = await app.auth().currentUser;

    if (newUser) {
      db.doc(postedBy)
        .get()
        .then((doc) => {
          setNaming(doc.data());
        });
    }
  };
  useEffect(() => {
    getName();
  }, []);
  return (
    <>
      <div style={{ display: "flex" }}>
        <img
          src={naming && naming.avatar}
          style={{
            height: 50,
            width: 50,
            borderRadius: 50,
            backgroundColor: "silver",
            objectFit: "cover",
          }}
        />

        <div style={{ display: "flex", marginLeft: "10px" }}>
          {naming && naming.name}
          <div style={{ color: "silver", marginLeft: "10px" }}> 2h</div>
        </div>
      </div>
    </>
  );
}

export default UserImage;
