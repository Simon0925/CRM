import SadSmile from "../../SVG/SadSmile/SadSmile";
import styles from "./Statistics.module.scss";



export default function Statistics () {
    return(
        <>
            <div className={styles['wrap']}>
                <SadSmile />
                <span className={styles['number']}>404</span>
                <span className={styles['text']} >Page not found</span>
            </div>
        </>
    )
}