import { useEffect, useState } from 'react';
import styles from './SpendDataModal.module.scss';
import X from '../../SVG/X/X';
import Button from '../../UI/Button/Button';
import SelectTarget from '../SelectTarget/SelectTarget';

import {edit} from './edit'

interface SpendDataModalProps {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>,
    targetValue:string,
    amountValue:number,
    noteValue:string,
    id:string
}


export default function SpendDataModal ({closeModal,targetValue,amountValue,noteValue,id}:SpendDataModalProps) {

    const [target,setTarget] = useState(targetValue)

    const [amount, setAmount] = useState(amountValue)

    const [isHovered, setIsHovered] = useState(false);

    const [note, setNote] = useState(noteValue)

    const [data, setData] = useState({
        name:'',
        quantity:0,
        description:'',
        token:'',
        id:''
    })

    const token = localStorage.getItem('accessToken') || '';

    useEffect(() => {
        setData({
            name: target,
            quantity: Number(amount),
            description: note,
            token: token,
            id:id
        });
    }, [target, amount, isHovered, note, token]);


    const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (note === '' || amount === 0) return null; 
         edit(data)

         closeModal(false);

         window.location.reload();
    };
    return(
        <>
            <div className={styles['wrap']}>
                <form onSubmit={handleSend} className={styles['form-container']}>
                    <div className={styles['title']}>
                        <h2>Edit Expense</h2> 
                        <button
                            onClick={() => {
                                
                                closeModal(false);
                                }}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className={styles['close-btn']}
                            ><X active={isHovered}/></button>
                    </div>
                    <div className={styles['options']}>
                        <SelectTarget data={targetValue} updateStatus={setTarget} />
                        <div className={styles['inpt']} >
                            <div className={styles['title']}>
                                <span>Enter:</span>
                                <span>Amount</span>
                            </div>
                            <input  value={amount} placeholder='0$' onChange={(e)=> setAmount(Number(e.target.value))} />
                        </div>
                    </div>
                    <div className={styles['note']}>
                        <h3>Note</h3>
                        <textarea value={note} placeholder='Enter description' onChange={(e) => setNote(e.target.value) } />
                    </div>
                    <Button text={'Send'} color={'rgb(33, 96, 164)'} textColor={'white'} hoverColor={'#707290'} />

                </ form>
            </div>
        </>
    )
}