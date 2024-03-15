import React from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import { ERR_MSG, SHOW_MSG } from "../../../constants/constants";
import InputField from "../InputField/InputField";
import classes from "./SignupForm.module.css";

const SignupForm: React.FC = () => {
  const data: string = useActionData() as string;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post">
      <InputField
        fieldName="firstName"
        label="FirstName"
        type="text"
        data={data}
      />
      <InputField
        fieldName="lastName"
        label="Last Name"
        type="text"
        data={data}
      />
      <InputField fieldName="email" label="Email" type="email" data={data} />
      <InputField
        fieldName="password"
        label="Password"
        type="password"
        data={data}
      />
      <InputField
        fieldName="contactNumber"
        label="Phone"
        type="tel"
        data={data}
      />
      <InputField
        fieldName="dob"
        label="Date of Birth"
        type="date"
        data={data}
      />
      <InputField fieldName="gender" label="Gender" type="radio" data={data} />

      {data && (
        <span className={classes.error}>
          {data === ERR_MSG.INVALID_CONTACT && SHOW_MSG.CONTACT_INVALID_MSG}
          {data === ERR_MSG.PHONE_EXISTS && SHOW_MSG.CONTACT_EXISTS_MSG}
          {data === ERR_MSG.ERROR_DOB && SHOW_MSG.DOB_REQUIRED_MSG}
          {data === ERR_MSG.INVALID_DOB && SHOW_MSG.DOB_INVALID_MSG}
          {data === ERR_MSG.ERROR_GENDER && SHOW_MSG.GENDER_REQUIRED_MSG}
        </span>
      )}

      <button type="submit" className={classes.button} disabled={isSubmitting}>
        {isSubmitting ? "Submitting" : "Submit"}
      </button>
    </Form>
  );
};

export default SignupForm;
