import SadSmile from "../../SVG/SadSmile/SadSmile";
import styles from "./Error.module.scss";



export default function ErrorP () {
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