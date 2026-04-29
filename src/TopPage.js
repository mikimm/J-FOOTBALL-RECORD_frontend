import RecordList from "./RecordList";
import "./TopPage.css";
import React, { useState, useEffect } from "react";
function TopPage() {
  const [records, setRecords] = useState([]);
  const [target, setTarget] = useState(
    "http://127.0.0.1:8000/api/v1/records/?page=1",
  );
  useEffect(() => {
    fetch(target, {
      credentials: "same-origin",
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const txt = JSON.stringify(result, null, " ");
        let res = JSON.parse(txt);
        setRecords(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [target]);
  return <RecordList records={records} changeTarget={setTarget} />;
}
export default TopPage;
