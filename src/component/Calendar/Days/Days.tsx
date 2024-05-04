import styles from './Days.module.scss';

interface DaysProps {
    totalDays:number;
    localSelectedDay:number;
    handleDayClick: (param:number) => void
}


export default function Days ({totalDays,localSelectedDay,handleDayClick}:DaysProps) {
    return(
        <>
         <div className={styles['days-container']}>
                    {Array.from({ length: totalDays }, (_, index) => index + 1).map(day => (
                        <div key={day}
                             className={styles['day']}
                              style={day === localSelectedDay ? 
                              { backgroundColor: 'rgb(48 55 69 )' } :
                               {}} onClick={() => handleDayClick(day)}>
                            {day}
                        </div>
                    ))}
                </div>
        </>
    )
}