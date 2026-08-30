import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Form from "react-bootstrap/Form";
import { Button, Card } from "react-bootstrap";
import { GrTextAlignCenter } from "react-icons/gr";
function MatchModal({ showMatch, setShowMatch, teamOptions }) {
  const handleClose = () => {
    setShowMatch(false);
  };
  const [teamId, SetTeamId] = useState(1);
  const [target, setTarget] = useState(
    `http://127.0.0.1:8000/api/v1/match/result/`,
  );
  const [matchInfo, setMatchInfo] = useState([]);
  useEffect(() => {
    fetch(target + teamId, {
      credentials: "same-origin",
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        const txt = JSON.stringify(result, null, " ");
        let res = JSON.parse(txt);
        setMatchInfo(res);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [teamId]);
  const onTeamId = (event) => {
    SetTeamId(event.target.value);
  };
  return (
    <Modal show={showMatch} centered={true} onHide={handleClose}>
      <Modal.Header onHide={handleClose} closeButton>
        <Modal.Title>試合一覧</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group
            className="mb-3"
            style={{ maxHeight: "450px", overflow: "auto" }}
          >
            <div>
              <select onChange={onTeamId}>{teamOptions()}</select>
            </div>
            {matchInfo.map((match) => {
              return (
                <Card>
                  <Card.Body>
                    <Card.Title>
                      {match.league.name}第{match.league.round}節
                    </Card.Title>
                    <Card.Text>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={match.teams.home.logo}
                            style={{ width: "35px", height: "35px" }}
                          />
                          <a>{match.teams.home.name}</a>
                        </div>
                        <a style={{ fontSize: "15px" }}>{match.goals.home}</a>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={match.teams.away.logo}
                            style={{ width: "35px", height: "35px" }}
                          />
                          <a>{match.teams.away.name}</a>
                        </div>
                        <a style={{ fontSize: "15px" }}>{match.goals.away}</a>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">Save</Button>
      </Modal.Footer>
    </Modal>
  );
}
export default MatchModal;
