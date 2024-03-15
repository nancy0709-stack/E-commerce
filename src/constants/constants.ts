import { InputField } from "../interfaces/AddCard";
import { Navbar } from "../interfaces/Navbar";

export const NAV_LINKS: Navbar[] = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About us" },
  { to: "/store", label: "Our Stores" },
  { to: "/contact", label: "Contact us" },
];

export const INPUT_FIELD: InputField[] = [
  { label: "Card Number", name: "cardNumber" },
  { label: "Expiration Month", name: "expMonth" },
  { label: "Expiration Year", name: "expYear" },
  { label: "CVV", name: "cvv" },
  { label: "Name", name: "name" },
];

export const ERR_MSG = {
  INVALID_EMAIL: "Not Found",
  INVALID_PASSWORD: "UNAUTHORISED",
  EMAIL_EXISTS: "Email Already Exists",
  INVALID_CONTACT: '"contactNumber" length must be 10 characters long',
  PHONE_EXISTS: "Phone Number Already Exists",
  INVALID_TOKEN: "Invalid Token",
  ERROR_GETTING_ORDERS: "No Orders Found Yet",
  ERROR_NOT_FOUND: "Not Found",
  ERROR_DOB: '"dob" must be a valid date',
  INVALID_DOB: '"dob" must be less than or equal to "now"',
  ERROR_GENDER: '"gender" must be a string',
};

export const SHOW_MSG = {
  CONTACT_INVALID_MSG: "Invalid ContactNo.",
  EMAIL_INVALID_MSG: "Invalid email address",
  CONTACT_EXISTS_MSG: "Contact Already exists",
  DOB_REQUIRED_MSG: "Enter DOB",
  DOB_INVALID_MSG: "Enter Valid Date of Birth",
  GENDER_REQUIRED_MSG: "Gender is required",
};

export const API_ERR_MSG = {
  INVALID_API_TOKEN: "Session Expired !! Please Login to Continue......",
  ERROR_FETCHING_CART: "Error fetching cart details!!!",
  ERROR_ADDING_CART: "Error Adding Cart Products!!!",
  ERROR_CLEARING_CART: "Error Clearing Cart-Items!!!",
  ERROR_GETTING_CARD: "Error Getting Card Details!!!",
  ERROR_ADDING_CARD: "Error Adding Card Details!!!",
  ERROR_MAKING_PAYMENT: "Error Making Payment!!!",
  ERROR_CANCELLING_PAYMENT: "Error Cancelling Payment!!!",
  ERROR_FETCHING_PRODUCTS: "Error Fetching Products!!!",
  ERROR_FETCHING_PAGINATION_DATA: "Error Fetching Pagination data!!!",
  ERROR_FILTERING_DATA: "Error Filtering data!!!",
};
export const PAYMENTS_API = "/api/v1/payments";
export const PRODUCTS__API="/api/v1/products";
export const CARTS_API ="/api/v1/carts";
export const USER_API="/api/v1/users";