import "./settings.css";
import Sidebar from "../../components/sidebar/Sidebar";
import { useContext, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Settings() {

  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [profilePic, setProfilePic] = useState('');
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [succes, setSuccess] = useState(false);
  const PF = "http://localhost:8000/images/";

  const handleDelete = async (e) =>{
    e.preventDefault();

    try {
      const res = await axios.delete(`/users/${user._id}`, {
        data: {userId: user._id}
      });
      dispatch({type: "LOGOUT"});
      res.data && window.location.replace('/login');
    }
    catch(err) {
      console.log(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });

    const updatedUser = {
      userId: user._id,
      username: username,
      email: email,
      password: password
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;

      data.append("name", fileName);
      data.append("file", file);
      updatedUser.profilePic = fileName;

      try {
        await axios.post('/uploads', data);
      }
      catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.put(`/users/${user._id}`, updatedUser);
      console.log(res);
      setSuccess(true);
      dispatch({ type: "UPDATE_SUCCESS" });

    }
    catch (err) {
      console.log(err);
      dispatch({ type: "UPDATE_FAILURE" });
    }

  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <button className="settingsDeleteButton" type="submit" onClick={handleDelete}>
            Delete Account
          </button>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : user?.profilePic ? (PF + user.profilePic) : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
              alt="profilePic"
            />
            <label htmlFor="fileInput">
              <i className="settingsPPIcon far fa-user-circle"></i>{" "}
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: "none" }}
              className="settingsPPInput"
              onChange={({ target }) => setFile(target.files[0])}
            />
          </div>
          <label>Username</label>
          <input type="text" placeholder={user.username} onChange={({ target }) => setUsername(target.value)} name="name" />
          <label>Email</label>
          <input type="email" placeholder={user.email} onChange={({ target }) => setEmail(target.value)} name="email" />
          <label>Password</label>
          <input type="password" placeholder="Password" name="password" onChange={({ target }) => setPassword(target.value)} />
          
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {succes && <span style={{ color: 'green', marginTop: '30px', textAlign: 'center' }}> Profile Updated Successfully!</span>}
        </form>
      </div>
      <Sidebar />
    </div>
  );
}
