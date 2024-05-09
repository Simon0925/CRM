import { useState } from 'react';
import SelectTarget from '../SelectTarget/SelectTarget';
import styles from './AddExpense.module.scss';

export default function AddExpense() {

    const [target,setTarget] = useState('')

    return (
       
            <div className={styles['modal-content']}>
                <form className={styles['form-container']}>
                    <h1>Add Expense</h1>
                    <div className={styles['options']}>
                        <SelectTarget updateStatus={setTarget} />
                    </div>
                </form>
            </div>
     
    );
}
