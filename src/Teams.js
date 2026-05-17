import "./Teams.css";
import TeamsList from "./TeamsList";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
function Teams() {
  const [key, setKey] = useState("J1");
  return (
    <main>
      <div className="Teams">
        <h1 className="menue-title">J Teams</h1>
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
          <Tab tabClassName="j1_tab" eventKey="1" title="J1 League">
            <TeamsList leagueNumber={1} />
          </Tab>
          <Tab tabClassName="j2_tab" eventKey="2" title="J2 League">
            <TeamsList leagueNumber={2} />
          </Tab>
          <Tab tabClassName="j3_tab" eventKey="3" title="J3 League">
            <TeamsList leagueNumber={3} />
          </Tab>
        </Tabs>
      </div>
    </main>
  );
}
export default Teams;
