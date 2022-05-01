import Post from "../post/Post";
import "./posts.css";
import { useState, useEffect } from 'react';
import { useLocation } from "react-router";
import axios from "axios";

export default function Posts() {

  const { search } = useLocation();
  const [posts, setPosts] = useState([]);

  useEffect(()=>{

    const getPosts = async ()=>{
      console.log(search);
      const response = await axios.get('/posts/' + search);
      console.log(response);
      setPosts(response.data);
    }

    getPosts();

  }, [])

  return (
    <div className="posts">
      {posts && posts.map(item=>{
        return ( <Post key={item._id} post={item}/> )
      })}
    </div>
  );
}
