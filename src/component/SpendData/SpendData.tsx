import { useState } from 'react';
import Button from '../../UI/Button/Button';
import styles from './SpendData.module.scss';
import SpendDataModal from '../SpendDataModal/SpendDataModal';

interface SpendDataProps {
    id: string;
    created: string;
    target: string;
    amount: number;
    description:string
}

export default function SpendData({ id, created, target, amount,description }: SpendDataProps) {
    const [isCopied, setIsCopied] = useState(false);

    const [active, isActive] = useState (false)

    const shortenedId = id.substring(0, 12);

    const copyIdToClipboard = () => {
        navigator.clipboard.writeText(id);
        setIsCopied(true);

        
        setTimeout(() => {
            setIsCopied(false);
        }, 1500);
    };


    const copyStatus = isCopied ? 'Copied' : '';

    return (
        <div className={styles.wrap}>
            <div className={styles.idContainer} onClick={copyIdToClipboard}>
                <span>{shortenedId}...</span>
                <span className={styles.copyStatus}> {copyStatus}</span>
            </div>
            <span>{created}</span>
            <span>{target}</span>
            <span className={styles.center}>{amount}</span>
            <Button click={()=>isActive(!active)} gradient={false} text={'open'} color={'rgb(48, 50, 55)'} textColor={'#707290'} hoverColor={"white"}  />

            {active ? <SpendDataModal closeModal={isActive} targetValue={target} amountValue={amount} noteValue={description} id={id} /> : null}
        </div>
    );
}
