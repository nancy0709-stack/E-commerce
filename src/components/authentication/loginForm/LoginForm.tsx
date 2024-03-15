import React from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { ERR_MSG } from "../../../constants/constants";
import InputField from "../InputField/InputField";
import classes from "./LoginForm.module.css";

const LoginForm: React.FC = () => {
  const data: string = useActionData() as string;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post">
      <InputField fieldName="email" label="Email" type="email" data={data} />
      {data && data === ERR_MSG.INVALID_EMAIL && (
        <span className={classes.error}>Invalid email address</span>
      )}

      <InputField
        fieldName="password"
        label="Password"
        type="password"
        data={data}
      />
      {data && data === ERR_MSG.INVALID_PASSWORD && (
        <span className={classes.error}>Password is incorrect</span>
      )}

      <button type="submit" className={classes.button} disabled={isSubmitting}>
        {isSubmitting ? "Submitting" : "Submit"}
      </button>
    </Form>
  );
};

export default LoginForm;
