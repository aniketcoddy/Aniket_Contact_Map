import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as chartjs } from 'chart.js/auto';
import { useQuery } from '@tanstack/react-query';
import Axios from 'axios';

interface ReportData {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

interface ChartData {
    labels: string[];
      datasets:{
        label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
      borderWidth: number;
    }[];
  }


function Graph() {
  const { data: Report, isLoading } = useQuery<ReportData>(['graphs'], () => {
    return Axios.get('https://disease.sh/v3/covid-19/historical/all?lastdays=all').then((res) => res.data);
  });

  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: 'Cases',
        data: [],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 2,
      },
      {
        label: 'Deaths',
        data: [],
        fill: false,
        borderColor: 'rgba(255,0,0,1)',
        borderWidth: 2,
      },
      {
        label: 'Recoveries',
        data: [],
        fill: false,
        borderColor: 'rgba(0,128,0,1)',
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    if (Report && Report.cases) {
      const dates = Object.keys(Report.cases);
      const casesData = Object.values(Report.cases);
      const deathsData = Object.values(Report.deaths);
      const recoveriesData = Object.values(Report.recovered);

      
      setChartData((prevChartData : ChartData) => {
        return {
            ...prevChartData,
          labels: dates,
          datasets: [
            {
              ...prevChartData.datasets[0],
              data: casesData,
            },
            {
              ...prevChartData.datasets[1],
              data: deathsData,
            },
            {
              ...prevChartData.datasets[2],
              data: recoveriesData,
            },
          ],
        };
      });      
    }
  }, [Report]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-56">
        <span className="w-16 h-16 border-8 border-t-8 border-t-red-500 animate-spin rounded-full"></span>
      </div>
    );
  }

  if (!Report || Object.keys(Report).length === 0) {
    return (
      <div className="flex justify-center items-center mt-56">
        <h1>No Data Available</h1>
      </div>
    );
  }

  document.title = 'Covid Graph';

  return (
    <div className="mt-14 3xl:mt-14 flex flex-col justify-center items-center 2xl:mt-10 lg:mt-10 md:mt-4">
      <div className="font-[Roboto] text-5xl 3xl:text-4xl 2xl:text-3xl lg:text-2xl xs:text-xl text-white font-semibold flex justify-center items-center xs:gap-2 gap-3">
        Graphical
        <span className="font-[Roboto] text-5xl 2xl:text-3xl 3xl:text-4xl xs:text-xl lg:text-2xl text-[#00C66C] font-semibold">
          Representation
        </span>
      </div>

      <div className="w-[1200px] h-[600px] flex flex-col xs:ml-10 3xl:w-[840px] 3xl:h-[420px] 2xl:w-[600px] 2xl:h-[300px] xs:w-[480px] xs:h-[240px] xs:rotate-90 xs:mt-40  lg:mt-8 3xl:mt-10 mt-20">
        <Line data={chartData} />
        <div>
          <h1 className="text-3xl 3xl:text-xl 2xl:text-base xs:text-xs flex justify-center items-center 3xl:p-2 mt-14 3xl:mt-8 lg:mt-5 font-[Roboto] text-white border-4 p-3 border-[rgba(0,128,0,1)] border-solid">
            This is the Graphical representation of the effect of COVID within the span of 3 years
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Graph;
