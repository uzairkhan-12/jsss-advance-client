'use client';
import { Chart } from '@/components/ui/charts/line-chart';
import ChartPie from '@/components/ui/charts/pie-chart';

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

export default function Analytics() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* total sales */}
      <div className="col-span-1 w-full border border-gray-200 rounded-lg flex flex-col justify-center items-center h-[27rem]">
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
  );
}
