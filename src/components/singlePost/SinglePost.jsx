import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "./singlePost.css";
import axios from "axios";
import { Context } from "../../context/Context";

export default function SinglePost() {

  const IMG_FOLDER = "http://localhost:8000/images/";
  const location = useLocation();
  const postId = location.pathname.split('/')[2];
  console.log(postId);

  const { user } = useContext(Context);
  const [post, setPost] = useState({}); 

  const handleDelete = async () => {
    console.log("context user", user.username);
    try{
      const res = await axios.delete(`/posts/${postId}`, {
        data: {
          username: user.username
        }
      });
      window.location.replace("/");
      console.log(res);
    }
    catch(err) {
      console.log(err);
    }
  }

  useEffect(() => {

    const getPost = async () => {
      const postResponse = await axios.get(`/posts/${postId}`);
      console.log(postResponse.data);
      setPost(postResponse.data);
    }

    getPost();

  }, [])

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <img
          className="singlePostImg"
          src={IMG_FOLDER + post.img}
          alt=""
        />
        <h1 className="singlePostTitle">
          {post.title}
          {post.username === user.username && <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
          </div>}
        </h1>
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/posts?username=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span>{new Date(post.createdAt).toDateString()}</span>
        </div>
        <p className="singlePostDesc">
          {post.desc}
        </p>
      </div>
    </div>
  );
}
