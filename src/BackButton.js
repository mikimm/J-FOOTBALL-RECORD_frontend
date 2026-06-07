import React from "react";
import { useNavigate } from "react-router-dom";
const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div
      class="return_button"
      style={{
        textAlign: "center",
        marginTop: "20px",
        fontSize: "20px",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          backgroundColor: "black",
          color: "white",
          borderRadius: "5px",
          border: "none",
          padding: "5px 20px",
          cursor: "pointer",
        }}
      >
        戻る
      </button>
    </div>
  );
};
export default BackButton;
