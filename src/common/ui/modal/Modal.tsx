import React, { Fragment } from "react";
import { createPortal } from "react-dom";
import { ModalProps } from "../../../interfaces/props/modal/Modal";
import classes from "./Modal.module.css";

const Backdrop: React.FC<{ onClose: () => void }> = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay: React.FC<ModalProps> = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <Fragment>
      {createPortal(<Backdrop onClose={props.onClose} />, portalElement!)}
      {createPortal(
        <ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>,
        portalElement!
      )}
    </Fragment>
  );
};

export default Modal;
