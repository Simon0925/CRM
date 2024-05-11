
import { useEffect, useState } from 'react';
import ApplicationsBtn from '../../component/ApplicationsBtn/ApplicationsBtn';
import Search from '../../component/Search/Search';
import styles from './TestPage.module.scss';
import Filter from '../../component/Filter/Filter';
import ApplicationsTable from '../../component/ApplicationsTable/ApplicationsTable';
import ApplicationsTableTest from '../../component/ApplicationsTableTest/ApplicationsTableTest';
import PageBtns from '../../component/PageBtns/PageBtns';



export default  function TestPage () {
    const [search,setSearch] = useState('')
    const [currentPage,setCurrentPage] = useState(1)

    const [allPages,setAllPages] = useState(1)

    const [fillterDate, setFillterDate] = useState({
        from:'',
        to:''
    })

    return(
        <>
        <div className={styles['search-wrap']}>
            <Search text={setSearch} placeholder={'Enter TG address'} />
        </div>
        <div className={styles['wrap']}>
            <div>
                <ApplicationsBtn />
                <Filter fillter={setFillterDate} />
                <ApplicationsTableTest pages={setAllPages} page={currentPage} sections={'applications'} search={search}/>
            </div>
            <div className={styles['page-btns']}>
                <PageBtns number={setCurrentPage} totalPages={allPages}  />
            </div>
        </div>
        
        </> 
    )
}