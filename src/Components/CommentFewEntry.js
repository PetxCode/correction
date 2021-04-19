import React, { useState, useEffect } from "react";
import { app } from "./Base";
import ImageViewForComment from "./ImageViewForComment";
import SingleComment from "./SingleComment";

const posting = app.firestore().collection("FacebookPost");
const db = app.firestore().collection("facebook");

const CommentFewEntry = ({ id }) => {
  const [comment, setComment] = useState([]);

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
          setComment(i);
        });
    }
  };

  useEffect(() => {
    getComment();
  }, []);
  return (
    <div>
      {comment.map(({ id, com, poster }) => (
        <div
          key={id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              marginBottom: 10,
              marginRight: 40,
              fontSize: 14,
              color: "#EBEBEA",
            }}
          >
            {" "}
            Most recent Comment{" "}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: 50,
              marginRight: 0,
            }}
          >
            <div>
              <ImageViewForComment poster={poster} />
            </div>
            <div
              style={
                {
                  // display: "flex",
                  // flexDirection: "row",
                }
              }
            >
              <div
                style={{
                  width: "220px",
                  backgroundColor: "#F0F2F5",
                  borderRadius: "20px",
                  height: "30px",
                  padding: "10px",
                  fontSize: "13px",
                  display: "flex",
                  alignItems: "flex-start",
                  margin: 20,
                  marginLeft: 10,
                  marginTop: 0,
                  flexDirection: "column",
                  paddingLeft: "15px",
                  // justifyContent: "flex-start",
                }}
              >
                <SingleComment poster={poster} id={id} />
                <div>{com}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentFewEntry;
