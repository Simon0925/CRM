

import GraphicChart from "../../component/GraphicChart/GraphicChart";
import GraphicChartDescription from "../../component/GraphicChartDescription/GraphicChartDescription";
import styles from "./Statistics.module.scss";
import { RootState } from '../../store/store';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchData } from '../../store/usersData.slice';
import { CirclePercent } from "../../UI/CirclePercent/CirclePercent";


export default function Statistics () {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    const userData = useSelector((state: RootState) => state.data.data)

    let consideration = userData.filter(elem => elem.status === 'consideration').length 
    let successful = userData.filter(elem => elem.status === 'successful').length 
    let canceled = userData.filter(elem => elem.status === 'canceled').length
    let allApplications = userData.length
    
    let considerationProsent = (consideration * 100) / userData.length
    let successfulProsent = (successful * 100 )/ userData.length
    let canceledProsent = (canceled * 100) / userData.length
    
    let approve = 100 / allApplications * successful

    return(
        <>
            <div className={styles['wrap']}>
               <GraphicChart prosent1={considerationProsent} prosent2={successfulProsent} prosent3={canceledProsent} prosent4={100} />
               <GraphicChartDescription consideration={consideration} successful={successful} canceled={canceled} allApplications={allApplications} />
               <div className={styles['circle-percent']}>
                <CirclePercent currentPercent={approve} />
               </div>
            </div>
        </>
    )
}