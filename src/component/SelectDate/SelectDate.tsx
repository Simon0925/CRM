import { useEffect, useState } from 'react';
import Arrow from '../../SVG/Arrow/Arrow';
import styles from './SelectDate.module.scss';

interface SelectDateProps {
    setDate: (dateRange: { from: string; to: string }) => void;
}

export default function SelectDate({ setDate }: SelectDateProps) {
    const [active, setActive] = useState(false);
    const [currentValue, setCurrentValue] = useState('Today');

    const currentDate: Date = new Date();

    function formatDate(date: Date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    const today = formatDate(currentDate);
    const yesterday = formatDate(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000));
    const weekAgo = formatDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
    const monthAgo = formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate()));

    useEffect(() => {
        let to = '';
        if (currentValue === 'Today') {
            to = '';
            setDate({
                from: today ,
                to: today
            });
        } else if (currentValue === 'Yesterday') {
            to = yesterday;
            setDate({
                from: to ,
                to: to
            });
        } else if (currentValue === 'Week') {
            to = weekAgo;
            setDate({
                from: to ,
                to: today
            });
        } else if (currentValue === 'Month') {
            to = monthAgo;
            setDate({
                from: to ,
                to: today
            });
        }
       console.log('working')
    }, [currentValue, today, yesterday, weekAgo, monthAgo]);

    const toggle = (value: string) => {
        let to = '';
        setCurrentValue(value);
        setActive(!active);
        if (currentValue === 'Today') {
            to = '';
            setDate({
                from: today ,
                to: today
            });
        }
    };

    return (
        <div className={styles['select-time']}>
            <div onClick={() => setActive(!active)} className={styles['select']}>
                <span>{currentValue}</span>
                <span className={active ? styles['activeArrow'] : styles['arrow']}>
                    <Arrow active={active} activeColor={'white'} color={'#707290'} />
                </span>
            </div>
            <div className={active ? styles['active'] : styles['select-time-variant']}>
                <span onClick={() => toggle('Today')}>Today</span>
                <span onClick={() => toggle('Yesterday')}>Yesterday</span>
                <span onClick={() => toggle('Week')}>Week</span>
                <span onClick={() => toggle('Month')}>Month</span>
            </div>
        </div>
    );
}
