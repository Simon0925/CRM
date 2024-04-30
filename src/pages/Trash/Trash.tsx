import styles from './Trash.module.scss';
import Search from '../../component/Search/Search';
import ApplicationsTable from '../../component/ApplicationsTable/ApplicationsTable';
import ApplicationsBtn from '../../component/ApplicationsBtn/ApplicationsBtn';
import { useState } from 'react';


export default function Trash () {

    const [search,setSearch] = useState('')

    return(
        <>
        <div className={styles['search-wrap']}>
            <Search text={setSearch} placeholder={'Enter TG address'} />
        </div>
        <div className={styles['wrap']}>
            <ApplicationsBtn />
            <ApplicationsTable sections={'trash'} search={search} />
        </div>
        </>
    )
}