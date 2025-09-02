import {
  FaMoneyBill,
  FaPeopleGroup,
  FaAddressBook,
  FaChartLine,
  FaBookOpen,
} from "react-icons/fa6";

import MainIndicator from "@/components/base/MainIndicator";

import { JSX } from "react";
import client from "@/lib/strapi";

const fetchIcon = (type: string): JSX.Element => {
  if (type === "population") {
    return <FaPeopleGroup />;
  }

  if (type === "inflation") {
    return <FaMoneyBill />;
  }

  if (type === "chomage") {
    return <FaAddressBook />;
  }

  if (type === "croissance") {
    return <FaChartLine />;
  }

  return <FaBookOpen />;
};

export default async function MainIndicatorsContainer() {
  const mainIndicators = client.collection("main-indicators");
  const { data: allIndicators } = await mainIndicators.find({
    sort: "updatedAt:desc",
  });

  if (!allIndicators.length) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5 mt-5">
      {allIndicators.slice(0, 4).map((indicator, index) => {
        const icon = fetchIcon(indicator.type);
        return (
          <MainIndicator
            key={indicator.id}
            Icon={icon}
            delay={(index + 1) * 200}
            value={`${indicator.value.toLocaleString()}${
              indicator.unit ? ` ${indicator.unit}` : ""
            }`}
            label={indicator.label}
            description={indicator.description}
          />
        );
      })}
    </div>
  );
}
