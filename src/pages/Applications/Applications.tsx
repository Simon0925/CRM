import {  useState } from 'react';
import ApplicationsBtn from '../../component/ApplicationsBtn/ApplicationsBtn';
import ApplicationsTable from '../../component/ApplicationsTable/ApplicationsTable';
import Search from '../../component/Search/Search';
import styles from './Applications.module.scss';


export default function Applications () {

    const [search,setSearch] = useState('')

    return(
        <>
        <div className={styles['search-wrap']}>
            <Search text={setSearch} placeholder={'Enter TG address'} />
        </div>
        <div className={styles['wrap']}>
            <ApplicationsBtn />
            <ApplicationsTable sections={'applications'} search={search} />
        </div>
        </>
    )
}