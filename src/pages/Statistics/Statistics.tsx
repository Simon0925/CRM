import GraphicChart from "../../component/GraphicChart/GraphicChart";
import GraphicChartDescription from "../../component/GraphicChartDescription/GraphicChartDescription";
import styles from "./Statistics.module.scss";
import { CirclePercent } from "../../UI/CirclePercent/CirclePercent";
import { useUserData } from './Data';
import ProfitProgress from "../../component/ProfitProgress/ProfitProgress";

export default function Statistics () {
    const userData = useUserData();

    return(
        <>
            <div className={styles['wrap']}>
                <div className={styles['container']}>
                    <GraphicChart data={userData.statusData} />
                    <GraphicChartDescription name={"Name"} amount={'Amount'} data={userData.statisticData} />

                    <div className={styles['circle-percent']}>
                        <CirclePercent currentPercent={Number(userData.approve)} name={"Approve"} />
                    </div>
                </div>
                <div className={styles['container']}>
                    <GraphicChart data={userData.traficStatics} />
                    <GraphicChartDescription name={"Name"} amount={'Amount'} data={userData.traficData} />

                    <div className={styles['circle-percent']}>
                        <CirclePercent currentPercent={Number(userData.ROI)} name={"ROI"} />
                    </div>
                </div>
                <ProfitProgress profit={userData.curentValue } netProfit={userData.profit} />
            </div>
        </>
    );
}
