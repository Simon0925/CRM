import { useEffect, useState } from 'react';
import styles from './ApplicationToggle.module.scss';
import Arrow from '../../SVG/Arrow/Arrow';

interface StatusToggleProps {
    status: string;
    updateStatus: (newStatus: string) => void;
}

export default function ApplicationToggle({ status,updateStatus }: StatusToggleProps) {
    const [isStatus, setIsStatus] = useState(status);
    const [isActive, setIsActive] = useState(false);
    const [color, setColor] = useState('');

    useEffect(() => {
        if (status === 'successful') {
            setColor('green');
        } else if (status === 'consideration') {
            setColor('#585656');
        } else if (status === 'canceled') {
            setColor('#B22222');
        }
    }, [status]);


    const handleStatusChange = (newStatus: string, newColor: string) => {
        setIsStatus(newStatus);
        setColor(newColor);
        setIsActive(!isActive)
        updateStatus(newStatus)
    };

    return (
        <div className={styles['status-toggle']}>
            <div style={{ backgroundColor: color }} className={styles['wrap']}>
                {isStatus}
                <span onClick={() => setIsActive(!isActive)}>
                    <Arrow active={isActive} activeColor={'white'} color={'black'} />
                </span>
            </div>
            {isActive ? (
                <div className={styles['container-variants']}>
                    <span onClick={() => handleStatusChange('successful', 'green')} className={styles['successful']}>
                        successful
                    </span>
                    <span onClick={() => handleStatusChange('consideration', '#585656')} className={styles['consideration']}>
                        consideration
                    </span>
                    <span onClick={() => handleStatusChange('canceled', '#B22222')} className={styles['canceled']}>
                        canceled
                    </span>
                </div>
            ) : null}
        </div>
    );
}
