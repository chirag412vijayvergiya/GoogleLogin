import "./Login.css";
function Login() {
  const loginwithgoogle = () => {
    window.open("http://localhost:8000/auth/google/callback", "_self");
  };
  return (
    <div className="login-page">
      <h1 style={{ textAlign: "center" }}>Login</h1>
      <div className="form">
        <form className="login-form">
          <input type="text" name="" id="" placeholder="username" />
          <input type="password" name="" id="" placeholder="password" />
          <button>Login</button>
          <p className="message">
            Not Registered?<a href="#"> Create an Account</a>
          </p>
        </form>
        <button className="login-with-google-btn" onClick={loginwithgoogle}>
          Sign In with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
