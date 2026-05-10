import PageNation from "./PageNation";
import SearchBox from "./SearchBox";
import "./TopPage.css";
import Button from "react-bootstrap/Button";
<<<<<<< Updated upstream
import React, { useState, useEffect } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> Stashed changes
function RecordList() {
  const [records, setRecords] = useState([]);
  const [target, setTarget] = useState(
    "http://127.0.0.1:8000/api/v1/records/?ordering=-id",
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
              target === "http://127.0.0.1:8000/api/v1/records/?ordering=-id"
            ) {
              setOrder(order === "up" ? "down" : "up");
              setTarget("http://127.0.0.1:8000/api/v1/records/?ordering=id");
            } else {
              setOrder(order === "up" ? "down" : "up");
              setTarget("http://127.0.0.1:8000/api/v1/records/?ordering=-id");
            }
          }}
        >
          <i class={`bi bi-arrow-${order}-square-fill`}></i>
        </Button>
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
          <tbody style={{ textAlign: "center" }}>
            {records.results ? (
              records.results.map((record, index) => (
                <tr key={index} className="record">
                  <td className="match-info">
                    <div className="home_team">
                      <img className="team-logo" src={record.home_team_logo} />

                      <div className="home-team-name">
                        {record.home_team_name}(Home)
                      </div>
                    </div>

                    <div className="game">
                      <div className="round">
                        第{record.round}節<br />
                        {record.home_score}-{record.away_score}
                      </div>
                    </div>

                    <div className="away_team">
                      <img className="team-logo" src={record.away_team_logo} />

                      <div className="away-team-name">
                        {record.away_team_name}(Away)
                      </div>
                    </div>
                  </td>
                  <td className="title">
                    <p>{record.title}</p>
                  </td>
                  <td className="match-day">
                    <p className="record-match-day">{record.match_day}</p>
                  </td>
                  <td className="created-by">
                    <p>{record.created_by_id}</p>
                  </td>
                  <td className="nice-count">
                    <p class="fa fa-soccer-ball-o"></p>
                    <p>{record.nice_count}</p>
                  </td>
                </tr>
              ))
            ) : (
              <h1>該当データがありません。</h1>
            )}
          </tbody>
        </table>
        <PageNation records={records} changeTarget={setTarget} />
      </div>
    </main>
  );
}
export default RecordList;
