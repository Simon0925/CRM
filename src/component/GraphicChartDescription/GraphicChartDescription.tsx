import styles from './GraphicChartDescription.module.scss';

interface GraphicChartDescriptionProps {
    consideration:number;
    successful:number;
    canceled:number;
    trash:number;
    allApplications:number;


}



export default function GraphicChartDescription  ({consideration,successful,canceled, allApplications,trash}:GraphicChartDescriptionProps) {
    return (
        <>
        <div className={styles['wrap']}>
            <div className={styles['container']}>
            <div className={styles['circle']}>
                    <div className={styles['circle1']}></div>
                </div>
                <span className={styles['name']}>Consideration</span>
                <span className={styles['quantity']}>{consideration}</span>
            </div>
            <div className={styles['container']}>
                <div className={styles['circle']}>
                    <div className={styles['circle2']}></div>
                </div>
                <span className={styles['name']} >Successful</span>
                <span className={styles['quantity']}>{successful}</span>
            </div>
            <div className={styles['container']}>
                 <div className={styles['circle']}>
                    <div className={styles['circle3']}></div>
                </div>
                <span className={styles['name']}>Canceled</span>
                <span className={styles['quantity']}>{canceled}</span>
            </div>
            <div className={styles['container']}>
                <div className={styles['circle']}>
                    <div className={styles['circle4']}></div>
                </div>
                <span className={styles['name']} >Trash</span>
                <span className={styles['quantity']}>{trash}</span>
            </div>
            <div className={styles['container']}>
                <div className={styles['circle']}>
                    <div className={styles['circle5']}></div>
                </div>
                <span className={styles['name']} >All Applications</span>
                <span className={styles['quantity']}>{allApplications}</span>
            </div>
        </div>
        </>
    )
} 