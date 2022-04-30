import Post from "../post/Post";
import "./posts.css";
import { useState, useEffect } from 'react';
import axios from "axios";

export default function Posts() {

  const [posts, setPosts] = useState([]);

  useEffect(()=>{

    const getPosts = async ()=>{
      const response = await axios.get('/posts/');
      console.log(response);
      setPosts(response.data);
    }

    getPosts();

  }, [])

  return (
    <div className="posts">
      {posts.map(item=>{
        return ( <Post key={item._id} post={item}/> )
      })}
    </div>
  );
}
