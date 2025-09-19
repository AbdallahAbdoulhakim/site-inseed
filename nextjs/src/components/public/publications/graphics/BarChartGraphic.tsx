import useWindowSize from "@/hooks/useWindowSize";
import { splitString, truncateString } from "@/lib/miscellaneous";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Label,
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

const CustomizedAxisTick = ({
  x,
  y,
  stroke,
  payload,
}: {
  x?: number;
  y?: number;
  stroke?: any;
  payload?: any;
}) => {
  const { width } = useWindowSize();

  const returnedStr =
    !width || width <= 768
      ? truncateString(payload.value, 10)
      : truncateString(payload.value, 75);

  const [firstPhrase, secondPhrase, thirdPhrase] = splitString(returnedStr);

  return (
    <g transform={`translate(${x},${y})`}>
      <text x="0" y="0" fontSize={10} textAnchor="end">
        {firstPhrase && <tspan>{firstPhrase}</tspan>}
        {secondPhrase && (
          <tspan x="0" dy="10">
            {secondPhrase}
          </tspan>
        )}
        {thirdPhrase && (
          <tspan x="0" dy="10">
            {thirdPhrase}
          </tspan>
        )}
      </text>
    </g>
  );
};

export default function BarChartGraphic({
  data,
  columns,
  xAxisLegend,
  yAxisLegend,
  type,
}: {
  data: DataForm[];
  columns: string[] | undefined | null;
  xAxisLegend: string;
  yAxisLegend: string;
  type: "vertical" | "horizontal";
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

  const size = useWindowSize();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout={type}
        margin={{
          top: 20,
          right: 30,
          left: 35,
          bottom: type === "vertical" ? 10 : 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type={type === "horizontal" ? "category" : "number"}
          dataKey={type === "horizontal" ? columns[0] : undefined}
          interval={0}
          tick={type === "horizontal" ? <CustomXAxisTick /> : true}
        >
          <Label
            value={xAxisLegend}
            position={"insideBottom"}
            offset={type === "vertical" ? undefined : -40}
            style={{ fill: "#008374", fontSize: 14 }}
            dy={10}
            dx={20}
          />
        </XAxis>
        <YAxis
          width={
            type === "vertical"
              ? size?.width
                ? size.width > 768
                  ? 150
                  : 50
                : 150
              : 10
          }
          tickMargin={10}
          fontSize={type === "vertical" ? 10 : 14}
          type={type === "vertical" ? "category" : "number"}
          dataKey={type === "vertical" ? columns[0] : undefined}
          tick={type === "vertical" ? <CustomizedAxisTick /> : true}
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
        <ReferenceLine x={0} stroke="#000" />

        {columns
          .filter((_, index) => index !== 0)
          .map((col, index) => {
            return <Bar key={index} dataKey={col} fill={colorsList[index]} />;
          })}
      </BarChart>
    </ResponsiveContainer>
  );
}
