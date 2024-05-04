import { useState } from 'react';
import styles from './SpendBtn.module.scss';

interface SpendBtnProps {
    activBtn:(elem:string)=>void
}

export default function SpendBtn ({activBtn}:SpendBtnProps) {

    const [active, setActive] = useState({
        all: true,
        fb: false,
        tikTok: false,
        other: false
    });

    const open = (elem:string) => {
       
        setActive(prevState => ({
            ...prevState,
            all: elem === "all-spends",
            fb: elem === "FB",
            tikTok: elem === "Tik-Tok",
            other: elem === "Other"
        }));
        activBtn(elem)
    }

    return(
    
        <div className={styles['wrap']}>
            <div onClick={() => open("all-spends")}className={active.all ? styles['active-link'] : styles['not-active-link']}>
                <span className={`${styles.page} ${styles.btn1}`}>All Spends</span><span></span>
            </div>
            <div onClick={() => open("FB")}  className={active.fb ? styles['active-link'] : styles['not-active-link']}>
                <span className={`${styles.page} ${styles.btn2}`}>FB</span><span></span>
            </div>
            <div onClick={() => open("Tik-Tok")}  className={active.tikTok ? styles['active-link'] : styles['not-active-link']}>
                <span className={`${styles.page} ${styles.btn2}`}>Tik-Tok</span><span></span>
            </div>
            <div onClick={() => open("Other")}className={active.other ? styles['active-link'] : styles['not-active-link']}>
                <span className={`${styles.page} ${styles.btn3}`}>Other</span><span></span>
            </div>
        </div>
    )
}