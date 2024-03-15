import React, { useEffect} from "react";
import { useSelector } from "react-redux";
import { NavLink, Form, useRouteLoaderData, Link } from "react-router-dom";
import { cart, profile, search, logo } from "../../assets/images/index";
import { NAV_LINKS } from "../../constants/constants";
import { RootState } from "../../interfaces/RootStateI";
import { NavbarProps } from "../../interfaces/props/navbar/navbar";
import classes from "./Header.module.css";

const Header: React.FC<NavbarProps> = (props) => {
  const count = useSelector((state: RootState) => state.cart.totalQuant);
  const name = useSelector((state: RootState) => state.cart.userName);
  const token = useRouteLoaderData("root") as string;
  const showName = token ? (
    <Link to="/profile">
      <div className={classes.userInfo}>
        <span className={classes.userName}>Hey! {name}</span>
      </div>
    </Link>
  ) : (
    <div>
      <img className={classes.contact} src={profile} alt="" />
    </div>
  );

  useEffect(() => {
    if (count === 0) {
      return;
    }
    const timer = setTimeout(() => {
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [count]);

  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <img src={logo} alt="systangoLogo" />
      </div>
      <div>
        <ul className={classes.navLinks}>
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to}>{link.label}</NavLink>
            </li>
          ))}
          {!token ? (
            <li>
              <NavLink to="/users?mode=login">Login</NavLink>
            </li>
          ) : (
            <li>
              <Form action="/logout" method="post">
                <button className={classes.logout}>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </div>
      <div className={classes.sidebar}>
        {showName}
        <div className={classes.searchdiv}>
          <img className={classes.search} src={search} alt="" />
        </div>
        {token && (
          <div onClick={props.showCart} className={classes.btnContainer}>
            <img className={classes.cart} src={cart} alt="" />
            <div>
              <span className={classes.badge}>{count}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
