import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
Chart.register(ArcElement, Tooltip, Legend);
Chart.defaults.backgroundColor = ["#4de925", "#b5bdc2"];
function Sample() {
  const data = {
    labels: ["Success", "Error"],
    datasets: [
      {
        label: "percentage",
        data: [80, 20],
      },
    ],
  };
  return (
    <>
      <h1>Pass Accuracy</h1>
      <div
        class="chart-container"
        style={{ position: "relative", height: "30vh" }}
      >
        <Pie data={data} />
      </div>
    </>
  );
}
export default Sample;
