import styles from './ModalUserData.module.scss';

import userPhoto from '../../img/user.png'
import ApplicationToggle from '../ApplicationToggle/ApplicationToggle';
import Button from '../../UI/Button/Button';
import { useEffect, useState } from 'react';
import { useDispatch} from 'react-redux';
import { editUserData } from '../../store/usersData.slice';

interface ModalUserDataProps{
    id:number;
    tgAdress:string;
    name:string;
    profit:number;
    asking_source:string;
    asking_experience:string;
    status:string;
    note:string;
    close:(bool:boolean) => void;
}


export default function ModalUserData (
    {id,tgAdress,name,profit,asking_source,asking_experience,status,note,close}:ModalUserDataProps
){
    
    const dispatch = useDispatch();

    const [textarea,setTextarea] = useState(note)

    const [newStatus, setNewStatus] = useState(status);

    const [profitData,setProfitData] = useState(profit)

    const [dataToSend, setDataToSend] = useState({
        id: id,
        note: textarea,
        profit: profitData,
        status: newStatus,
    })

    useEffect(() => {
        setDataToSend(prevData => ({
            ...prevData,
            note: textarea,
            profit: profitData,
            status: newStatus
        }));
    }, [textarea, newStatus, profitData]);

    const handleStatusUpdate = (status: string) => {
        setNewStatus(status)
    }

    const sendData = () => {
        console.log(dataToSend);
        dispatch(editUserData({ id:dataToSend.id, note: dataToSend.note, profit: dataToSend.profit, status: dataToSend.status }));
        close(false)
    };

    return(
        <>
            <div className={styles['wrap']}>
                <div className={styles['container']}>
                    <div className={styles['profile']}>
                        <div className={styles['profile-img']} >
                            <img src={userPhoto} alt='profile photo' />
                        </div>
                        <div className={styles['profile-data']} >
                            <div className={styles['data']}>
                                <span>id: </span>
                                <span>{id}</span>
                            </div>
                            <div className={styles['data']}>
                                <span>TG address: </span>
                                <span>@{tgAdress}</span>
                            </div>
                            <div className={styles['data']}>
                                <span>Name: </span>
                                <span>{name}</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles['toggle']}>
                        <ApplicationToggle updateStatus={handleStatusUpdate} status={status} />
                        <div className={styles['profit-wrap']}>
                            <span>Profit:</span> <input onChange={(e)=> setProfitData(Number(e.target.value)) } placeholder={'$ '+profit} className={styles['inpt']} />
                        </div>
                    </div>

                    <div className={styles['answers']}>
                        <div className={styles['answer']}>
                            <span>Откуда Вы узнали о нас?</span>
                            <span>{asking_source}</span>
                        </div>

                        <div className={styles['answer']}>
                            <span>У вас есть опыт работы в такой 🦣 сфере?</span>
                            <span>{asking_experience}</span>
                        </div>
                    </div>
                </div>
                <div className={styles['notes-wrap']}>

                    <span className={styles['title']}>Note</span>

                    <textarea value={textarea} onChange={(e) => setTextarea(e.target.value)} />

                    <div className={styles['btn']}>
                        <Button click={sendData} hoverColor={'white'}text={'Save'} gradient={'linear-gradient(to right, #8e2de2, #4a00e0)'} color={false} textColor={'white'}  />
                    </div>
                        
                </div>
                
            </div>
        </>
    )
}