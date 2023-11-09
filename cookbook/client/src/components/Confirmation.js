import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "../css/modal.module.css";

// Komponenta Confirmation poskytuje modalové okno s potvrzovacím dialogem
const Confirmation = ({ show, onHide, title, message, confirmText, onConfirm }) => {
  // 'show' řídí, zda se modal zobrazí
  return (
    <Modal show={show} onHide={onHide} size="sm" className={styles.modal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Zrušit
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Confirmation;
