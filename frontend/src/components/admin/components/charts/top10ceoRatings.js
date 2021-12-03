import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

export const Top10CeoRatingsChart = ({ ceos }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Top 10 CEOs (Approval Rating)",
      },
    },
  };

  const labels = ceos.map((ceo) => {
    return ceo.ceoName;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Approval Rating",
        data: ceos.map((ceo) => {
          return ceo.ceoApprovalRating;
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(146, 63, 224, 0.2)",
          "rgba(203, 63, 224, 0.2)",
          "rgba(224, 219, 63, 0.2)",
          "rgba(128, 12, 8, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(146, 63, 224, 1)",
          "rgba(203, 63, 224, 1)",
          "rgba(224, 219, 63, 1)",
          "rgba(128, 12, 8, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut options={options} data={data} style={{ width: "450px" }} />;
};
