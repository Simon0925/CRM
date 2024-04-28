import { useEffect, useState } from 'react';
import styles from './StatusToggle.module.scss';


interface StatusToggleProps {
    status: boolean;
    updateStatus: (newStatus: boolean) => void;
}

export default function StatusToggle({ status,updateStatus }: StatusToggleProps) {

    const  currentSatus = status ? 'Confirmed' : 'Not confirmed'

    const [isStatus, setIsStatus] = useState(currentSatus);
    const [isActive, setIsActive] = useState(false);
    const [color, setColor] = useState('');

    useEffect(() => {
        if (status === true) {
            setColor('green');
        } else if (status === false) {
            setColor('#B22222');
        }
    }, [status]);

  
    const handleStatusChange = (newStatus: string, newColor: string) => {
        let update = newStatus === 'Confirmed' ? true : false
        updateStatus(update)
        setIsStatus(newStatus);
        setColor(newColor);
        setIsActive(!isActive)
    };

    return (
        <div className={styles['status-toggle']}>
            <div onClick={() => setIsActive(!isActive)} style={{ backgroundColor: color }} className={styles['wrap']}>
                {isStatus}
            </div>
            {isActive ? (
                <div className={styles['container-variants']}>
                    <span onClick={() => handleStatusChange('Confirmed', 'green')} className={styles['confirmed']}>
                        Confirmed
                    </span>
                    <span onClick={() => handleStatusChange('Not confirmed', '#B22222')} className={styles['not-confirmed']}>
                        Not confirmed
                    </span>
                </div>
            ) : null}
        </div>
    );
}
