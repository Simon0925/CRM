import { months } from './data';
import { useState, useEffect } from 'react';
import styles from './Calendar.module.scss';
import Years from './Years/Years';
import Days from './Days/Days';
import Arrow from '../../SVG/Arrow/Arrow';

interface CalendarProps {
    selectedDay: number;
    selectedMonth: number;
    selectedYear: number;
    onDateChange: (day: number, month: number, year: number) => void;
}

const Calendar: React.FC<CalendarProps> = ({
    selectedDay: propSelectedDay,
    selectedMonth: propSelectedMonth,
    selectedYear: propSelectedYear,
    onDateChange,
}) => {
    const currentDate = new Date();
    const [isActive, setIsActive] = useState(false);
    const [localSelectedDay, setLocalSelectedDay] = useState(propSelectedDay || currentDate.getDate());
    const [localSelectedMonth, setLocalSelectedMonth] = useState(
        propSelectedMonth !== undefined ? currentDate.getMonth() : currentDate.getMonth()
    );
    const [localSelectedYear, setLocalSelectedYear] = useState(propSelectedYear || currentDate.getFullYear());
    const [totalDays, setTotalDays] = useState(0);
    const [year, setYear] = useState(false);

    useEffect(() => {
        if (!propSelectedDay && !propSelectedMonth && !propSelectedYear) {
            setLocalSelectedDay(currentDate.getDate());
            setLocalSelectedMonth(currentDate.getMonth());
            setLocalSelectedYear(currentDate.getFullYear());
        }
    }, [propSelectedDay, propSelectedMonth, propSelectedYear, currentDate]);

    const toggleDatePicker = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.target as HTMLElement;
        const isDateContainer = target.closest(`.${styles['dates-container']}`);

        if (!isDateContainer) {
            setIsActive(!isActive);
        }
    };

    const goToPrevMonth = () => {
        let prevMonth = localSelectedMonth - 1;
        let prevYear = localSelectedYear;

        if (prevMonth < 0) {
            prevMonth = 11;
            prevYear--;
        }

        setLocalSelectedMonth(prevMonth);
        setLocalSelectedYear(prevYear);
    };

    const goToNextMonth = () => {
        let nextMonth = localSelectedMonth + 1;
        let nextYear = localSelectedYear;

        if (nextMonth > 11) {
            nextMonth = 0;
            nextYear++;
        }

        setLocalSelectedMonth(nextMonth);
        setLocalSelectedYear(nextYear);
    };

    const goToPrevYear = () => {
        setLocalSelectedYear(prev => prev - 25);
    };

    const goToNextYear = () => {
        setLocalSelectedYear(prev => prev + 25);
    };

    useEffect(() => {
        const calculateTotalDays = () => {
            const daysInMonth = new Date(localSelectedYear, localSelectedMonth + 1, 0).getDate();
            setTotalDays(daysInMonth);
        };

        calculateTotalDays();
    }, [localSelectedMonth, localSelectedYear]);

    const handleDayClick = (day: number) => {
        setLocalSelectedDay(day);
        onDateChange(day, localSelectedMonth, localSelectedYear);
    };

    useEffect(() => {
        setLocalSelectedDay(propSelectedDay);
        setLocalSelectedMonth(propSelectedMonth);
        setLocalSelectedYear(propSelectedYear);
    }, [propSelectedDay, propSelectedMonth, propSelectedYear]);

    return (
        <div>
            <div onClick={toggleDatePicker} className={styles['date-piker-wrapper']}>
                <div className={styles['selected-date']}>
                    {localSelectedDay.toString().padStart(2, '0')} / {(localSelectedMonth + 1).toString().padStart(2, '0')} / {localSelectedYear}
                </div>
                <div className={styles['dates-container']}>
                    <div className={styles['month']}>
                        <div onClick={year ? goToPrevYear : goToPrevMonth} className={`${styles['prev-month']} ${styles['arrowsL']}`}><Arrow activeColor={'white'} color={'white'} /></div>
                        <div onClick={() => setYear(!year)} className={styles['month-item']}>{months[localSelectedMonth]} {localSelectedYear}</div>
                        <div onClick={year ? goToNextYear : goToNextMonth} className={`${styles['next-month']} ${styles['arrowsR']}`}><Arrow activeColor={'white'} color={'white'} /></div>
                    </div>
                    {
                        !year ?
                            <Days
                                totalDays={totalDays}
                                localSelectedDay={localSelectedDay}
                                handleDayClick={handleDayClick}
                            />
                            : <>
                                <Years
                                    localSelectedYear={localSelectedYear}
                                    setLocalSelectedYear={setLocalSelectedYear}
                                    setDate={setYear}
                                />
                            </>
                    }
                </div>
            </div>
        </div>
    );
};

export default Calendar;
