import styles from './GraphicChartDescription.module.scss';

import grafic from '../../img/statistics.png'

interface GraphicChartDescriptionProps {
    name: string; 
    amount: string;
    data: {
        name: string; 
        quantity: number|string; 
        color: string;
    }[];
}

export default function GraphicChartDescription({ data,name,amount }: GraphicChartDescriptionProps) {
    return (
        <div className={styles['wrap']}>
            <div className={styles['container']}>
                <span className={styles['circle-wrap']}><img className={styles['img']} src={grafic} /></span>
                <span>{name}</span>
                <span className={styles['quantity']}>{amount}</span>
            </div>
            {data.map((elem, index) => (
                <div key={index} className={styles['container']}>
                    <div className={styles['circle-wrap']}>
                        <div style={{ backgroundColor: elem.color }} className={styles['circle']}></div>
                    </div>
                    <span className={styles['name']}>{elem.name}</span>
                    <span className={styles['quantity']}>{elem.quantity}</span>
                </div>
            ))}
        </div>
    );
}
