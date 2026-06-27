import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import PlayersList from "./PlayersList";
import TeamDetail from "./TeamDetail";
import BackButton from "./BackButton";
import "./TeamDetail.css";
function TeamDetailRoot() {
  const [info, setInfo] = useState([]);
  const [error, setError] = useState("");
  let params = useParams();
  const [key, setKey] = useState("team");
  useEffect(() => {
    if (params.id) {
      let target = "http://127.0.0.1:8000/api/v1/teams/detail/" + params.id;
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
          setInfo(res);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [params.id]);
  if (info) {
    if ((info.team === undefined) & (info.players === undefined)) {
      return (
        <h1
          style={{
            textAlign: "center",
            marginTop: "20%",
            marginBottom: "30%",
          }}
        >
          Loading...
        </h1>
      );
    } else {
      return (
        <main>
          <div className="team_detail">
            <Tabs
              id="controlled-tab-example"
              className="mb-3"
              activeKey={key}
              onSelect={(k) => setKey(k)}
              style={{
                justifyContent: "left",
                marginTop: "20px",
                marginLeft: "100px",
                borderBottom: "none",
              }}
            >
              <Tab
                tabClassName="team_info_tab"
                title="チーム情報"
                eventKey="team"
              ></Tab>
              <Tab
                tabClassName="player_info_tab"
                title="所属選手一覧"
                eventKey="player"
              ></Tab>
            </Tabs>
            {key === "team" && <TeamDetail info={info} />}
            {key === "player" && <PlayersList players={info.players} />}
          </div>
          <BackButton />
        </main>
      );
    }
  } else {
    return (
      <main>
        <div className="team_detail">
          <h1
            style={{
              textAlign: "center",
              marginTop: "20%",
              marginBottom: "30%",
            }}
          >
            Not Found
          </h1>
          <BackButton />
        </div>
      </main>
    );
  }
}
export default TeamDetailRoot;
