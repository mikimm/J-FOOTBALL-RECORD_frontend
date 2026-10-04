import { Doughnut, Bar } from "react-chartjs-2";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./Players.css";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import BackButton from "./BackButton";
Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  annotationPlugin,
);
function Players() {
  let params = useParams();
  const [info, setInfo] = useState();
  useEffect(() => {
    if (params) {
      let target = `http://127.0.0.1:8000/api/v1/palyers/detail/${params.teamid}/${params.playerid}`;
      fetch(target, {
        credentials: "include",
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
  }, [params]);
  if (info) {
    //rating,Goals/Assistsの横棒チャートのオプション設定
    const horizontalBarOptions = (maxValue, stepValue) => {
      return {
        responsive: true,
        indexAxis: "y",
        scales: {
          x: {
            min: 0,
            max: maxValue,
            ticks: {
              stepSize: stepValue,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      };
    };
    //ratingの横棒チャートのデータ
    const ratingData = {
      labels: ["Rating"],
      datasets: [
        {
          axis: "y",
          data: [info.statistics[0].games.rating],
          label: "Rate",
          backgroundColor: ["rgba(2, 248, 18, 0.85)"],
        },
      ],
    };
    //goals/assistsの横棒チャートのデータ
    const gaData = {
      labels: ["Goals", "Assists"],
      datasets: [
        {
          axis: "y",
          data: [
            info.statistics[0].goals.total,
            info.statistics[0].goals.assists,
          ],
          backgroundColor: ["rgba(2, 248, 18, 0.85)", "rgba(10, 2, 248, 0.85)"],
        },
      ],
    };
    //saves/concededの横棒チャートのデータ
    const scData = {
      labels: ["Saves", "Conceded"],
      datasets: [
        {
          axis: "y",
          data: [
            info.statistics[0].goals.saves,
            info.statistics[0].goals.conceded,
          ],
          backgroundColor: ["rgba(10, 2, 248, 0.85)", "rgba(253, 1, 1, 0.85)"],
        },
      ],
    };
    //foulの縦棒スタックチャートのデータのオプション設定
    const stackedBarOptions = {
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };
    //foulの縦棒スタックチャートのデータ
    const foulData = {
      labels: ["Fouls committed"],
      datasets: [
        {
          data: [info.statistics[0].fouls.committed],
          label: "Comitted",
          backgroundColor: ["rgba(122, 116, 108, 0.2)"],
          barThickness: 90,
        },
        {
          data: [info.statistics[0].cards.yellow],
          label: "Yellow",
          backgroundColor: ["rgb(255, 238, 0)"],
          barThickness: 90,
        },
        {
          data: [info.statistics[0].cards.red],
          label: "Red",
          backgroundColor: ["rgb(249, 46, 0)"],
          barThickness: 90,
        },
      ],
    };
    //Pass,Shots,Dribbles,DuelsのPieチャートのオプション設定
    const doughnutoptions = (contentData) => {
      return {
        responsive: true,
        plugins: {
          annotation: {
            annotations: {
              dLabel: {
                type: "doughnutLabel",
                content: [contentData + "%"],
                font: { size: 60 },
                color: "black",
              },
            },
          },
        },
      };
    };
    //Pass,Shots,Dribbles,DuelsのPieチャートのデータ
    const pieData = (dataLabel, Label, data) => {
      return {
        labels: Label,
        type: "doughnut",
        datasets: [
          {
            label: dataLabel,
            data: [data[0], data[1]],
            backgroundColor: [
              "rgba(2, 248, 18, 0.85)",
              "rgba(122, 116, 108, 0.2)",
            ],
          },
        ],
      };
    };
    return (
      <div className="container">
        <div className="player-container">
          <div className="player-profile">
            <img src={info.player.photo}></img>
            <p className="player-name">
              Name:{info.player.firstname} {info.player.lastname}
            </p>
            <ul
              className="player-birth"
              style={{
                display: "flex",
                gap: 20,
                listStyle: "none",
                paddingLeft: 0,
              }}
            >
              <li>age:{info.player.age}</li>
              <li>birthday:{info.player.birth.date}</li>
            </ul>
            <ul
              className="player-origin"
              style={{
                display: "flex",
                gap: 20,
                listStyle: "none",
                paddingLeft: 0,
              }}
            >
              <li>nationality:{info.player.nationality}</li>
              <li>birthplace:{info.player.birth.place}</li>
            </ul>
            <ul
              className="player-belongs"
              style={{
                display: "flex",
                gap: 20,
                listStyle: "none",
                paddingLeft: 0,
              }}
            >
              <li className="team">team:{info.statistics[0].team.name}</li>
            </ul>
            <ul
              className="player-basic-info"
              style={{
                display: "flex",
                gap: 20,
                listStyle: "none",
                paddingLeft: 0,
              }}
            >
              <li>position:{info.statistics[0].games.position}</li>
              <li>number:{info.statistics[0].games.number}</li>
            </ul>
            <ul
              className="player-basic-info"
              style={{
                display: "flex",
                gap: 20,
                listStyle: "none",
                paddingLeft: 0,
              }}
            >
              <li>appearences:{info.statistics[0].games.appearences}</li>
              <li>minutes:{info.statistics[0].games.minutes}</li>
            </ul>
          </div>
          <div className="rating-bar-chart">
            <div
              className="rating-container"
              style={{ position: "relative", width: "280px" }}
            >
              <h1>Rating</h1>
              <Bar options={horizontalBarOptions(10, 1)} data={ratingData} />
            </div>
            {info.statistics[0].games.position != "Goalkeeper" ? (
              <div
                className="ga-container"
                style={{ position: "relative", width: "300px" }}
              >
                <h1>Goals/Assists</h1>
                <Bar options={horizontalBarOptions(30, 5)} data={gaData} />
              </div>
            ) : (
              <div
                className="sc-container"
                style={{ position: "relative", width: "300px" }}
              >
                <h1>Save/Conceded</h1>
                <Bar options={horizontalBarOptions(200, 5)} data={scData} />
              </div>
            )}
            <div
              className="chart-foul-container"
              style={{ position: "relative", width: "280px" }}
            >
              <h1>Fouls</h1>
              <Bar options={stackedBarOptions} data={foulData} />
            </div>
          </div>
        </div>
        <div className="chart-container">
          <div className="chart-pass-container">
            <h1>Passes</h1>
            <Doughnut
              options={doughnutoptions(info.statistics[0].passes.accuracy)}
              data={pieData(
                "passes",
                ["Success", "Error"],
                [
                  Math.round(
                    (info.statistics[0].passes.total *
                      info.statistics[0].passes.accuracy) /
                      100,
                  ),
                  Math.round(
                    info.statistics[0].passes.total -
                      (info.statistics[0].passes.total *
                        info.statistics[0].passes.accuracy) /
                        100,
                  ),
                ],
              )}
            />
            <p>Total:{info.statistics[0].passes.total}</p>
            <p>
              Success:
              {Math.round(
                (info.statistics[0].passes.total *
                  info.statistics[0].passes.accuracy) /
                  100,
              )}
            </p>
          </div>
          <div className="chart-shots-container">
            <h1>Shots</h1>
            <Doughnut
              options={doughnutoptions(
                info.statistics[0].shots.on != 0 &&
                  info.statistics[0].shots.on != null
                  ? Math.round(
                      (info.statistics[0].shots.on /
                        info.statistics[0].shots.total) *
                        100,
                    )
                  : 0,
              )}
              data={pieData(
                "shots",
                ["On", "Off"],
                [
                  info.statistics[0].shots.on,
                  info.statistics[0].shots.total - info.statistics[0].shots.on,
                ],
              )}
            />
            <p>Total:{info.statistics[0].shots.total}</p>
            <p>Onshots:{info.statistics[0].shots.on}</p>
          </div>
          <div className="chart-dribbles-container">
            <h1>Dribbles</h1>
            <Doughnut
              options={doughnutoptions(
                info.statistics[0].dribbles.success != 0 &&
                  info.statistics[0].dribbles.success != null
                  ? Math.round(
                      (info.statistics[0].dribbles.success /
                        info.statistics[0].dribbles.attempts) *
                        100,
                    )
                  : 0,
              )}
              data={pieData(
                "dribbles",
                ["Success", "Error"],
                [
                  info.statistics[0].dribbles.success,
                  info.statistics[0].dribbles.attempts -
                    info.statistics[0].dribbles.success,
                ],
              )}
            />
            <p>Total:{info.statistics[0].dribbles.attempts}</p>
            <p>Success:{info.statistics[0].dribbles.success}</p>
          </div>
          <div className="chart-duels-container">
            <h1>Duels</h1>
            <Doughnut
              options={doughnutoptions(
                info.statistics[0].duels.won != 0 &&
                  info.statistics[0].duels.won != null
                  ? Math.round(
                      (info.statistics[0].duels.won /
                        info.statistics[0].duels.total) *
                        100,
                    )
                  : 0,
              )}
              data={pieData(
                "duels",
                ["Win", "Lose"],
                [
                  info.statistics[0].duels.won,
                  info.statistics[0].duels.total - info.statistics[0].duels.won,
                ],
              )}
            />
            <p>Total:{info.statistics[0].duels.total}</p>
            <p>Win:{info.statistics[0].duels.won}</p>
          </div>
        </div>
        <BackButton return_destination={-1} />
      </div>
    );
  }
}
export default Players;
