/* eslint-disable no-unused-vars */

import { Link, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import userimg from '../../assets/profile.png'
const UserMenu = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("Authtoken");
    // navigate("/login");
    window.location.reload();
  };

  return (
    <Fragment>
      <li className="onhover-dropdown">
        <div className="media align-items-center">
          <img className="align-self-center pull-right img-50 rounded-circle blur-up lazyloaded" src={userimg} alt="header-user" />
          <div className="dotted-animation">
            <span className="animate-circle"></span>
            <span className="main-circle"></span>
          </div>
        </div>
        <ul className="profile-dropdown onhover-show-div p-20 profile-dropdown-hover">
          {/* <li>
            <Link to={`/settings/profile`}>
              <i data-feather="user"></i>Edit Profile
            </Link>
          </li> */}
         
          <li>
            <a onClick={handleLogOut}>
              <i data-feather="log-out"></i>Logout
            </a>
          </li>
        </ul>
      </li>
    </Fragment>
  );
};

export default UserMenu;
