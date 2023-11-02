/* eslint-disable @typescript-eslint/no-explicit-any */
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Bullet = ({ backgroundColor, size }: any) => {
  return (
    <div
      className="CirecleBullet"
      style={{
        backgroundColor,
        width: size,
        height: size,
      }}
    ></div>
  );
};

const CustomizedLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="LegendList">
      {payload.map((entry: any, index: any) => (
        <li key={`item-${index}`}>
          <div className="BulletLabel">
            <Bullet backgroundColor={entry.payload.fill} size="10px" />
            <div className="BulletLabelText">{entry.value}</div>
          </div>
          <div style={{ marginLeft: '20px' }}>{entry.payload.value}</div>
        </li>
      ))}
    </ul>
  );
};

export default function ChartPie({ productSalesData }: any) {
  return (
    <div className="p-4" style={{ width: '100%', height: 420 }}>
      <ResponsiveContainer>
        <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Pie
            data={productSalesData}
            dataKey="value"
            innerRadius={75}
            outerRadius={85}
          >
            {productSalesData.map((entry: any, index: any) => (
              <Cell
                fill={COLORS[index % COLORS.length]}
                key={`cell-${index}`}
              />
            ))}
            {/* <Label
              content={<CustomLabel labelText="ICPs" value={15} />}
              position="center"
            /> */}
          </Pie>
          <Legend content={<CustomizedLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
