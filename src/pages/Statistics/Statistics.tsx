

import GraphicChart from "../../component/GraphicChart/GraphicChart";
import GraphicChartDescription from "../../component/GraphicChartDescription/GraphicChartDescription";
import styles from "./Statistics.module.scss";
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData } from '../../store/usersData.slice';
import { CirclePercent } from "../../UI/CirclePercent/CirclePercent";
import StatisticsROI from "../../component/StatisticsROI/StatisticsROI";


export default function Statistics () {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const userData = useSelector((state: RootState) => state.data.data)

    let consideration = userData.filter(elem => elem.status === 'consideration').length 
    let successful = userData.filter(elem => elem.status === 'successful').length 
    let canceled = userData.filter(elem => elem.status === 'canceled').length
    let trash = userData.filter(elem => elem.status === 'trash').length
    let allApplications = userData.length
    
    let considerationProsent = ((consideration * 100) / userData.length).toFixed(0)
    let successfulProsent = ((successful * 100 )/ userData.length).toFixed(0)
    let canceledProsent = ((canceled * 100) / userData.length).toFixed(0)
    let trashProsent = ((trash * 100) / userData.length).toFixed(0)
    let allApplicationsProsent = ((allApplications * 100) / userData.length ).toFixed(0)


    
    let approve = (100 / (allApplications - consideration - trash ) * successful).toFixed(0)

    return(
        <>
            <div className={styles['wrap']}>
                <div className={styles['container']}>                
                <GraphicChart
                    prosent1={Number(considerationProsent)}
                    prosent2={Number(successfulProsent)}
                    prosent3={Number(canceledProsent)}
                    prosent4={Number(trashProsent)}
                    prosent5={Number(allApplicationsProsent)}
                />
                    <GraphicChartDescription consideration={consideration} successful={successful} canceled={canceled} allApplications={allApplications} trash={trash} />
                    <div className={styles['circle-percent']}>
                        <CirclePercent currentPercent={Number(approve)} />
                    </div>
               </div>
               <StatisticsROI advertising={0} serviceSpend={0} otherSpend={0} paymentService={0} />
            </div>
        </>
    )
}