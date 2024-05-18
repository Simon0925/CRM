import { useState, useEffect, useMemo, useCallback } from "react";
import GraphicChart from "../../component/GraphicChart/GraphicChart";
import GraphicChartDescription from "../../component/GraphicChartDescription/GraphicChartDescription";
import styles from "./Statistics.module.scss";
import { CirclePercent } from "../../UI/CirclePercent/CirclePercent";
import ProfitProgress from "../../component/ProfitProgress/ProfitProgress";
import { expensesStaticsService } from "../../service/expensesStaticsService";
import { applicationsStaticsService } from "../../service/applications/applicationsStaticsService";
import StatisticsBtn from "../../component/StatisticsBtn/StatisticsBtn";
import Filter from "../../component/Filter/Filter";

export default function Statistics() {
  const [active, setActive] = useState("all-statistic");
  const [fillterDate, setFillterDate] = useState({
    from: "",
    to: ""
  });

  const getExpensesStatics = useCallback(async () => {
    try {
      const data = await expensesStaticsService(fillterDate);
      return data;
    } catch (error) {
      console.error("Error fetching expenses statistics:", error);
    }
  }, [fillterDate]);

  const getApplicationsStatics = useCallback(async () => {
    try {
      const data = await applicationsStaticsService(fillterDate);
      return data;
    } catch (error) {
      console.error("Error fetching applications statistics:", error);
    }
  }, [fillterDate]);

  useEffect(() => {
    const fetchData = async () => {
      const [expensesData, applicationsData] = await Promise.all([
        getExpensesStatics(),
        getApplicationsStatics()
      ]);

      setExpensesStatics(expensesData);
      setApplicationsStatics(applicationsData);
    };

    fetchData();
  }, [getExpensesStatics, getApplicationsStatics]);

  const [expensesStatics, setExpensesStatics] = useState({
    traficStatics: [{ percent: 0, color: "" }],
    traficData: [{ name: "", quantity: 0, color: "" }],
    profit: 0,
    roi: 0,
    totalCost: 0,
    netProfit: 0
  });

  const [applicationsStatics, setApplicationsStatics] = useState({
    approve: "0",
    statisticData: [{ name: "", quantity: 0, color: "" }],
    statusData: [{ percent: 0, color: "" }]
  });

  const filteredExpensesStatics = useMemo(() => {
    if (active === "all-statistic" || active === "expenses") {
      return (
        <div className={styles["container"]}>
          <GraphicChart data={expensesStatics.traficStatics} />
          <GraphicChartDescription
            name={"Name"}
            amount={"Amount"}
            data={expensesStatics.traficData}
          />
          <div className={styles["circle-percent"]}>
            <CirclePercent currentPercent={Number(expensesStatics.roi)} name={"ROI"} />
          </div>
        </div>
      );
    }
    return null;
  }, [active, expensesStatics]);

  const filteredApplicationsStatics = useMemo(() => {
    if (active === "all-statistic" || active === "applications") {
      return (
        <div className={styles["container"]}>
          <GraphicChart data={applicationsStatics.statusData} />
          <GraphicChartDescription
            name={"Name"}
            amount={"Amount"}
            data={applicationsStatics.statisticData}
          />
          <div className={styles["circle-percent"]}>
            <CirclePercent currentPercent={Number(applicationsStatics.approve)} name={"Approve"} />
          </div>
        </div>
      );
    }
    return null;
  }, [active, applicationsStatics]);

  const profitProgress = useMemo(() => {
    if (active === "expenses") {
      return <ProfitProgress profit={expensesStatics.profit} netProfit={expensesStatics.netProfit} />;
    }
    return null;
  }, [active, expensesStatics]);

  return (
    <>
      <div className={styles["wrap"]}>
        <StatisticsBtn activBtn={setActive} />
        <Filter fillter={setFillterDate} />
        <div className={styles["content"]}>
          {filteredApplicationsStatics}
          {filteredExpensesStatics}
          {profitProgress}
        </div>
      </div>
    </>
  );
}
