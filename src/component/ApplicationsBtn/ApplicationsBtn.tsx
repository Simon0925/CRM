import { NavLink, useLocation } from 'react-router-dom';
import styles from './ApplicationsBtn.module.scss';
import { useEffect, useState } from 'react';

export default function Navigation () {
    const [active, setActive] = useState({
        applications: false,
        consideration: false,
        canceled: false,
        successful: false,
    });
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.substr(1);
    
        setActive({
            applications: path === '',
            consideration: path === 'consideration',
            canceled: path === 'canceled',
            successful: path === 'successful',
        });
    }, [location.pathname]); 

    return(
        <div className={styles['wrap']}>
            <NavLink className={active.applications ? styles['active-link'] : styles['not-active-link']} to={'/'}>
                <span className={`${styles.page} ${styles.btn1}`}>Applications</span><span></span>
            </NavLink>
            <NavLink className={active.consideration ? styles['active-link'] : styles['not-active-link']} to={'/consideration'}>
                <span className={`${styles.page} ${styles.btn2}`}>Consideration</span><span></span>
            </NavLink>
            <NavLink className={active.canceled ? styles['active-link'] : styles['not-active-link']} to={'/canceled'}>
                <span className={`${styles.page} ${styles.btn2}`}>Canceled</span><span></span>
            </NavLink>
            <NavLink className={active.successful ? styles['active-link'] : styles['not-active-link']} to={'/successful'}>
                <span className={`${styles.page} ${styles.btn3}`}>Successful</span>  <span></span>
            </NavLink>
        </div>
    )
}
