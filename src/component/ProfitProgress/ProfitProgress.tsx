import styles from './ProfitProgress.module.scss';

interface ProfitProgressProps{
    profit:number;
    netProfit:number;
}

export default function ProfitProgress ({profit,netProfit}:ProfitProgressProps) {


    return(
        <div className={styles['wrap']}>
            <div className={styles['conteiner']}>
                <div className={styles['title']}>Profit: <span>{profit} $</span></div>
                <div className={styles['title']}>Net Profit: <span>{netProfit} $</span></div>
            </div>
        </div>
    )
}