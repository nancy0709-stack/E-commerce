import axios, { AxiosResponse } from "axios";
import { redirect } from "react-router-dom";
import {
  SignupData,
  LoginData,
} from "../../interfaces/AuthAction";
import { USER_API } from "../../constants/constants";

const url = process.env.REACT_APP_URLAPI;

export const action = async ({
  request,
}: {
  request: any;
}): Promise<string | Response> => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "signup";

  const data = await request.formData();
  const SignupData: SignupData = {
    firstName: data.get("firstName"),
    lastName: data.get("lastName"),
    contactNumber: data.get("contactNumber"),
    email: data.get("email"),
    password: data.get("password"),
    dob: data.get("dob"),
    gender: data.get("gender"),
  };
  const loginData: LoginData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  try {
    if (mode === "signup") {
      const response: AxiosResponse = await axios.post(
        url + USER_API,
        SignupData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.alert("Signup Successful");
      const token = response.data.data.token;
      localStorage.setItem("token", token);
    }

    if (mode === "login") {
      const response: AxiosResponse = await axios.post(
        url + `${USER_API}/_login`,
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.alert("Login Successful");
      const token = response.data.data.token;
      const userId = response.data.data.id;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
    }

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem("expiration", expiration.toISOString());

    return redirect("/");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data.message;
      }
    }
  }

  return redirect("/");
};
