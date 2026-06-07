import "./PlayersList.css";
import ListGroup from "react-bootstrap/ListGroup";
function PlayersList({ players }) {
  const player_profile = players.map((player) => {
    return (
      <ListGroup.Item
        variant="secondary"
        action
        style={{
          width: "60%",
          textAlign: "center",
          margin: "auto",
        }}
        onClick={() => {
          // player.idを使って選手詳細画面に遷移
          console.log(player.id);
        }}
      >
        <div className="player_profile" id={player.id}>
          <div>
            <a>{player.position}</a>
          </div>
          <div>
            <a>
              <img src={player.photo}></img>
            </a>
          </div>
          <div>
            <a>No:{player.number}</a>
          </div>
          <div>
            <a>{player.name}</a>
          </div>
          <div>
            <a>Age:{player.age}</a>
          </div>
        </div>
      </ListGroup.Item>
    );
  });
  return (
    <div className="players">
      <ListGroup>{player_profile}</ListGroup>
    </div>
  );
}

export default PlayersList;
