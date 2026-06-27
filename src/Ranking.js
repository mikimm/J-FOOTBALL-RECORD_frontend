import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./Ranking.css";
function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [key, setKey] = useState("98");
  const [target, setTarget] = useState(
    `http://127.0.0.1:8000/api/v1/league/ranking/${key}`,
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
        setRanking(res.standings);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [target]);

  const sortClick = (sortkey) => {
    if (target.includes("order=asc")) {
      setTarget(
        `http://127.0.0.1:8000/api/v1/league/ranking/${key}?sort=${sortkey}&order=desc`,
      );
    } else if (target.includes("order=desc")) {
      setTarget(
        `http://127.0.0.1:8000/api/v1/league/ranking/${key}?sort=${sortkey}&order=asc`,
      );
    } else {
      setTarget(
        `http://127.0.0.1:8000/api/v1/league/ranking/${key}?sort=${sortkey}&order=asc`,
      );
    }
  };

  return (
    <main>
      <div
        className="team_ranking"
        style={{
          position: "absolute",
          top: "10%",
          height: "100%",
          marginLeft: "15%",
        }}
      >
        <Tabs
          id="controlled-tab-example"
          onSelect={(key) => {
            setKey(key);
            setTarget(`http://127.0.0.1:8000/api/v1/league/ranking/${key}`);
          }}
          className="mb-3"
          style={{
            justifyContent: "left",
            marginTop: "20px",
            width: "120%",
          }}
        >
          <Tab
            tabClassName="j1_tab"
            eventKey="98"
            title={
              <img
                className="league-logo"
                src="images/j1_league.png"
                width="100"
              />
            }
          ></Tab>
          <Tab
            tabClassName="j2_tab"
            eventKey="99"
            title={
              <img
                className="league-logo"
                src="images/j2_league.png"
                width="100"
              />
            }
          ></Tab>
          <Tab
            tabClassName="j3_tab"
            eventKey="100"
            title={
              <img
                className="league-logo"
                src="images/j3_league.png"
                width="100"
              />
            }
          ></Tab>
        </Tabs>
        <table className="ranking_table">
          <tr>
            <th className="ranking_th">
              <div>順位 </div>
              <i
                class="bi bi-arrow-down-up"
                onClick={() => {
                  sortClick("rank");
                }}
              ></i>
            </th>
            <th className="ranking_th">
              <div>チーム </div>
            </th>
            <th className="ranking_th">
              <div>勝ち点 </div>
              <i
                class="bi bi-arrow-down-up"
                onClick={() => {
                  sortClick("points");
                }}
              ></i>
            </th>
            <th className="ranking_th">
              <div>勝ち </div>
              <i
                class="bi bi-arrow-down-up"
                onClick={() => {
                  sortClick("all.win");
                }}
              ></i>
            </th>
            <th className="ranking_th">
              <div>引き分け </div>
              <i
                class="bi bi-arrow-down-up"
                onClick={() => {
                  sortClick("all.draw");
                }}
              ></i>
            </th>
            <th className="ranking_th">
              <div>負け </div>
              <i
                class="bi bi-arrow-down-up"
                onClick={() => {
                  sortClick("all.lose");
                }}
              ></i>
            </th>
            <th className="ranking_th">
              <div>得失点差 </div>
              <i
                class="bi bi-arrow-down-up"
                onClick={() => {
                  sortClick("goalsDiff");
                }}
              ></i>
            </th>
            <th className="ranking_th">
              <div>得点数 </div>
              <i
                class="bi bi-arrow-down-up"
                onClick={() => {
                  sortClick("all.goals.score");
                }}
              ></i>
            </th>
            <th className="ranking_th">
              <div>失点数 </div>
              <i
                class="bi bi-arrow-down-up"
                onClick={() => {
                  sortClick("all.goals.against");
                }}
              ></i>
            </th>
          </tr>
          {ranking && ranking.length > 0 ? (
            ranking.map((rank, index) => (
              <tr>
                <td className="ranking_td" index={index}>
                  {rank.rank}
                </td>
                <td
                  className="ranking_td"
                  index={index}
                  style={{ textAlign: "left" }}
                >
                  <img className="logo-picture" src={rank.team.image} />
                  <span className="team-name">{rank.team.name}</span>
                </td>
                <td className="ranking_td" index={index}>
                  {rank.points}
                </td>
                <td className="ranking_td" index={index}>
                  {rank.all.win}
                </td>
                <td className="ranking_td" index={index}>
                  {rank.all.draw}
                </td>
                <td className="ranking_td" index={index}>
                  {rank.all.lose}
                </td>
                <td className="ranking_td" index={index}>
                  {rank.goalsDiff}
                </td>
                <td className="ranking_td" index={index}>
                  {rank.all.goals.score}
                </td>
                <td className="ranking_td" index={index}>
                  {rank.all.goals.against}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">Loading...</td>
            </tr>
          )}
        </table>
      </div>
    </main>
  );
}

export default Ranking;
