import { useEffect, useState } from 'react';
import styles from './SelectUsers.module.scss';
import Arrow from '../../SVG/Arrow/Arrow';

interface StatusToggleProps {
    updateStatus: (newStatus: string) => void;
}

export default function SelectUsers({ updateStatus }: StatusToggleProps) {

    const [status,setStatus] = useState("consideration")
    const [isStatus, setIsStatus] = useState(status);
    const [isActive, setIsActive] = useState(false);
    const [color, setColor] = useState('');

    useEffect(() => {
        if (status === 'User') {
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
                <span>Group or User</span>
            </div>
            <div onClick={() => setIsActive(!isActive)} style={{ backgroundColor: color }} className={styles['wrap']}>
                {isStatus}
                <span >
                    <Arrow active={isActive} activeColor={'white'} color={'black'} />
                </span>
            </div>
            {isActive ? (
                <div className={styles['container-variants']}>
                    <span onClick={() => handleStatusChange('User', 'rgb(33, 96, 164)')} className={styles['user']}>
                        User
                    </span>
                    <span onClick={() => handleStatusChange('consideration', '#585656')} className={styles['consideration']}>
                        consideration
                    </span>
                </div>
            ) : null}
        </div>
    );
}
