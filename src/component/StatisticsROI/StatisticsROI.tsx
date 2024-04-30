import styles from './StatisticsROI.module.scss';

import statisticPng from '../../img/statistics.png'

interface StatisticsROIProps {
    advertising:number;
    serviceSpend :number;
    otherSpend:number;
    paymentService:number;
}

export default function StatisticsROI ({advertising,serviceSpend,otherSpend,paymentService}:StatisticsROIProps) {

    return(
        <div className={styles['wrap']}>
            <div className={styles['container']}>
            <div className={styles['circle']}>
                    <div className={styles['circle1']}>
                        <img src={statisticPng} alt='statisticPng' />
                    </div>
            </div>
                <span className={styles['name']}>Category</span>
                <span className={styles['quantity']}>Amount</span>
            </div>
            <div className={styles['container']}>
                <div className={styles['circle']}>
                    <div className={styles['circle2']}></div>
                </div>
                <span className={styles['name']} >Advertising</span>
                <span className={styles['quantity']}>{advertising} $</span>
            </div>
            <div className={styles['container']}>
                 <div className={styles['circle']}>
                    <div className={styles['circle3']}></div>
                </div>
                <span className={styles['name']}>Service spend </span>
                <span className={styles['quantity']}>{serviceSpend} $</span>
            </div>
            <div className={styles['container']}>
                <div className={styles['circle']}>
                    <div className={styles['circle4']}></div>
                </div>
                <span className={styles['name']} >Other spend</span>
                <span className={styles['quantity']}>{otherSpend} $</span>
            </div>
            <div className={styles['container']}>
                <div className={styles['circle']}>
                    <div className={styles['circle5']}></div>
                </div>
                <span className={styles['name']} >Payment service</span>
                <span className={styles['quantity']}>{paymentService} $</span>
            </div>
        </div>
    );
}
