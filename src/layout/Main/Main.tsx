import Applications from '../../pages/Applications/Applications';
import Canceled from '../../pages/Canceled/Canceled';
import Consideration from '../../pages/Consideration/Consideration';
import ErrorP from '../../pages/Error/Error';
import Statistics from '../../pages/Statistics/Statistics';
import Successful from '../../pages/Successful/Successful';
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
                <Route path="*" element={<ErrorP />} /> 
            </Routes>
        </div>
    );
}
