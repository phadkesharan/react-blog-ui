import "./write.css";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function Write() {

  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      username: user.username,
      title: title,
      desc: text,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;

      data.append("name", fileName);
      data.append("file", file);
      postData.img = fileName;

      try {
        await axios.post('/uploads', data);
      }
      catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post('/posts', postData);
      console.log(res);
      window.location.replace("/post/" + res.data._id);
    }
    catch (err) {
      console.log(err);
    }

  }

  return (
    <div className="write">
      {file && (<img
        className="writeImg"
        src={URL.createObjectURL(file)}
        alt=""
      />)}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e)=> setFile(e.target.files[0])}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={({ target }) => {
              setTitle(target.value);
            }}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={({ target }) => {
              setText(target.value);
            }}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
