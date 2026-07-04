import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
function TeamsList({ leagueNumber }) {
  const [list_info, setInfo] = useState([]);
  const chunkSize = 4;
  const groupedTeams = [];
  useEffect(() => {
    if (leagueNumber) {
      let target = "http://127.0.0.1:8000/api/v1/teams/" + leagueNumber;
      fetch(target, {
        credentials: "same-origin",
      })
        .then((response) => {
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
  }, [leagueNumber]);

  for (let i = 0; i < list_info.length; i += chunkSize) {
    groupedTeams.push(list_info.slice(i, i + chunkSize));
  }
  if (list_info.length > 0) {
    return (
      <div className="team_list" style={{ display: "flex", gap: "20px" }}>
        {groupedTeams.map((group, tableIndex) => (
          <table key={tableIndex}>
            <thead>
              <tr>
                <th>チーム名</th>
                <th>エンブレム</th>
              </tr>
            </thead>
            <tbody>
              {group.map((team) => (
                <tr key={team.id}>
                  <td>
                    <Nav.Link
                      as={NavLink}
                      to={`/team/${team.id}`}
                      style={() => {
                        return { color: "blue" };
                      }}
                    >
                      {team.team_name}
                    </Nav.Link>
                  </td>
                  <td>
                    <img src={team.team_logo} alt={team.team_name} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    );
  }
}
export default TeamsList;
