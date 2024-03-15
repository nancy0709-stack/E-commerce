import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import LoginForm from "../loginForm/LoginForm";
import SignupForm from "../signupForm/SignupForm";
import classes from "./Authentication.module.css";

const Authentication: React.FC = () => {
  const [searchParams] = useSearchParams();
  const isLogin: boolean = searchParams.get("mode") === "login";

  return (
    <div className={classes.container}>
      <div className={classes.signuplogincontainer}>
        <h2>{isLogin ? "Login" : "Signup"}</h2>
        {isLogin ? <LoginForm /> : <SignupForm />}
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Signup" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Authentication;
