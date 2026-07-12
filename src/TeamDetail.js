import { useParams } from "react-router";
import "./TeamDetail.css";
function TeamDetail({ info }) {
  return (
    <div className="col-11 col-lg-6 content-list" style={{paddingBottom: "2%" }}>
      <div className="team_info" style={{ marginLeft: "10%" }}>
        <img
          src={info.team.logo}
          alt={info.team.name}
          width="250"
          height="auto"
        />
        <img
          src={info.venue.image}
          alt={info.venue.name}
          width="300"
          height="auto"
        />
        <div className="team_info_text" style={{ display: "inline" }}>
          <p style={{ fontWeight: "bold" }}>TEAM: {info.team.name}</p>
          <p style={{ fontWeight: "bold" }}>FOUNDED: {info.team.founded}年</p>
          <p style={{ fontWeight: "bold" }}>HOMESTADIUM: {info.venue.name}</p>
          <p style={{ fontWeight: "bold" }}>HOMETOWN: {info.venue.city}</p>
          <p style={{ fontWeight: "bold" }}>
            HOME STADIUM CAPACITY: {info.venue.capacity}人
          </p>
        </div>
      </div>
    </div>
  );
}
export default TeamDetail;
