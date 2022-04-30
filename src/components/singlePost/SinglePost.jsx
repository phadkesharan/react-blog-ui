import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./singlePost.css";
import axios from "axios";

export default function SinglePost() {

  const location  = useLocation();
  const postId = location.pathname.split('/')[2];
  console.log(postId);

  const [post, setPost] = useState({});

  useEffect(()=>{

    const getPost = async ()=>{
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
          src={post.img}
          alt=""
        />
        <h1 className="singlePostTitle">
          {post.title}
          <div className="singlePostEdit">
            <i className="singlePostIcon far fa-edit"></i>
            <i className="singlePostIcon far fa-trash-alt"></i>
          </div>
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
