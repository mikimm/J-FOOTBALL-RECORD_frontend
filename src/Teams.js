import "./Teams.css";
import TeamsList from "./TeamsList";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import j1_league from "./images/j1_league.png";
import j2_league from "./images/j2_league.png";
import j3_league from "./images/j3_league.png";
function Teams() {
  const [key, setKey] = useState("J1");
  return (
    <main>
      <div className="Teams">
        <Tabs
          id="controlled-tab-example"
          onSelect={(key) => {
            setKey(key);
          }}
          className="mb-3"
          style={{
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Tab
            tabClassName="j1_tab"
            eventKey="98"
            title={<img className="league-logo" src={j1_league} width="70" />}
          >
            <TeamsList leagueNumber={1} />
          </Tab>
          <Tab
            tabClassName="j2_tab"
            eventKey="99"
            title={<img className="league-logo" src={j2_league} width="70" />}
          >
            <TeamsList leagueNumber={2} />
          </Tab>
          <Tab
            tabClassName="j3_tab"
            eventKey="100"
            title={<img className="league-logo" src={j3_league} width="70" />}
          >
            <TeamsList leagueNumber={3} />
          </Tab>
        </Tabs>
      </div>
    </main>
  );
}
export default Teams;
