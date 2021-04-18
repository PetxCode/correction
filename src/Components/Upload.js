import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { app } from "./Base";

const posting = app.firestore().collection("FacebookPost");
function Upload() {
  const hist = useHistory();
  const [uploadData, setUploadData] = useState(null);
  const [text, setText] = useState("");
  const UploadFile = async (e) => {
    const File = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(File.name);

    await fileRef.put(File);
    setUploadData(await fileRef.getDownloadURL());
  };

  const Uploading = async () => {
    const UploadUser = await app.auth().currentUser;

    if (UploadUser) {
      await posting.doc().set({
        text,
        uploadData,
        postedBy: UploadUser.uid,
        Time: new Date().toLocaleString(),
        CreatedBy: Date.now().toString(),
      });
      hist.push("/");
    }
  };

  return (
    <div>
      <input onChange={UploadFile} type="file" />
      <input
        type={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        type="text"
      />
      <button
        onClick={() => {
          Uploading();
        }}
      >
        post
      </button>
    </div>
  );
}

export default Upload;
