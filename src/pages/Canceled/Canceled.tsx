import styles from './Canceled.module.scss';
import Search from '../../component/Search/Search';
import ApplicationsTable from '../../component/ApplicationsTable/ApplicationsTable';
import ApplicationsBtn from '../../component/ApplicationsBtn/ApplicationsBtn';
import { useState } from 'react';
import Filter from '../../component/Filter/Filter';


export default function Canceled () {

    const [search,setSearch] = useState('')

    return(
        <>
        <div className={styles['search-wrap']}>
            <Search text={setSearch} placeholder={'Enter TG address'} />
        </div>
        <div className={styles['wrap']}>
            <ApplicationsBtn />
            <Filter fillter={function (dateRange: { from: string; to: string; }): void {
                    throw new Error('Function not implemented.');
                } } />
            <ApplicationsTable sections={'canceled'} search={search} />
        </div>
        </>
    )
}