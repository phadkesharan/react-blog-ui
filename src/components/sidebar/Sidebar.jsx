import { Link } from "react-router-dom";
import "./sidebar.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { PF } from "../../utils/constants/PF";

export default function Sidebar() {

  const { user } = useContext(Context);
  console.log("side user", user);
  const [cat, setCat] = useState([]);

  console.log("PF : ", PF);

  useEffect(() => {

    const getCats = async () => {
      const res = await axios.get('/categories/');
      console.log(res.data);
      setCat(res.data);
    }

    getCats();

  }, [])

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src={user?.profilePic ? (PF + user.profilePic) : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cat && cat.map(item => {
            return (
              <li className="sidebarListItem">
                <Link className="link" to={`/posts?cat=${item.name}`}>
                  {item.name}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  );
}
