import { NavLink } from "react-router-dom";
import "./Header.css";
import { useEffect, useState } from "react";
import axios from "axios";

function Headers() {
  const [userdata, setuserdata] = useState({});
  console.log(userdata);
  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:8000/login/success", {
        withCredentials: true,
      });
      // console.log(res);
      setuserdata(res.data.user);
    } catch (err) {
      console.log("error", err);
    }
  };

  const logout = () => {
    window.open("http://localhost:8000/logout", "_self");
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

            {Object.keys(userdata).length > 0 ? (
              <>
                <li>{userdata.displayName}</li>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li onClick={logout}>LogOut</li>
                <li>
                  <img
                    src={userdata.image}
                    style={{ width: "50px", borderRadius: "50%" }}
                    alt=""
                  />
                </li>
              </>
            ) : (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Headers;
