import { useState } from 'react';
import styles from './StatisticsBtn.module.scss';

interface StatisticsBtnProps {
    activBtn:(elem:string)=>void
}


export default function StatisticsBtn ({activBtn}:StatisticsBtnProps)  {
    const [active, setActive] = useState({
        all: true,
        applications: false,
        expenses: false
    });

    const open = (elem:string) => {
       
        setActive(prevState => ({
            ...prevState,
            all: elem === "all-statistic",
            applications: elem === "applications",
            expenses: elem === "expenses"
        }));
        activBtn(elem)
    }

    return(
    
        <div className={styles['wrap']}>
            <div onClick={() => open("all-statistic")}className={active.all ? styles['active-link'] : styles['not-active-link']}>
                <span className={`${styles.page} ${styles.btn1}`}>All Statistic</span><span></span>
            </div>
            <div onClick={() => open("applications")}  className={active.applications ? styles['active-link'] : styles['not-active-link']}>
                <span className={`${styles.page} ${styles.btn2}`}>Applications</span><span></span>
            </div>
            <div onClick={() => open("expenses")}  className={active.expenses ? styles['active-link'] : styles['not-active-link']}>
                <span className={`${styles.page} ${styles.btn3}`}>Expenses</span><span></span>
            </div>
        </div>
    )
}