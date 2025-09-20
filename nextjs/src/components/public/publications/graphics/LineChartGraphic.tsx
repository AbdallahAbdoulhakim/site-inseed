import useWindowSize from "@/hooks/useWindowSize";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
  Line,
  LineChart,
} from "recharts";

interface DataForm {
  [key: string]: string | number;
}

const colorsList = ["#ed6146", "#56407f", "#b569af", "#7fb3ee"];

const CustomXAxisTick = ({
  x,
  y,
  payload,
}: {
  x?: number;
  y?: number;
  payload?: any;
}) => {
  const { width } = useWindowSize();
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="end"
        fill="#666"
        fontSize={!width || width < 768 ? 10 : 14}
        transform="rotate(-35)"
      >
        {payload?.value}
      </text>
    </g>
  );
};

export default function LineChartGraphic({
  data,
  columns,
  xAxisLegend,
  yAxisLegend,
  startFrom,
}: {
  data: DataForm[];
  columns: string[] | undefined | null;
  xAxisLegend: string;
  yAxisLegend: string;
  startFrom: number | undefined | null;
}) {
  if (!columns) {
    return <p className="text-red font-semibold">No Graph!</p>;
  }

  if (columns.length < 1) {
    return <p className="text-red font-semibold">Bad csv!</p>;
  }

  if (columns.length > 4) {
    return (
      <p className="text-red font-semibold">Too much columns in the data!</p>
    );
  }

  const { width } = useWindowSize();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 35,
          bottom: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={columns[0]}
          interval={!width || width < 768 ? 5 : data.length > 15 ? 2 : 0}
          tick={<CustomXAxisTick />}
        >
          <Label
            value={xAxisLegend}
            position={"insideBottom"}
            offset={-25}
            style={{ fill: "#008374", fontSize: 14 }}
            dy={10}
            dx={20}
          />
        </XAxis>
        <YAxis
          width={25}
          tickMargin={10}
          fontSize={14}
          domain={[!startFrom ? "dataMin" : startFrom, "dataMax"]}
        >
          <Label
            value={yAxisLegend}
            angle={270}
            position={{ x: -20, y: 180 }}
            style={{ fill: "#008374", fontSize: 14 }}
          />
        </YAxis>
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: "14px", bottom: 0 }} offset={15} />

        {columns
          .filter((_, index) => index !== 0)
          .map((col, index) => {
            return (
              <Line
                key={index}
                type="monotone"
                dataKey={col}
                stroke={colorsList[index]}
                dot={!width || width < 768 ? false : true}
              />
            );
          })}
      </LineChart>
    </ResponsiveContainer>
  );
}
