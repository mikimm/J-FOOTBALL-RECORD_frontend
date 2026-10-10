import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router";
import { useState } from "react";
function ErrorModal({ errorMessage }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const handleClose = () => {
    setShow(false);
    navigate(-1);
  };
  let err = errorMessage.split(",");
  return (
    <Modal show={show} centered={true}>
      <Modal.Header
        style={{
          backgroundColor: "#F5F5F5",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal.Title>{err[0]}Error</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: "center" }}>
        <p style={{ fontWeight: "bolder", fontSize: "25px" }}>{err[1]}</p>
        <p style={{ fontWeight: "bolder", fontSize: "25px" }}>{err[2]}</p>
      </Modal.Body>
      <Button
        style={{
          backgroundColor: "black",
          color: "white",
          borderRadius: "5px",
          border: "none",
          padding: "5px 20px",
          cursor: "pointer",
          marginTop: "5px",
        }}
        onClick={() => handleClose()}
      >
        閉じる
      </Button>
    </Modal>
  );
}

export default ErrorModal;
