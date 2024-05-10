import { useEffect, useState } from 'react';
import Arrow from '../../SVG/Arrow/Arrow';
import styles from './SelectTarget.module.scss';

interface StatusToggleProps {
    updateStatus: (newStatus: string) => void;
}

export default function SelectTarget({ updateStatus }: StatusToggleProps) {
    const [status, setStatus] = useState("FB");
    const [isStatus, setIsStatus] = useState(status);
    const [isActive, setIsActive] = useState(false);
    const [color, setColor] = useState('');

    useEffect(() => {
        if (status === 'FB') {
            setColor('rgb(33, 96, 164)');
        } else if (status === 'Tik-Tok') {
            setColor('linear-gradient(90deg, rgba(255,0,80,1) 0%, rgba(0,242,234,1) 48%, rgba(0,0,0,1) 85%)');
        } else if (status === 'Other') {
            setColor('rgb(237, 105, 66)');
        }
    }, [status]);
    
    const handleStatusChange = (status: string, newColor: string) => {
        setIsStatus(status);
        setColor(newColor);
        setIsActive(!isActive);
        updateStatus(status);
    };
    

    return (
        <div className={styles['status-toggle']}>
            <div className={styles['title']}>
                <span>Select: </span>
                <span>Target</span>
            </div>
            <div
                onClick={() => setIsActive(!isActive)}
                style={{
                    background: color,
                }}
                className={styles['wrap']}
            >
                {isStatus}
                <span>
                    <Arrow active={isActive} activeColor={'white'} color={'black'} />
                </span>
            </div>
            {isActive ? (
                <div className={styles['container-variants']}>
                    <span onClick={() => handleStatusChange('FB', 'rgb(33, 96, 164)')} className={styles['fb']}>
                        FB
                    </span>
                    <span onClick={() => handleStatusChange('Tik-Tok', 'linear-gradient(90deg, rgba(255,0,80,1) 0%, rgba(0,242,234,1) 48%, rgba(0,0,0,1) 85%)')} className={styles['Tik-Tok']}>
                        Tik-Tok
                    </span>
                    <span onClick={() => handleStatusChange('Other', 'rgb(237, 105, 66)')} className={styles['other']}>
                        Other
                    </span>
                </div>
            ) : null}
        </div>
    );
}
