import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
function SearchBox({ changeTarget }) {
  const [value, setValue] = useState("");
  return (
    <>
      <Form.Control
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="タイトルを検索してください"
        style={{
          width: "25%",
          marginLeft: "5%",
          display: "inline-block",
        }}
      />
      <Button
        variant="light"
        size="m"
        id="pvB"
        style={{
          backgroundColor: "#F5F5F5",
        }}
        onClick={() =>
          changeTarget(`http://127.0.0.1:8000/api/v1/records/?title=${value}`)
        }
      >
        <i class="bi bi-search"></i>
      </Button>
    </>
  );
}
export default SearchBox;
