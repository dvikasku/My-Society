import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import LoginIcon from '@mui/icons-material/Login';
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";

const Navbar = () => {

  return (
    <div className="navbar">
      <div className="wrapper">
      <div className="top">
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="logo">My Society</span>
            </Link>
          </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
        {localStorage.getItem('token')? <><div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div></>:<>
              <LoginIcon className="icon" />
              <Link to='/login'><Button >Login</Button></Link>
              </>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;