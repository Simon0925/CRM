import Button from '../../UI/Button/Button';
import styles from './Spam.module.scss';



export default function Spam() {
    return(
        <>
        <div className={styles['wrap']}>
            <div className={styles['container-tg-group']}>
                <div className={styles['container-inpt']}>
                    <span>Group ID</span>
                    <input placeholder='Enter group ID' />
                </div>
                <div className={styles['title-container']}>

                </div>
            </div>
        </div>
        </>
    )
}