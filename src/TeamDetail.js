import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import "./TeamDetail.css";
function TeamDetail({ info }) {
  return (
    <div className="content-list">
      <div className="team_images">
        <img
          src={info.team.logo}
          alt={info.team.name}
          width="250"
          height="auto"
          style={{ marginRight: "150px" }}
        />
        <img
          src={info.venue.image}
          alt={info.venue.name}
          width="400"
          height="auto"
          style={{ marginLeft: "50px" }}
        />
      </div>
      <div className="team_info" style={{ marginLeft: "200px" }}>
        <p>チーム名: {info.team.name}</p>
        <p>発足年: {info.team.founded}年</p>
        <p>ホームスタジアム: {info.venue.name}</p>
        <p>ホームタウン: {info.venue.city}</p>
        <p>ホームスタジアムの収容人数: {info.venue.capacity}人</p>
      </div>
    </div>
  );
}
export default TeamDetail;
