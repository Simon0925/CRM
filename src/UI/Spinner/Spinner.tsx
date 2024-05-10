import styles from './Spinner.module.scss';



export default function Spinner () {
    return(
        <>
        <div className={styles['wrap']}>
            <span className={styles['loader']}></span>
        </div>
        </>
    )
}