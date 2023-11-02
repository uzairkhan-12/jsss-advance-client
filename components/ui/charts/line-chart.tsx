/* eslint-disable @typescript-eslint/no-explicit-any */
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

interface ChartProps {
  label: string;
  total: number;
  currency?: string;
  datakey: string;
  totalChartData: any[];
}

export const Chart = ({
  label,
  total,
  currency,
  totalChartData,
  datakey,
}: ChartProps) => {
  return (
    <div className="rounded-lg border-1 border-gray-100 p-4 bg-white w-full">
      <div className="card" style={{ height: '100%' }}>
        <div className="card-body">
          <h5 className="text-lg font-bold mb-3">Total {label}</h5>
          <h1 className="mb-5 text-3xl font-bold">
            {currency}
            {total}
          </h1>
          <div style={{ width: '100%', height: '220px' }}>
            {totalChartData && (
              <ResponsiveContainer height="100%" width="100%">
                <AreaChart
                  data={totalChartData}
                  height={250}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  width={730}
                >
                  <defs>
                    <linearGradient id="colorUv" x1="0" x2="0" y1="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="#ABF9CFBD"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="#ABF9CFBD"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  {total > 0 ? (
                    // dataKey="date"
                    <XAxis
                      axisLine={{ stroke: '#e5e7eb' }}
                      tick={{ fontSize: 11 }}
                    />
                  ) : (
                    <XAxis
                      AxisComp={{ stroke: '#e5e7eb' }}
                      // dataKey="date"
                      axisLine={{ stroke: '#e5e7eb' }}
                      domain={[0, 1]}
                      tick={{ fontSize: 11 }}
                    />
                  )}
                  <Tooltip />
                  <Area
                    dataKey={datakey}
                    fill="url(#colorUv)"
                    fillOpacity={1}
                    stroke="#28A662"
                    strokeWidth={2}
                    type="monotone"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
