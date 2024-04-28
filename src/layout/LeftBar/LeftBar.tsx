import Navigation from '../../component/Navigation/Navigation';
import styles from './LeftBar.module.scss';

export default function LeftBar() {
    return (
        <div className={styles['wrap-left-bar']}>
            <div className={styles['logo-wrap']}>
               <span className={styles['logo']} >CRM Farhat</span> 
            </div>
            <Navigation/>
        </div>
    );
}
