import GraphicChart from "../../component/GraphicChart/GraphicChart";
import GraphicChartDescription from "../../component/GraphicChartDescription/GraphicChartDescription";
import styles from "./Statistics.module.scss";
import { CirclePercent } from "../../UI/CirclePercent/CirclePercent";
import ProfitProgress from "../../component/ProfitProgress/ProfitProgress";
import { expensesStaticsService } from '../../service/expensesStaticsService'
import { applicationsStaticsService } from "../../service/applicationsStaticsService";
import { useEffect, useState } from "react";

export default function Statistics() {
   

    const [expensesStatics, setExpensesStatics] = useState({
        traficStatics: [{ percent: 0, color: '' }],
        traficData: [{ name: '', quantity: 0, color: '' }],
        profit: 0,
        roi: 0,
        totalCost: 0,
        netProfit: 0
    });

    const [applicationsStatics, setApplicationsStatics] = useState({
        approve: "0",
        statisticData: [{ name: '', quantity: 0, color: '' }],
        statusData: [{ percent: 0, color: '' }]
    })

    const getExpensesStatics = async () => {
        try {
            const data = await expensesStaticsService();
            setExpensesStatics(data);
        } catch (error) {
            console.error("Error fetching expenses statistics:", error);
        }
    };

    const getApplicationsStatics = async () => {
        try {
            const data = await applicationsStaticsService();
            console.log(data)
            setApplicationsStatics(data)
        } catch (error) {
            console.error("Error fetching expenses statistics:", error);
        }
    };

    useEffect(() => {
        getExpensesStatics();
        getApplicationsStatics();
    }, []);


    return (
        <>
            <div className={styles['wrap']}>
                <div className={styles['container']}>
                    <GraphicChart data={applicationsStatics.statusData} />
                    <GraphicChartDescription name={"Name"} amount={'Amount'} data={applicationsStatics.statisticData} />

                    <div className={styles['circle-percent']}>
                        <CirclePercent currentPercent={Number(applicationsStatics.approve)} name={"Approve"} />
                    </div>
                </div>
                <div className={styles['container']}>
                    <GraphicChart data={expensesStatics.traficStatics} />
                    <GraphicChartDescription name={"Name"} amount={'Amount'} data={expensesStatics.traficData} />

                    <div className={styles['circle-percent']}>
                        <CirclePercent currentPercent={Number(expensesStatics.roi)} name={"ROI"} />
                    </div>
                </div>
                <ProfitProgress profit={expensesStatics.profit} netProfit={expensesStatics.netProfit} />
            </div>
        </>
    );
}
