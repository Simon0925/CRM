import Applications from '../../pages/Applications/Applications';
import Canceled from '../../pages/Canceled/Canceled';
import Consideration from '../../pages/Consideration/Consideration';
import ErrorP from '../../pages/Error/Error';
import SendMessage from '../../pages/SendMessage/SendMessage';
import Spam from '../../pages/Spam/Spam';
import Statistics from '../../pages/Statistics/Statistics';
import Successful from '../../pages/Successful/Successful';
import Trash from '../../pages/Trash/Trash';
import styles from './Main.module.scss';
import { Route, Routes } from 'react-router-dom'

export default function Main() {
    return (
        <div className={styles['wrap-main']}>
           <Routes>
                <Route index element={<Applications/>} />
                <Route path='/canceled' element={<Canceled />} />       
                <Route path='/consideration' element={<Consideration />} />   
                <Route path='/successful' element={<Successful />} />
                <Route path='/statistics' element={<Statistics />} />
                <Route path='/trash' element={<Trash />} />
                <Route path='/send-message' element={<SendMessage />} />
                <Route path='/spam' element={<Spam />} />
                <Route path="*" element={<ErrorP />} /> 
            </Routes>
        </div>
    );
}
