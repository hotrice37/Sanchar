import { useContext, useRef } from 'react';
import './login.css';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">S</h3>
          <span className="loginDesc">SANCHAR</span>
        </div>
        <div className="loginRight">
          <div className="logintext">Log In</div>
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                'Log In'
              )}
            </button>
            <hr className="line" />
            <span className="loginForgot">Forgot Password?</span>
            <Link className="loginRegisterButton" to="/">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Don't have an account? Sign Up"
              )}
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
