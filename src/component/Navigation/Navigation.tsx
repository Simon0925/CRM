import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { useEffect, useState } from 'react';

export default function Navigation () {
    const [active, setActive] = useState({
        applications: false,
        statistics: false,
    });
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.substr(1);
    
        setActive({
            applications: path === '' || path === 'consideration' || path === 'canceled' || path === 'successful',
            statistics: path === 'statistics',
        });
    }, [location.pathname]); 

    return(
        <div className={styles['wrap']}>
            <NavLink className={active.applications ? styles['active-link'] : styles['not-active-link']} to={'/'}>
                <span className={styles['page']}>Applications</span>
            </NavLink>
            <NavLink className={active.statistics ? styles['active-link'] : styles['not-active-link']} to={'/statistics'}>
                <span className={styles['page']}>Statistics</span>
            </NavLink>
        </div>
    )
}
