import React from "react";
import { InputFieldProps } from "../../../interfaces/props/input/InputField";
import classes from "./InputField.module.css";

const InputField: React.FC<InputFieldProps> = ({
  fieldName,
  label,
  type,
  data,
}) => {
  const getInputError = (fieldName: string, errorMessage: string) =>
    data && data === errorMessage ? (
      <span className={classes.error}>{fieldName} is required</span>
    ) : null;

  const errorMessage = `"${fieldName}" is not allowed to be empty`;

  if (fieldName === "gender") {
    const genderOptions = ["Male", "Female"];
    return (
      <div className={classes.inputgroup}>
        <div className={classes.gendergroup}>
          <label>{label}:</label>
          <div className={classes.gender}>
            {genderOptions.map((option) => (
              <React.Fragment key={option}>
                <label htmlFor={option.toLowerCase()}>{option}</label>
                <input
                  className={classes.inputgender}
                  type="radio"
                  id={option.toLowerCase()}
                  name={fieldName}
                  value={option}
                />
              </React.Fragment>
            ))}
          </div>
        </div>
        {getInputError(fieldName, errorMessage)}
      </div>
    );
  }
  return (
    <div className={classes.inputgroup}>
      <label htmlFor={fieldName}>{label}:</label>
      <input
        className={classes.inputFields}
        type={type}
        id={fieldName}
        name={fieldName}
      />
      {getInputError(fieldName, errorMessage)}
    </div>
  );
};

export default InputField;
