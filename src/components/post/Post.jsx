import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  return (
    <div className="post">
      <img
        className="postImg"
        src={post.img}
        alt=""
      />
      <div className="postInfo">

        <div className="postCats">
          {post.catergories.map(cat => {
            return (
              <span className="postCat">
                <Link className="link" to={`/posts?cat=${cat}`}>
                  {cat}
                </Link>
              </span>
            )
          })}
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span> 
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  );
}
