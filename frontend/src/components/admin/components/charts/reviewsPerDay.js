import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

export const ReviewsPerDayChart = ({ reviews }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Reviews Per Day",
      },
    },
  };

  const labels = reviews.days;
  // map((review) => {
  //   return review.companyName;
  // });

  const data = {
    labels,
    datasets: [
      {
        label: "Reviews",
        data: reviews.reviewCount,
        // map((company) => {
        //   return company.averageRating;
        // }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} style={{ width: "450px" }} />;
  // <Bar options={options} data={data} style={{ width: "450px" }} />;
};
