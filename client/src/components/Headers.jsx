import { NavLink } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Headers() {
  const [userdata, setuserdata] = useState({});

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000//login/success", {
        withCredentials: true,
      });
      setuserdata(res.data.user);
    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <header>
      <nav>
        <div className="left">Chirag Vijayvergiya</div>
        <div className="right">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <img
                src="/chirag.jpg"
                style={{ width: "50px", borderRadius: "50%" }}
                alt=""
              />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Headers;
