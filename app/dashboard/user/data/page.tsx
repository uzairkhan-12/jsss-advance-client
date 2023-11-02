/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Chart } from '@/components/ui/charts/line-chart';
import ChartPie from '@/components/ui/charts/pie-chart';
import InsightsCard from '@/components/ui/insights-card';

const totalSalesData = [
  { date: '02 02 2023', amount: 1177 },
  { date: '03 02 2023', amount: 3177 },
  { date: '04 02 2023', amount: 1177 },
  { date: '05 02 2023', amount: 2177 },
  { date: '06 02 2023', amount: 5177 },
  { date: '07 02 2023', amount: 3177 },
];

const productSalesData = [
  { name: 'Active Campagins', value: 90 },
  { name: 'Inactive Campagins', value: 25 },
  { name: 'ICPs with no campagins', value: 10 },
];

export default function DataPage() {
  const insightsData = [
    { title: 'Page Visits Today', amount: '14k', week_status: 2.3 },
    { title: 'Page Clicks Through Rate', amount: '7.2%', week_status: 2.1 },
    { title: 'Page Sales Today', amount: '$7342', week_status: -1.8 },
    { title: 'Average Time on Page', amount: '42 Seconds', week_status: 1.3 },
  ];
  return (
    <div className="p-5 rounded-xl border border-gray-200 shadow-md grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* insight cards */}
      <section className="grid grid-cols-2 gap-5 lg:gap-12">
        {insightsData.length > 0 &&
          insightsData.map((val: any, index: any) => (
            <div className="col-span-1" key={index}>
              <InsightsCard
                amount={val.amount}
                title={val.title}
                week_status={val.week_status}
              />
            </div>
          ))}
      </section>
      {/* graphs */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* total sales */}
        <div className="col-span-1 w-full border border-gray-200 rounded-lg flex flex-col justify-center items-center">
          <Chart
            currency="$"
            datakey="amount"
            label="Sales"
            total={156927}
            totalChartData={totalSalesData}
          />
        </div>
        <div className="col-span-1 border border-gray-200 rounded-lg flex flex-col justify-center items-center">
          <ChartPie productSalesData={productSalesData} />
        </div>
      </section>
    </div>
  );
}
