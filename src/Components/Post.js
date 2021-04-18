import React, { useContext, useEffect, useState } from "react";
import { app } from "./Base";
import pic from "../img/1.jpg";
import up from "../img/my2.jpg";
import "./post.css";

import {
  MoreOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import CommentModal from "./CommentModal";
import UserImage from "./UserImage/UserImage";
import { Link } from "react-router-dom";

const posting = app.firestore().collection("FacebookPost");

function Post() {
  const [backData, setBackData] = useState([]);
  // const { currentData, current } = useContext(GlobalContext);

  const gettingData = async () => {
    const userData = await app.auth().currentUser;

    if (userData) {
      await posting.onSnapshot((snap) => {
        const item = [];
        snap.forEach((doc) => {
          item.push({ ...doc.data(), id: doc.id });
        });
        setBackData(item);
      });
    }
  };

  useEffect(() => {
    gettingData();
  }, []);

  return (
    <>
      {backData.map(({ id, createdBy, Time, text, uploadData, postedBy }) => (
        <div key={id} className="general" style={{}}>
          <div
            style={{
              margin: "10px",
              // alignItems: "center",
              width: "85%",
              height: "100%",
              flexDirection: "column",
              display: "flex",
              justifyContent: "center",
              // backgroundColor: "black",
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  display: "flex",
                  // backgroundColor: "red",
                  width: "100%",
                  justifyContent: "space-between",
                  // margin: "10px",
                }}
              >
                <UserImage postedBy={postedBy} />
              </div>
            </div>
            <div
              style={{
                width: "90%",
                fontSize: 12,
                marginTop: "-25px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginLeft: "60px",
                // backgroundColor: "red",
              }}
            >
              {text}
            </div>

            <img className="imma" src={uploadData} style={{}} />
            <div
              style={{
                // flexDirection: "row",
                // width: "75",
                // backgroundColor: "red",
                marginLeft: 20,
                marginTop: 7,
                justifyContent: "space-around",
                fontSize: 13,
                display: "flex",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <HeartOutlined style={{ fontSize: 17 }} />
                <div style={{ fontSize: 10, marginLeft: 5 }}>2.5k</div>
              </div>

              <CommentModal id={id} postedBy={postedBy} />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Post;
