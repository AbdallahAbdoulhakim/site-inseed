import {
  FaMoneyBill,
  FaPeopleGroup,
  FaAddressBook,
  FaChartLine,
} from "react-icons/fa6";

import MainIndicator from "@/components/base/MainIndicator";

export default function MainIndicatorsContainer() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5 mt-5">
      <MainIndicator
        Icon={<FaPeopleGroup />}
        delay={200}
        value={"870 038"}
        label="Population"
        description="Estimation de la population en 2023"
      />
      <MainIndicator
        Icon={<FaMoneyBill />}
        delay={200}
        value={"- 2,0 %"}
        label="Inflation"
        description="Glissement annuel en Décembre 2023"
      />
      <MainIndicator
        Icon={<FaAddressBook />}
        delay={600}
        value={"6,5 %"}
        label="Chômage"
        description="Enquête sur l'Économie Informelle - 2022"
      />
      <MainIndicator
        Icon={<FaChartLine />}
        delay={800}
        value={"+ 3,6 %"}
        label="Croissance"
        description="Projection pour l'année 2023"
      />
    </div>
  );
}
