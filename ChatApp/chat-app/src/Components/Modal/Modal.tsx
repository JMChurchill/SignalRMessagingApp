import React, { useState, ReactElement } from "react";
import styles from "./Modal.module.css";

type ModalProps = {
  children: ReactElement[] | ReactElement;
  showModal: boolean;
  onRequestClose: (e: boolean) => void;
};

const Modal = ({ children, showModal, onRequestClose }: ModalProps) => {
  return showModal ? (
    <div
      className={`fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center ${styles.background} z-[9999999]`}
      onClick={() => onRequestClose(true)}
    >
      <div
        className={`${styles.body} shadow-2xl rounded-sm bg-white max-w-[90%] max-h-[90%] px-6 py-3 overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
