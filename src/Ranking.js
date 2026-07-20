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

  const display = (index) => {
    if (index === 0) {
      return "table-row";
    } else {
      return "none";
    }
  };

  return (
    <main>
      <Tabs
        id="controlled-tab-example"
        onSelect={(key) => {
          setKey(key);
          setTarget(`http://127.0.0.1:8000/api/v1/league/ranking/${key}`);
        }}
        className="mb-3"
        style={{
          justifyContent: "center",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <Tab
          tabClassName="j1_tab"
          eventKey="98"
          title={
            <img
              className="league-logo"
              src="images/j1_league.png"
              width="70"
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
              width="70"
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
              width="70"
            />
          }
        ></Tab>
      </Tabs>
      <table className="ranking_table">
        {ranking && ranking.length > 0 ? (
          ranking.map((rank, index) => (
            <>
              <tr className="sticky-top" style={{ display: display(index) }}>
                <th className="ranking_th">
                  <div>順位 </div>
                  <i
                    class="bi bi-arrow-down-up"
                    onClick={() => {
                      sortClick("rank");
                    }}
                  ></i>
                </th>
                <th className="ranking_th" style={{ width: "4%" }}>
                  <div>チーム</div>
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
              <tr className="ranking_tr">
                <td className="ranking_td" index={index}>
                  {rank.rank}
                </td>
                <td
                  className="ranking_td"
                  index={index}
                  style={{ textAlign: "left" }}
                >
                  <img className="logo-picture" src={rank.team.image} />
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
            </>
          ))
        ) : (
          <tr>
            <td colSpan="9">Loading...</td>
          </tr>
        )}
      </table>
    </main>
  );
}

export default Ranking;
