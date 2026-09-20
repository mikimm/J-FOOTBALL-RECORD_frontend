import { useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { Button } from "react-bootstrap";
import "./RecordDetail.css";
import BackButton from "./BackButton";
import React from "react";

function RecordDetail() {
  const [info, setInfo] = useState(null);
  const [comments, setComments] = useState(null);
  const [messages, setMessages] = useState([]);
  const [comment, setComment] = useState("");
  const [count, setCount] = useState(0);
  const webSocketRef = useRef(null);

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
      target = "http://127.0.0.1:8000/api/v1/comments/" + params.id;
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
  useEffect(() => {
    // WebSocket接続が既に開かれている場合は、新たに作成しない
    if (
      webSocketRef.current &&
      webSocketRef.current.readyState === WebSocket.OPEN
    ) {
      return;
    }

    webSocketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/comment/`);

    // 接続が開かれた時の処理
    const onOpen = () => {
      console.log("WebSocket Connected");
    };

    // メッセージ受信時の処理
    const onMessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((messages) => [...messages, data]);
      setCount((prevCount) => prevCount + 1);
      console.log("hello");
    };

    // エラー発生時の処理
    const onError = (e) => {
      console.log("WebSocket Error: ", e);
    };

    // 接続が閉じられた時の処理
    const onClose = () => {
      console.log("WebSocket Disconnected");
    };

    // イベントリスナーの設定
    webSocketRef.current.addEventListener("open", onOpen);
    webSocketRef.current.addEventListener("message", onMessage);
    webSocketRef.current.addEventListener("error", onError);
    webSocketRef.current.addEventListener("close", onClose);

    return () => {
      webSocketRef.current.removeEventListener("open", onOpen);

      webSocketRef.current.removeEventListener("message", onMessage);

      webSocketRef.current.removeEventListener("error", onError);

      webSocketRef.current.removeEventListener("close", onClose);

      // CONNECTINGでもOPENでも閉じる

      if (webSocketRef.current.readyState !== WebSocket.CLOSED) {
        webSocketRef.current.close();
      }
    };
  }, []);
  const postComment = async (event) => {
    event.preventDefault(); // フォームのデフォルト送信を防止

    if (comment.trim() === "") return; // 空のメッセージは送信しない

    if (
      webSocketRef.current &&
      webSocketRef.current.readyState === WebSocket.OPEN
    ) {
      webSocketRef.current.send(
        JSON.stringify({
          type: "message",
          message: comment,
        }),
      );
    }
    setComment("");
  };

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
            {comments ? (
              <Accordion>
                <Accordion.Item>
                  <div style={{ textAlign: "center" }}>
                    <input
                      style={{ width: "50%" }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></input>
                    <Button
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        borderRadius: "5px",
                        border: "none",
                        padding: "5px 20px",
                        cursor: "pointer",
                      }}
                      onClick={postComment}
                    >
                      投稿
                    </Button>
                  </div>
                  <Accordion.Header>
                    コメント数:{comments.count}
                    {count}
                  </Accordion.Header>
                  <div style={{ maxHeight: "35vh", overflow: "scroll" }}>
                    {comments.comments.map((comment) => (
                      <Accordion.Body>
                        <div>{comment?.comment}</div>
                        <div style={{ textAlign: "right" }}>
                          comment_by:{comment?.comment_by}
                        </div>
                      </Accordion.Body>
                    ))}
                    {messages.map((message) => (
                      <Accordion.Body>
                        <div>{message?.comment}</div>
                        <div style={{ textAlign: "right" }}>
                          comment_by:{message?.comment_by}
                        </div>
                      </Accordion.Body>
                    ))}
                  </div>
                </Accordion.Item>
              </Accordion>
            ) : (
              <div>コメント読み込み中...</div>
            )}
          </Card.Footer>
        </Card>
      ) : (
        <h1>Loading...</h1>
      )}
      <BackButton return_destination={"/"} />
    </div>
  );
}
export default RecordDetail;
