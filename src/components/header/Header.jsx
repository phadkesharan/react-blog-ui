import { useContext } from "react";
import { Context } from "../../context/Context";
import "./header.css";

export default function Header() {

  const { user } = useContext(Context);

  return (
    <div className="header">
      <div className="headerTitles">
        {user && <span className="headerTitleUser">Welcome {user.username} !</span>}
        <span className="headerTitleSm">React & Node</span>
        <span className="headerTitleLg">BLOG</span>
      </div>
      <img
        className="headerImg"
        src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        alt=""
      />
    </div>
  );
}
