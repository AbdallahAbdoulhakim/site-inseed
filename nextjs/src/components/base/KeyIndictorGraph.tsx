import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

interface DataForm {
  [key: string]: string | number;
}

export default function KeyIndictorGraph({
  data,
  columns,
  xAxisLegend,
  yAxisLegend,
}: {
  data: DataForm[];
  columns: string[] | undefined | null;
  xAxisLegend: string;
  yAxisLegend: string;
}) {
  if (!columns) {
    return <p className="text-red font-semibold">No Graph!</p>;
  }

  if (columns.length < 1) {
    return <p className="text-red font-semibold">Bad csv!</p>;
  }
  return (
    <div className="flex flex-col w-full lg:h-[350px] h-[400px] grow ">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={390}
          height={350}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={columns[0]}>
            <Label
              value={xAxisLegend}
              offset={-5}
              position="insideBottom"
              style={{ fill: "#008374", fontSize: 12 }}
            />
          </XAxis>
          <YAxis>
            <Label
              value={yAxisLegend}
              angle={270}
              position={{ x: 25, y: 150 }}
              style={{ fill: "#008374", fontSize: 12 }}
            />
          </YAxis>
          <Tooltip />
          <Line
            type="monotone"
            dataKey={columns[1]}
            stroke="#82ca9d"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
