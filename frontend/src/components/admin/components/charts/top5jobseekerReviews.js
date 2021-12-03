// import { Chart } from 'react-chartjs-2';
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

export const Top5JobSeekerReviewsChart = ({ jobseekers }) => {
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
        text: "Top 5 Job Seekers (Accepted Reviews)",
      },
    },
  };

  const labels = jobseekers.map((jobseeker) => {
    return jobseeker.jobSeekerInfo[0].firstName;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Accepted Reviews",
        data: jobseekers.map((jobseeker) => {
          return jobseeker.acceptedReviews;
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} style={{ width: "450px" }} />;
};
