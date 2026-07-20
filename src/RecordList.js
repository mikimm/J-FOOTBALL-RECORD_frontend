import PageNation from "./PageNation";
import SearchBox from "./SearchBox";
import "./TopPage.css";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function RecordList() {
  const [records, setRecords] = useState([]);
  const [order, setOrder] = useState("up");
  const recordSelect = document.getElementById("record-select");
  const [mine, setMine] = useState(false);
  const [target, setTarget] = useState(
    `http://127.0.0.1:8000/api/v1/records/list?ordering=-id&mine=${mine}`,
  );
  const navigate = useNavigate();
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
  if (recordSelect) {
    recordSelect.addEventListener("change", function () {
      if (this.value === "mine") {
        setMine(true);
        setTarget(
          (mine) =>
            `http://127.0.0.1:8000/api/v1/records/list?ordering=-id&mine=${mine}`,
        );
      } else {
        setMine(false);
        setTarget(
          (mine) =>
            `http://127.0.0.1:8000/api/v1/records/list?ordering=-id&mine=${mine}`,
        );
      }
    });
  }
  return (
    <main>
      <div className="content-list">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
        <SearchBox changeTarget={setTarget} />
        <a>投稿順</a>
        <Button
          variant="light"
          size="m"
          id="pvB"
          style={{
            backgroundColor: "#F5F5F5",
          }}
          onClick={() => {
            if (
              target ===
              `http://127.0.0.1:8000/api/v1/records/list?ordering=-id&mine=${mine}`
            ) {
              setOrder(order === "up" ? "down" : "up");
              setTarget(
                `http://127.0.0.1:8000/api/v1/records/list?ordering=id&mine=${mine}`,
              );
            } else {
              setOrder(order === "up" ? "down" : "up");
              setTarget(
                `http://127.0.0.1:8000/api/v1/records/list?ordering=-id&mine=${mine}`,
              );
            }
          }}
        >
          <i class={`bi bi-arrow-${order}-square-fill`}></i>
        </Button>
        <select id="record-select" defaultValue="all">
          <option value="all">投稿一覧</option>
          <option value="mine">My投稿</option>
        </select>
        <div
          className="record-register"
          style={{
            textAlign: "center",
            marginTop: "20px",
            display: mine ? "block" : "none",
          }}
        >
          <Button variant="primary" onClick={() => navigate(`/register`)}>
            POST
          </Button>
        </div>
        {records.results ? (
          records.results.length === 0 ? (
            <h1 style={{ textAlign: "center", marginTop: "20%" }}>Not Found</h1>
          ) : (
            <table
              className="record-list"
              style={{ textAlign: "center", width: "100%" }}
            >
              <thead>
                <tr className="record-header">
                  <th>card</th>
                  <th>result</th>
                  <th>title</th>
                  <th>match day</th>
                  <th style={{ display: mine ? "none" : "table-cell" }}>
                    user
                  </th>
                  <th style={{ display: mine ? "table-cell" : "none" }}>
                    action
                  </th>
                  <th className="d-none d-lg-block">nice count</th>
                </tr>
              </thead>
              {records.results.map((record, index) => (
                <tbody>
                  <tr key={index} className="record">
                    <td className="match-info">
                      <div>第{record.round}節</div>
                      <a className="home_team">
                        <img
                          className="team-logo"
                          src={record.home_team.team_logo}
                        />
                      </a>
                      vs
                      <a className="away_team">
                        <img
                          className="team-logo"
                          src={record.away_team.team_logo}
                        />
                      </a>
                    </td>
                    <td className="result">
                      <p className="game">
                        <p className="round">
                          {record.home_score}-{record.away_score}
                        </p>
                      </p>
                    </td>
                    <td className="title">
                      <p>{record.title}</p>
                    </td>
                    <td className="match-day">
                      <p className="record-match-day">{record.match_day}</p>
                    </td>
                    <td
                      className="user-name"
                      style={{ display: mine ? "none" : "table-cell" }}
                    >
                      <p>{record.user_name}</p>
                    </td>
                    <td
                      className="action"
                      style={{ display: mine ? "table-cell" : "none" }}
                    >
                      <Button
                        variant="outline-success"
                        style={{ fontSize: 10 }}
                      >
                        EDIT
                      </Button>
                      <div>or</div>
                      <Button variant="outline-danger" style={{ fontSize: 10 }}>
                        DELETE
                      </Button>
                    </td>
                    <td className="d-none d-lg-table-cell">
                      <p class="fa fa-soccer-ball-o"></p>
                      <p>{record.nice_count}</p>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          )
        ) : (
          <h1 style={{ textAlign: "center", marginTop: "20%" }}>Loading...</h1>
        )}
        {records.results && records.results.length > 0 ? (
          <PageNation records={records} changeTarget={setTarget} />
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
export default RecordList;
