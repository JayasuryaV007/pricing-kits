'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { subscriptionAnalysis } from '~/lib/subscriptions/analysis';
import moment from 'moment';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface DataType {
  id: string;
  user_id: string;
  service_name: string;
  plan_name: string;
  price: string | null;
  billing_cycle: string;
  next_billing_date: string;
  start_date: string;
  created_at: string;
  status: string | null;
  type: string | null;
}

const ChartComponent: React.FC<{
  subscriptions: DataType[];
  startDate: string;
  endDate: string;
}> = ({ subscriptions, startDate, endDate }) => {
  const { months, totalSubscriptions, totalExpenses } = subscriptionAnalysis(
    subscriptions,
    startDate,
    endDate,
  );

  const chartOptions: ApexOptions = {
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      categories: months,
      labels: {
        formatter: (value: string) => {
          return moment(value, 'MMMM YYYY').format('MMM YYYY');
        },
      },
    },
    yaxis: [
      {
        title: {
          text: 'Total Subscriptions',
        },
        labels: {
          formatter: (value: number) => `${value}`,
        },
        min: 0,
      },
      {
        opposite: true,
        title: {
          text: 'Total Expenses ($)',
        },
        labels: {
          formatter: (value: number) => `$${value.toFixed(2)}`,
        },
        min: 0,
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

  const chartSeries = [
    {
      name: 'Total Subscriptions',
      data: totalSubscriptions,
    },
    {
      name: 'Total Expenses ($)',
      data: totalExpenses.map(Number),
    },
  ];

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="area"
      height={350}
    />
  );
};

export default ChartComponent;
