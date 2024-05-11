import { useEffect, useState } from 'react';
import Button from '../../UI/Button/Button';
import SelectDate from '../SelectDate/SelectDate';
import styles from './Filter.module.scss';
import SelectTimeRange from '../SelectTimeRange/SelectTimeRange';



interface FilterProps {
    fillter: (dateRange: { from: string; to: string }) => void;
}

export default function Filter ({fillter}:FilterProps) {

    const [date, setDate] = useState<{ from: string; to: string }>({ from: '', to: '' });

    const data = () => {
        fillter(date);
        setDate(prevDate => ({ ...prevDate }));
    }

    return(
        <>
            <div className={styles['wrap']}>
                <SelectDate setDate={setDate} />
                <SelectTimeRange setDate={setDate}  />
                <Button click={data} text={'Show'} color={'rgb(48, 50, 55)'} textColor={'rgb(112, 114, 144)'} hoverColor={'rgb(112, 114, 144)'} />
            </div>
        </>
    )
}