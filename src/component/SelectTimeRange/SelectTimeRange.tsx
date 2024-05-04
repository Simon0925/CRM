import { useState } from 'react';
import styles from './SelectTimeRange.module.scss';
import Calendar from '../Calendar/Calendar';

interface SelectTimeRangeProps {
    setDate: (dateRange: { from: string; to: string }) => void;
}

export default function SelectTimeRange({ setDate }: SelectTimeRangeProps) {
    const [selectedDayFrom, setSelectedDayFrom] = useState<number>(0);
    const [selectedMonthFrom, setSelectedMonthFrom] = useState<number>(0);
    const [selectedYearFrom, setSelectedYearFrom] = useState<number>(0);

    const [selectedDayTo, setSelectedDayTo] = useState<number>(0);
    const [selectedMonthTo, setSelectedMonthTo] = useState<number>(0);
    const [selectedYearTo, setSelectedYearTo] = useState<number>(0);

    const [active, setActive] = useState(false);
    const [currentValue, setCurrentValue] = useState({
        from: 'Start date',
        to: 'End date'
    });

    const handleDateChangeFrom = (day: number, month: number, year: number) => {
        setSelectedDayFrom(day);
        setSelectedMonthFrom(month);
        setSelectedYearFrom(year);
        setCurrentValue({
            from: `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${String(year).padStart(2, '0')}`,
            to: currentValue.to
        });
        setDate({
            from: `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${String(year).padStart(2, '0')}`,
            to: currentValue.to
        });
    };

    const handleDateChangeTo = (day: number, month: number, year: number) => {
        setSelectedDayTo(day);
        setSelectedMonthTo(month);
        setSelectedYearTo(year);
        setCurrentValue({
            from: currentValue.from,
            to: `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${String(year).padStart(2, '0')}`
        });
        setDate({
            from: currentValue.from,
            to: `${String(day).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}/${String(year).padStart(2, '0')}`
        });
    };

    const toggle = () => {
        setActive(!active);
    };

    return (
        <div className={styles['wrap']}>
            <div onClick={toggle} className={styles['title']}>
                <span>{currentValue.from}</span>
                <span>~</span>
                <span>{currentValue.to}</span>
            </div>
            <div className={!active ? styles['active'] : styles['calendar-container']}>
                <Calendar
                    selectedDay={selectedDayFrom}
                    selectedMonth={selectedMonthFrom}
                    selectedYear={selectedYearFrom}
                    onDateChange={handleDateChangeFrom}
                />
                <Calendar
                    selectedDay={selectedDayTo}
                    selectedMonth={selectedMonthTo}
                    selectedYear={selectedYearTo}
                    onDateChange={handleDateChangeTo}
                />
            </div>
        </div>
    );
}
