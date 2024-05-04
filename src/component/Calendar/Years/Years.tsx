import styles from './Years.module.scss';

interface YearsProps {
    localSelectedYear: number;
    setLocalSelectedYear: (year: number) => void;
    setDate: (param: boolean) => void;
}

export default function Years({ localSelectedYear, setLocalSelectedYear, setDate }: YearsProps) {
    return (
        <>
            <div className={`${styles['years-container']} ${styles['centered']}`}>
                {Array.from({ length: 25 }, (_, index) => (
                    <div
                        key={localSelectedYear - 10 + index}
                        className={styles['year']}
                        onClick={() => {
                            setLocalSelectedYear(localSelectedYear - 10 + index);
                            setDate(false);
                        }}
                    >
                        {localSelectedYear - 10 + index}
                    </div>
                ))}
            </div>
        </>
    );
}
