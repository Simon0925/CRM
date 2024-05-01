import { useEffect, useState } from 'react';
import styles from './GraphicChart.module.scss';

interface TestGraphicChartProps {
    data: {
        percent: number;
        color: string;
    }[];
}

export default function TestGraphicChart({ data }: TestGraphicChartProps) {
    const [quantityPercent, setQuantityPercent] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const initialState: { [key: string]: number } = {};
        data.forEach((_, index) => {
            initialState[`quantityPercent${index}`] = 0;
        });
        setQuantityPercent(initialState);
    }, [data]);

    useEffect(() => {
        const interval = setInterval(() => {
            setQuantityPercent((prev) => {
                const newState = { ...prev };
                data.forEach((elem, index) => {
                    if (newState[`quantityPercent${index}`] < elem.percent) {
                        newState[`quantityPercent${index}`] += 1;
                    }
                });
                return newState;
            });
        }, 10);

        return () => clearInterval(interval);
    }, [data]);

    return (
        <div className={styles['wrap']}>
            {data.map((elem, index) => (
                <div
                    key={index}
                    style={{
                        height: `${quantityPercent[`quantityPercent${index}`]}%`,
                        backgroundColor: elem.color,
                        left: `${index * 50}px`,
                    }}
                    className={`${styles['column']} ${styles['column1']}`}
                >
                    {elem.percent}%
                </div>
            ))}
        </div>
    );
}
