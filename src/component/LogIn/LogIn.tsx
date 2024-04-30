import { useEffect, useState } from 'react';
import Button from '../../UI/Button/Button';
import styles from './LogIn.module.scss';
import { useDispatch } from 'react-redux';
import { login } from '../../store/auth.slice';



export default function LogIn () {

    const dispatch = useDispatch();

    const [logIn,setLogIn] = useState('')

    const [password,setPassword] = useState('')

    let dataToSend = {}

    useEffect(()=>{
        dataToSend = {
            userName:logIn,
            password:password
        }
    },[logIn,password])

    const send = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       
        try {
            const response = await fetch(`http://localhost:8001/api/auth`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend)
            });
    
            const responseData = await response.json();
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}, Message: ${responseData.error || 'Failed to update user data'}`);
            }

            if (response.status === 200) localStorage.setItem('accessToken', responseData.accessToken);

            dispatch(login({login:true, id:responseData.id}));

        } catch (error) {
            console.log(error);
        }
    }
    

    


    return(
        <>
        <form onSubmit={send} className={styles['wrap']}>

            <div className={styles['container']}>
                <span className={styles['title']}> CRM Farhat</span>
                <div className={styles['inpt']}>
                    <input type='text' value={logIn} onChange={(e) => setLogIn(e.target.value) } placeholder='Enter user name'/>
                    <input type='password' value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder='Enter password' />
                </div>
                <div className={styles['btn']}>
                    <Button gradient={'linear-gradient(to right, #434343 0%, black 100%)'} text={'Log In'} color={''} textColor={'#424242'} hoverColor={'white'} />
                </div>
            </div>           
        </form>
        </>
    )
}