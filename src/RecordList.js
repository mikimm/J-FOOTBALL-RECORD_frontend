import PageNation from "./PageNation";
import SearchBox from "./SearchBox";
import "./TopPage.css";
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
function RecordList() {
  const [records, setRecords] = useState([]);
  const [target, setTarget] = useState(
    "http://127.0.0.1:8000/api/v1/records/list?ordering=-id",
  );
  useEffect(() => {
    fetch(target, {
      credentials: "same-origin",
    })
      .then((response) => {
        if (response.status === 403) {
          console.log("login画面へ遷移");
          window.location.href = "/login/";
        }
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
  const [order, setOrder] = useState("up");
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
              "http://127.0.0.1:8000/api/v1/records/list?ordering=-id"
            ) {
              setOrder(order === "up" ? "down" : "up");
              setTarget(
                "http://127.0.0.1:8000/api/v1/records/list?ordering=id",
              );
            } else {
              setOrder(order === "up" ? "down" : "up");
              setTarget(
                "http://127.0.0.1:8000/api/v1/records/list?ordering=-id",
              );
            }
          }}
        >
          <i class={`bi bi-arrow-${order}-square-fill`}></i>
        </Button>
        {records.results ? (
          records.results.length === 0 ? (
            <h1 style={{ textAlign: "center", marginTop: "20%" }}>Not Found</h1>
          ) : (
            <table className="record-list">
              <thead>
                <tr className="record-header">
                  <th>試合</th>
                  <th>タイトル</th>
                  <th>試合日</th>
                  <th>作成者</th>
                  <th>いいね数</th>
                </tr>
              </thead>
              {records.results.map((record, index) => (
                <tbody style={{ textAlign: "center" }}>
                  <tr key={index} className="record">
                    <td className="match-info">
                      <div className="home_team">
                        <img
                          className="team-logo"
                          src={record.home_team.team_logo}
                        />

                        <div className="home-team-name">
                          {record.home_team.team_name}
                          <br></br>(Home)
                        </div>
                      </div>

                      <div className="game">
                        <div className="round">
                          第{record.round}節<br />
                          {record.home_score}-{record.away_score}
                        </div>
                      </div>

                      <div className="away_team">
                        <img
                          className="team-logo"
                          src={record.away_team.team_logo}
                        />

                        <div className="away-team-name">
                          {record.away_team.team_name}
                          <br></br>(Away)
                        </div>
                      </div>
                    </td>
                    <td className="title">
                      <p>{record.title}</p>
                    </td>
                    <td className="match-day">
                      <p className="record-match-day">{record.match_day}</p>
                    </td>
                    <td className="user-name">
                      <p>{record.user_name}</p>
                    </td>
                    <td className="nice-count">
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
