import useWindowSize from "@/hooks/useWindowSize";

import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Line,
} from "recharts";

interface DataForm {
  [key: string]: string | number;
}

const colorsList = [
  "#003a7d",
  "#008dff",
  "#ff73b6",
  "#c701ff",
  "#4ecb8d",
  "#ff9d3a",
  "#f9e858",
  "#d83034",
];

export default function StackedBarComposedGraphic({
  data,
  columns,
  compoundLineKey,
}: {
  data: DataForm[];
  columns: string[] | undefined | null;
  compoundLineKey: string | undefined | null;
}) {
  if (!columns || !compoundLineKey) {
    return <p className="text-red font-semibold">No Graph!</p>;
  }

  if (columns.length < 1) {
    return <p className="text-red font-semibold">Bad csv!</p>;
  }

  const { width } = useWindowSize();

  const newColumns = columns.filter((elt) => elt !== compoundLineKey);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        width={500}
        height={300}
        data={data}
        stackOffset="sign"
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey={newColumns[0]} />
        <YAxis />
        <Tooltip />
        <Legend />
        {newColumns
          .filter((_, index) => index !== 0)
          .map((col, index) => {
            return (
              <Bar
                key={index}
                dataKey={col}
                stackId="a"
                fill={colorsList[index]}
              />
            );
          })}
        <Line type="monotone" dataKey={compoundLineKey} stroke="#222222" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
