import React, { useEffect } from "react";
import { Fragment } from "react";
import { useLoaderData, useSubmit } from "react-router-dom";
import { getTokenDuration } from "../util/authentication/tokenAuth";
import Home from "../components/home/Home";

const HomePage: React.FC = () => {
  const token = useLoaderData() as string;
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }
    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }
    const tokenDuration: number = getTokenDuration();
    const identifier = setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
    return () => {
      clearTimeout(identifier);
    }
  }, [token, submit]);

  return (
    <Fragment>
      <Home />
    </Fragment>
  );
};

export default HomePage;
