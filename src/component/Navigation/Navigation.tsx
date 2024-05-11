import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navigation.module.scss';
import { useEffect, useState } from 'react';

export default function Navigation () {
    const [active, setActive] = useState({
        applications: false,
        statistics: false,
        sendMessage:false,
        spam:false,
        spend:false
    });
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname.substr(1);
    
        setActive({
            applications: path === '' || path === 'consideration' || path === 'canceled' || path === 'successful'||path === 'trash',
            statistics: path === 'statistics',
            sendMessage: path === 'send-message',
            spam: path === 'spam',
            spend:path === 'spend',
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
            <NavLink className={active.sendMessage ? styles['active-link'] : styles['not-active-link']} to={'/send-message'}>
                <span className={styles['page']}>Message</span>
            </NavLink>
            {/* <NavLink className={active.spam ? styles['active-link'] : styles['not-active-link']} to={'/spam'}>
                <span className={styles['page']}>Spam</span>
            </NavLink> */}
            <NavLink className={active.spend ? styles['active-link'] : styles['not-active-link']} to={'/spend'}>
                <span className={styles['page']}>Spend</span>
            </NavLink>
            <NavLink className={active.spend ? styles['active-link'] : styles['not-active-link']} to={'/test'}>
                <span className={styles['page']}>Test</span>
            </NavLink>
        </div>
    )
}
