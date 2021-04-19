import React, { useState, useEffect } from "react";
import { app } from "./Base";

const posting = app.firestore().collection("FacebookPost");
const db = app.firestore().collection("facebook");

const SingleComment = ({ poster, id }) => {
  const [data, setData] = useState([]);

  const getComment = async () => {
    const gotCom = await app.auth().currentUser;

    if (gotCom) {
      await posting
        .doc(id)
        .collection("comment")
        // .orderBy("dateTime", "asc")
        .limit(1)
        .onSnapshot((snap) => {
          const i = [];
          snap.forEach((doc) => {
            i.push({ ...doc.data(), id: doc.id });
          });
          setData(i);
        });
    }
  };

  // const getUser = async () => {
  //   const gotCom = await app.auth().currentUser;

  //   if (gotCom) {
  //     await db
  //       .doc(poster)
  //       .collection("comment")

  //       .onSnapshot((snap) => {
  //         const i = [];
  //         snap.forEach((doc) => {
  //           i.push({ ...doc.data(), id: doc.id });
  //         });
  //         setData(i);
  //       });
  //   }
  // };

  const [naming, setNaming] = useState("");

  const getName = async () => {
    const newUser = await app.auth().currentUser;

    if (newUser) {
      await db
        .doc(poster)
        .get()
        .then((doc) => {
          setNaming(doc.data());
        });
    }
  };

  useEffect(() => {
    // getUser();
    getName();
    getComment();
  }, []);
  return (
    <div
      style={{
        fontWeight: "bold",
      }}
    >
      {naming && naming.name}
    </div>
  );
};

export default SingleComment;
