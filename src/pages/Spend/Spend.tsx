import { useEffect, useState } from 'react';
import Button from '../../UI/Button/Button';
import SpendBtn from '../../component/SpendBtn/SpendBtn';
import SpendData from '../../component/SpendData/SpendData';
import styles from './Spend.module.scss';
import Filter from '../../component/Filter/Filter';
import AddExpense from '../../component/AddExpense/AddExpense';
import {expensesService} from '../../service/expensesService'
import PageBtns from '../../component/PageBtns/PageBtns';
import Spinner from '../../UI/Spinner/Spinner';

export interface Expense {
    _id: string;
    date: string;
    name: string;
    quantity: number;
    description: string; 
}

export default function Spend() {

    const [expenses, setExpenses] = useState<Expense[]>([])

    const [currentPage,setCurrentPage] = useState(1)

    const [pages,setPages] = useState(1)

    const [loading, setLoading] = useState(true);

    const [active, setActive] = useState('all-spends')

    const [fillterDate, setFillterDate] = useState({
        from:'',
        to:''
    })

    const getData =  async () =>{
        const data = await expensesService(currentPage,active,fillterDate)
        setPages(data.pages)
        setLoading(false)
        setExpenses(data.data)
    }

    

    useEffect(()=>{
        getData()
    },[fillterDate,active,currentPage])


    const [addExpense, setAddExpense]= useState(false);

    return( 
        <div className={styles.wrap}>
            <div className={styles['wrap-container']} >
                <div className={styles['container']}>
                    <SpendBtn activBtn={setActive} />
                    <Filter fillter={setFillterDate} />
                    <div className={styles['data-wrap']}>
                            <div className={styles.title}>
                                <span>ID</span>
                                <span>Created</span>
                                <span>Target</span>
                                <span className={styles.center}>Amount</span>
                                <Button click={() => setAddExpense(!addExpense)} gradient={'linear-gradient(to right, #637AF4, #2F3EC8, #637AF4)'} text={'add expense'} color={'rgb(48, 50, 55)'} textColor={'white'} hoverColor={'white'}  />
                            </div>
                    
                    </div>
                </div>
                
                {!loading ? expenses.map((elem,index)=>(
                                <div key={index}>
                                <SpendData id={elem._id} created={elem.date} target={elem.name} amount={elem.quantity} description={elem.description} />
                                </div>
                        )): <Spinner /> }

            </div>
            
            <div className={styles["pages-btn"]}>
                <PageBtns number={setCurrentPage} totalPages={pages}  />
            </div>

            {addExpense ? <AddExpense closeModal={setAddExpense} /> : null}
        </div>
    )
}