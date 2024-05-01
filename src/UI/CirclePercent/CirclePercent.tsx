import styles from './CirclePercent.module.scss';
import { useEffect, useState, useMemo, CSSProperties } from 'react';

interface CirclePercentProps {
    currentPercent: number,
    radius?: number,
    name:string
}

export function CirclePercent({
    currentPercent,
    radius = 40,
    name
}: CirclePercentProps) {
    const [percent, setPercent] = useState<number>(0);

    const twoP = useMemo(() => (2 * (22 / 7)), []);
    const delay = useMemo(() => (1 - (percent / 100)), [percent]);
    const circleCircumstance = useMemo(() =>
        twoP * radius,
        [twoP, radius]);

    const converted = useMemo(() => ({
        strokeDasharray: `${circleCircumstance}`,
        strokeDashoffset: `${delay * circleCircumstance}`,
        stroke: 'rgb(74 124 74)'
    }), [circleCircumstance, delay]);

    const st: CSSProperties = useMemo(() => ({
        color: '#707290',
        fontSize: '30px',
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
    }), []);

    useEffect(() => {
        if (percent < currentPercent) {
            setTimeout(() => {
                setPercent((prev) => prev + 1);
            }, 10);
        }
    }, [percent, currentPercent]);

    return (
        <div className={styles['circular-progress']}>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 100 100'
                aria-labelledby='title' role='graphic'
            >
                <circle cx="50" cy="50" r="40"></circle>
                <circle style={converted} cx="50" cy="50" r="40" id='pct-ind'></circle>
            </svg>
            <p style={st} className={styles['pct']}><span>{name}</span>{percent}%</p>
        </div>
    );
}
