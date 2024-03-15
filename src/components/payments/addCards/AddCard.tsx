import React, { useState, ChangeEvent, FormEvent, Fragment } from "react";
import { addCardApi } from "../../../util/api/paymentApi";
import { INPUT_FIELD } from "../../../constants/constants";
import { FormState, AddCardProps } from "../../../interfaces/AddCard";
import classes from "./AddCard.module.css";

const AddCard: React.FC<AddCardProps> = (props) => {
  const initialFormState: FormState = {
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
    name: "",
  };

  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errName, setErrName] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await addCardApi(formData);
    if (data?.statusCode === 400 || data?.statusCode === 402) {
      setErrName(data.message);
    } else {
      if (data?.statusCode === 201) {
        setFormData(initialFormState);
        props.showAddCard(false, "Cards Added Successfully , Now you can check your saved cards by clicking on Saved Cards Button !!!");
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const renderInputField = (
    label: string,
    name: string,
    type = "text",
    required = true
  ) => (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        className={classes.inputCard}
        type={type}
        id={name}
        name={name}
        value={(name in formData && formData[name as keyof FormState]) || ''}
        onChange={handleChange}
      />
    </div>
  );

  return (
    <Fragment>
      <div className={classes.container}>

          <h1>Add Your Card</h1>
          <p className={classes.error}>{errName}</p>
          <form className={classes.checkform} onSubmit={handleSubmit}>
            {INPUT_FIELD.map((field) => (
              <div key={field.name}>
                {renderInputField(field.label, field.name)}
              </div>
            ))}
            <button className={classes.button} type="submit">
              Add card
            </button>
          </form>

      </div>
    </Fragment>
  );
};

export default AddCard;
