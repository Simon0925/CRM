import Button from '../../UI/Button/Button';
import Navigation from '../../component/Navigation/Navigation';
import styles from './LeftBar.module.scss';

import { useDispatch } from 'react-redux';
import { login } from '../../store/auth.slice';

export default function LeftBar() {

    const dispatch = useDispatch();

    function signOut () {
        localStorage.removeItem('accessToken')
        dispatch(login({login:false, id:''}));
    }


    return (
        <div className={styles['wrap-left-bar']}>
            <div className={styles['logo-wrap']}>
               <span className={styles['logo']} >CRM Farhat</span> 
            </div>
            <Navigation/>
            <div className={styles['btn-wrap']}>
                <div className={styles['btn']}>
                     <Button click={signOut} text={'Log Out'} color={'#2F3237'} textColor={'#9092b2'} hoverColor={'white'} />
                </div>
            </div>
        </div>
    );
}
