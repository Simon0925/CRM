import { useEffect, useState } from 'react';
import SelectTarget from '../SelectTarget/SelectTarget';
import styles from './AddExpense.module.scss';
import Button from '../../UI/Button/Button';
import X from '../../SVG/X/X';

import {send} from './send'

interface AddExpenseProps {
	closeModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AddExpense({closeModal}:AddExpenseProps) {

    let date = new Date();

    let day: number = parseInt(date.getDate() < 10 ? "0" + date.getDate() : date.getDate().toString(), 10);
    let month: number = parseInt(date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1).toString(), 10);
    let year = date.getFullYear(); 


    const [target,setTarget] = useState('FB')

    const [amount, setAmount] = useState("")

    const [isHovered, setIsHovered] = useState(false);

    const [note, setNote] = useState('')

    const [data, setData] = useState({
        name:'',
        quantity:0,
        date:'',
        description:'',
        token:''
    })

    const token = localStorage.getItem('accessToken') || '';

    useEffect(() => {
        setData({
            name: target,
            quantity: Number(amount),
            date: `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`,
            description: note,
            token: token
        });
    }, [target, amount, isHovered, note, token]);



    const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if (note === '' || amount === '') return null; 
       
        await send(data);
        setAmount("");
        setNote("");
      
        
    };

   

    return (
       
            <div className={styles['modal-content']}>
                <form onSubmit={handleSend} className={styles['form-container']}>
                    <div className={styles['title']}>
                        <h2>Add Expense</h2> 
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
                        <SelectTarget updateStatus={setTarget} />
                        <div className={styles['inpt']} >
                            <div className={styles['title']}>
                                <span>Enter:</span>
                                <span>Amount</span>
                            </div>
                            <input  value={amount} placeholder='0$' onChange={(e)=> setAmount(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles['note']}>
                        <h3>Note</h3>
                        <textarea value={note} placeholder='Enter description' onChange={(e) => setNote(e.target.value) } />
                    </div>
                    <Button text={'Send'} color={'rgb(33, 96, 164)'} textColor={'white'} hoverColor={'#707290'} />
                </form>
            </div>
     
    );
}
