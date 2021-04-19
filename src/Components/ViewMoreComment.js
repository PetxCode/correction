import React, { useState, useEffect } from "react";
import { app } from "./Base";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "antd";
import SendIcon from "@material-ui/icons/Send";
import CloseIcon from "@material-ui/icons/Close";

import pic from "../img/1.jpg";
import up from "../img/my2.jpg";
import "./cas.css";
import {
  MoreOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import DisplayComent from "../Components/dispalyComent";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,

    // border: "2px solid #000",
    // backgroundImage: "linear-gradient(#4c87df, #1854b1, #2233ac)",
    backgroundColor: "white",
    // color: "white",

    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "60%",

    display: "flex",
    // alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
}));

const posting = app.firestore().collection("FacebookPost");
const db = app.firestore().collection("facebook");

function ViewMoreComment({ id, postedBy }) {
  const classes = useStyles();
  // const { id } = useParams();

  const [data, setData] = useState([]);
  const [needData, setNeedData] = useState([]);

  const [commentIn, setCommentIn] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [them, setThem] = useState([]);
  // const [texting, setTexting] = useState("");
  const [com, setCom] = useState("");

  const [naming, setNaming] = useState("");

  const getName = async () => {
    const newUser = await app.auth().currentUser;

    if (newUser) {
      await db
        .doc(postedBy)
        .get()
        .then((doc) => {
          setNaming(doc.data());
        });
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getPack = async () => {
    const docRef = await db.doc(postedBy);
    const docData = await docRef.get();

    setData(docData.data());
  };

  const getPacked = async (id) => {
    const docRefed = await posting.doc(id);
    const docDatated = await docRefed.get();

    setThem(docDatated.data());
    console.log("This is: ", them);
  };

  const gettingComment = async () => {
    const newData = await posting.doc(id).get();
    setCommentIn(newData.data());
  };

  const comenting = async () => {
    const commentingUser = await app.auth().currentUser;

    if (commentingUser) {
      await posting.doc(id).collection("comment").doc().set({
        poster: commentingUser.uid,
        createdAt: new Date().toLocaleString(),
        timer: Date.now().toString(),
        com,
      });
      setCom("");
    }
  };

  const getComment = async () => {
    const gotCom = await app.auth().currentUser;

    if (gotCom) {
      await posting
        .doc(id)
        .collection("comment")
        // .orderBy("dateTime", "asc")
        .onSnapshot((snap) => {
          const i = [];
          snap.forEach((doc) => {
            i.push({ ...doc.data(), id: doc.id });
          });
          setNeedData(i);
        });
    }
  };

  useEffect(() => {
    getPacked();
    getPack();
    getComment();
    getName();
    gettingComment();
  }, []);

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 10,
              cursor: "pointer",
              marginLeft: 50,
              color: "#6f6f70",
            }}
            onClick={handleOpen}
          >
            View All Comments
          </div>
        </div>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div initial={{ y: "-100vh" }} animate={{ y: 0 }} className="thin">
            <div className="modal_body">
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  display: "flex",
                  // backgroundColor: "red",
                  width: "100%",
                  justifyContent: "space-between",
                  // alignItems: "center",
                  // margin: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    margin: "10px",
                    justifyContent: "space-between",
                  }}
                >
                  <img
                    src={data && data.avatar}
                    style={{
                      height: 50,
                      width: 50,
                      borderRadius: 50,
                      backgroundColor: "silver",
                      objectFit: "cover",
                    }}
                  />

                  <div style={{ display: "flex", marginLeft: "10px" }}>
                    {data && data.name}
                    <div style={{ color: "silver", marginLeft: "10px" }}>
                      {" "}
                      2h
                    </div>
                  </div>
                </div>
                <CloseIcon style={{ marginRight: "10px" }} />
              </div>

              <div className="station">{commentIn && commentIn.text}</div>
              <img
                className="imma1"
                src={commentIn && commentIn.uploadData}
                style={{}}
              />

              <div
                style={{
                  width: "80%",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  // backgroundColor: "red",
                  margin: "20px",
                }}
              >
                <img
                  src={naming && naming.avatar}
                  style={{
                    height: 40,
                    width: 40,
                    borderRadius: 50,
                    backgroundColor: "silver",
                    objectFit: "cover",
                  }}
                />
                <input
                  value={com}
                  onChange={(e) => {
                    setCom(e.target.value);
                  }}
                  placeholder="type..."
                  style={{ height: "40px", marginTop: "px", width: "60%" }}
                />

                <SendIcon
                  onClick={comenting}
                  style={{
                    // marginLeft: "-20px",
                    // height: "15px",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                />
              </div>
              {needData.map(({ id, timer, com, createdAt, poster }) => (
                <div>
                  <DisplayComent
                    timer={timer}
                    com={com}
                    createdAt={createdAt}
                    poster={poster}
                  />
                </div>
              ))}
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default ViewMoreComment;
