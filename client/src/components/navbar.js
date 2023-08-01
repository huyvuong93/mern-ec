import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {Link} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import axios from "axios";
import Cookie from "js-cookie";
import { AiOutlineUser, AiOutlineLogout, AiOutlineLogin, AiOutlineHome } from "react-icons/ai";

export default function Navbar() {
  const {currentUser, isLoading} = useContext(AuthContext);
  if(isLoading) return <div>Loading...</div>
  const handleLogout = async () => {
    const res = await axios.get('http://localhost:3080/logout', {withCredentials:true});
    if (res.status === 200) {
      Cookie.remove('access_token');
      localStorage.removeItem('user');
      window.location.href = 'http://localhost:3000'
    }
  }
  return (
    <div className="sticky-top">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <AiOutlineHome size={25} />
              </Link>
            </li>
          </ul>
          {!currentUser ? (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/auth/register">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/auth/login">
                <AiOutlineLogin size={25} />
              </Link>
            </li>
          </ul>) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/me">
                  <AiOutlineUser size={25}/>
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" onClick={handleLogout}>
                  <AiOutlineLogout size={25} />
                </a>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
}