import { useEffect, useState } from 'react';
import styles from './GraphicChart.module.scss';

interface GraphicChartProps {
    prosent1: number;
    prosent2: number;
    prosent3: number;
    prosent4: number;
}

export default function GraphicChart({ prosent1, prosent2, prosent3, prosent4 }: GraphicChartProps) {
    const [percent1, setPercent1] = useState<number>(0);
    const [percent2, setPercent2] = useState<number>(0);
    const [percent3, setPercent3] = useState<number>(0);
    const [percent4, setPercent4] = useState<number>(0);

    useEffect(() => {
        if (percent1 < prosent1) {
            setTimeout(() => {
                setPercent1((prev) => prev + 1);
            }, 10);
        }
        if (percent2 < prosent2) {
            setTimeout(() => {
                setPercent2((prev) => prev + 1);
            }, 10);
        }
        if (percent3 < prosent3) {
            setTimeout(() => {
                setPercent3((prev) => prev + 1);
            }, 10);
        }
        if (percent4 < prosent4) {
            setTimeout(() => {
                setPercent4((prev) => prev + 1);
            }, 10);
        }
    }, [percent1, percent2, percent3, percent4, prosent1, prosent2, prosent3, prosent4]);

    return (
        <div className={styles['wrap']}>
            <div style={{ height: `${percent1}%` }} className={`${styles['column']} ${styles['column1']}`}>
                {prosent1}%
            </div>
            <div style={{ height: `${percent2}%` }} className={`${styles['column']} ${styles['column2']}`}>
                {prosent2}%
            </div>
            <div style={{ height: `${percent3}%` }} className={`${styles['column']} ${styles['column3']}`}>
                {prosent3}%
            </div>
            <div style={{ height: `${percent4}%` }} className={`${styles['column']} ${styles['column4']}`}>
                {prosent4}%
            </div>
        </div>
    );
}
