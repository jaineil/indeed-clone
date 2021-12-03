import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

export const Top10CompaniesViewedChart = ({ companies }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

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
        text: "Top 10 Companies (Views)",
      },
    },
  };

  const labels = companies.map((company) => {
    return company.companyName;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Views",
        data: companies.map((company) => {
          return company.reviewCount;
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} style={{ width: "450px" }} />;
};
