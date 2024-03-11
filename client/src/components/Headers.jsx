import { NavLink } from "react-router-dom";
import "./Header.css";

function Headers() {
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
