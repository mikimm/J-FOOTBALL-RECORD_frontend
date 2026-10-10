import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import ErrorModal from "./ErrorModal";
function TeamsList({ leagueNumber }) {
  const navigate = useNavigate();
  const [list_info, setInfo] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    if (leagueNumber) {
      let target = "http://127.0.0.1:8000/api/v1/teams/" + leagueNumber;
      fetch(target, {
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then((data) => {
              throw new Error(
                response.status + "," + response.statusText + "," + data.detail,
              );
            });
          }
        })
        .then((result) => {
          const txt = JSON.stringify(result, null, " ");
          let res = JSON.parse(txt);
          setInfo(res);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
  }, [leagueNumber]);
  if (errorMessage) {
    return <ErrorModal errorMessage={errorMessage} />;
  } else {
    const team_info = list_info.map((team) => {
      return (
        <ListGroup.Item
          variant="secondary"
          action
          style={{
            textAlign: "center",
            margin: "auto",
          }}
          onClick={() => {
            navigate(`/team/${team.id}`);
          }}
        >
          <div className="team_profile" id={team.id}>
            <div>
              <a>{team.team_name}</a>
            </div>
            <div>
              <a>
                <img src={team.team_logo} alt={team.team_name} />
              </a>
            </div>
          </div>
        </ListGroup.Item>
      );
    });
    if (list_info.length > 0) {
      return (
        <div className="team_list" style={{ display: "flex", gap: "20px" }}>
          {
            <ListGroup
              variant="secondary"
              action
              style={{
                width: "60%",
                textAlign: "center",
                margin: "auto",
              }}
            >
              {team_info}
            </ListGroup>
          }
        </div>
      );
    }
  }
}
export default TeamsList;
