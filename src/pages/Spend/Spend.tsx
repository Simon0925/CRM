import { useCallback, useEffect, useState } from 'react';
import Button from '../../UI/Button/Button';
import SpendBtn from '../../component/SpendBtn/SpendBtn';
import SpendData from '../../component/SpendData/SpendData';
import styles from './Spend.module.scss';
import {fetchExpensesData} from '../../store/expenses.slice'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../store/store";
import Filter from '../../component/Filter/Filter';
import AddExpense from '../../component/AddExpense/AddExpense';

interface Expense {
    _id: string;
    date: string;
    name: string;
    quantity: number;
    description: string; 
}

export default function Spend() {


    const dispatch = useDispatch();
    
    const fetchExpensesDataDispatch = useCallback(() => dispatch(fetchExpensesData()), [dispatch]);

    const expenses = useSelector((state: RootState) => state.expenses.expensesData);

    useEffect(() => {
        fetchExpensesDataDispatch();
    }, [fetchExpensesDataDispatch]);

    const [active, setActive] = useState('all-spends')

    const [currentData, setCurrentData] = useState<Expense[]>(expenses)

    const [fillterDate, setFillterDate] = useState({
        from:'',
        to:''
    })

    const [addExpense, setAddExpense]= useState(false);

    
    let fb: Expense[] = [];
    let tikTok: Expense[] = [];
    let other: Expense[] = [];

    expenses.forEach(elem => {
        if(elem.name === "FB") {
            fb.push(elem);
        } else if(elem.name === "Tik-Tok") {
            tikTok.push(elem);
        } else if(elem.name === "Other") {
            other.push(elem);
        }
    });

    useEffect(() => {
        if(active === "FB") {
            setCurrentData(fb);
        } else if(active === "Tik-Tok") {
            setCurrentData(tikTok);
        } else if(active === "Other") {
            setCurrentData(other);
        } else if(active === "all-spends") {
            setCurrentData(expenses);
        }
    }, [active, expenses]);



3

    let filter = () => {
        
        let filteredData = expenses;
    
        if (fillterDate.from !== '' || fillterDate.to !== '') {
            filteredData = expenses.filter(elem => {
                const fromDateParts = fillterDate.from.split('/');
                const toDateParts = fillterDate.to.split('/');
    
                const fromDate = new Date(parseInt(fromDateParts[2]), parseInt(fromDateParts[1]) - 1, parseInt(fromDateParts[0]));
                const toDate = new Date(parseInt(toDateParts[2]), parseInt(toDateParts[1]) - 1, parseInt(toDateParts[0]));
    
                const dateParts = elem.date.split('/');
                const date = new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0]));
    
                if (fillterDate.from && !fillterDate.to) {  
                    return date >= fromDate;
                } else if (!fillterDate.from && fillterDate.to) {
                    return date <= toDate;
                } else {
                    return date >= fromDate && date <= toDate;
                }
            });
            
        }

       return filteredData
       
        
    }
    
    useEffect(() => {
        let filteredData = filter();

        let fb: Expense[] = [];
        let tikTok: Expense[] = [];
        let other: Expense[] = [];


        filteredData.forEach(elem => {
            if(elem.name === "FB") {
                fb.push(elem);
            } else if(elem.name === "Tik-Tok") {
                tikTok.push(elem);
            } else if(elem.name === "Other") {
                other.push(elem);
            }
        });

        if(active === "FB") {
            setCurrentData(fb);
        } else if(active === "Tik-Tok") {
            setCurrentData(tikTok);
        } else if(active === "Other") {
            setCurrentData(other);
        } else if(active === "all-spends") {
            setCurrentData(filteredData);
        }

    }, [fillterDate]);
    

    return( 
        <div className={styles.wrap}>
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
            
            {currentData.map((elem,index)=>(
                            <div key={index}>
                            <SpendData id={elem._id} created={elem.date} target={elem.name} amount={elem.quantity} description={elem.description} />
                            </div>
                    ))}  

            {addExpense ? <AddExpense closeModal={setAddExpense} /> : null}
        </div>
    )
}