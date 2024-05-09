import { useEffect, useState } from 'react';
import Arrow from '../../SVG/Arrow/Arrow';
import styles from './SelectTarget.module.scss';

interface StatusToggleProps {
    updateStatus: (newStatus: string) => void;
}



export default function SelectTarget ({updateStatus}:StatusToggleProps) {

    
    const [status,setStatus] = useState("consideration")
    const [isStatus, setIsStatus] = useState(status);
    const [isActive, setIsActive] = useState(false);
    const [color, setColor] = useState('');

    useEffect(() => {
        if (status === 'FB') {
            setColor('rgb(33, 96, 164)');
        } else if (status === 'consideration') {
            setColor('#585656');
        } 
        
    }, [status]);


    const handleStatusChange = (status: string, newColor: string) => {
        setIsStatus(status);
        setColor(newColor);
        setIsActive(!isActive)
        updateStatus(status)
    };

    return (
        <div className={styles['status-toggle']}>
            <div className={styles['title']}>
                <span>Select: </span>
                <span>Target</span>
            </div>
            <div onClick={() => setIsActive(!isActive)} style={{ backgroundColor: color }} className={styles['wrap']}>
                {isStatus}
                <span >
                    <Arrow active={isActive} activeColor={'white'} color={'black'} />
                </span>
            </div>
            {isActive ? (
                <div className={styles['container-variants']}>
                    <span onClick={() => handleStatusChange('FB', 'rgb(33, 96, 164)')} className={styles['fb']}>
                        FB
                    </span>
                    <span onClick={() => handleStatusChange('consideration', '#585656')} className={styles['consideration']}>
                        Tik-Tok
                    </span>
                    <span onClick={() => handleStatusChange('consideration', '#585656')} className={styles['consideration']}>
                        Other
                    </span>
                </div>
            ) : null}
        </div>
    );
}