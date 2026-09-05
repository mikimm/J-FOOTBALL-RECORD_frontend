import { useParams } from "react-router";
import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { AccordionCollapse } from "react-bootstrap";
import "./RecordDetail.css";
import BackButton from "./BackButton";
function RecordDetail() {
  const [info, setInfo] = useState(null);
  const [comments, setComments] = useState(null);
  const [error, setError] = useState("");
  let params = useParams();
  useEffect(() => {
    if (params.id) {
      let target = "http://127.0.0.1:8000/api/v1/records/" + params.id;
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
  }, [params.id]);
  useEffect(() => {
    if (params.id) {
      let target = "http://127.0.0.1:8000/api/v1/comments/" + params.id;
      fetch(target, {
        credentials: "same-origin",
      })
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          const txt = JSON.stringify(result, null, " ");
          let res = JSON.parse(txt);
          setComments(res);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [params.id]);
  return (
    <div className>
      {info ? (
        <Card>
          <Card.Header>投稿詳細</Card.Header>
          <Card.Body>
            <Card.Title>
              <h2>タイトル</h2>
              <p>{info.title}</p>
            </Card.Title>
            <Card.Subtitle>
              <h2>試合結果</h2>
              <div style={{ textAlign: "center" }}>
                <p>第{info.round}節</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p>{info.match_day}</p>
              </div>

              <div style={{ width: "60%", margin: "auto" }}>
                <div
                  style={{
                    display: "grid",

                    gridTemplateColumns: "1fr 30px",

                    alignItems: "center",
                  }}
                >
                  <div>
                    <img
                      src={info.home_team.team_logo}
                      style={{ width: "50px" }}
                    />
                    {info.home_team.team_name + "(home)"}
                  </div>
                  {info.home_score}
                </div>
                <div
                  style={{
                    display: "grid",

                    gridTemplateColumns: "1fr 30px",

                    alignItems: "center",
                  }}
                >
                  <div>
                    <img
                      src={info.away_team.team_logo}
                      style={{ width: "50px" }}
                    />
                    {info.away_team.team_name + "(away)"}
                  </div>
                  {info.away_score}
                </div>
              </div>
            </Card.Subtitle>
            <Card.Img
              variant="top"
              className="record-image"
              src={"http://127.0.0.1:8000" + info.file?.image}
            />
            <Card.Text>
              <h2>投稿内容</h2>
              <p>{info.record}</p>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <Accordion>
              <Accordion.Item>
                <Accordion.Header>コメント数:{comments.count}</Accordion.Header>
                <Accordion.Body>コメント一覧</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Footer>
        </Card>
      ) : (
        <h1>Loading...</h1>
      )}
      <BackButton />
    </div>
  );
}
export default RecordDetail;
