import ApplicationsData from '../ApplicationsData/ApplicationsData';

import styles from './ApplicationsTable.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../store/usersData.slice';
import { RootState } from '../../store/store';
import { useEffect, useState } from 'react';

interface ApplicationsTableProps {
    sections:string
    search:string
}

export default function ApplicationsTable ({sections,search}:ApplicationsTableProps) {

    

    let data: any[] = []

   


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);


    if (sections === 'applications') {
        const userData = useSelector((state: RootState) => state.data.data) || []; 
        data = userData.filter(elem => elem.accepted === false && elem.status === 'consideration' );
        if (search !== '') {
            const searchData = data.filter(name => name.userName.toLowerCase().startsWith(search.trim().toLowerCase()));
            data = searchData
        } 
    } else if (sections === 'consideration' || sections === 'successful' || sections === 'canceled' || sections === 'trash' ) {
        const userData = useSelector((state: RootState) => state.data.data) || []; 
        data = userData.filter(elem => elem.status === sections);
        if (search !== '') {
            const searchData = data.filter(name => name.userName.toLowerCase().startsWith(search.trim().toLowerCase()));
            data = searchData
        } 
    } else {
        return null;
    }

  

    return(
        <>
            <div className={styles['wrap']}>
                <div className={styles['title']}>
                    <span>ID</span>
                    <span>Created</span>
                    <span>Custumer</span>
                    <span>TG address</span>
                    <span className={styles['center']}>Profit</span>
                    <span>Status</span>
                </div>
                
                {  data.map((elem,index)=>(
                    <div key={index}>
                        <ApplicationsData 
                        id={elem.id} 
                        created={elem.created} 
                        name={elem.name}
                        userName={elem.userName}
                        profit={elem.profit}
                        accepted={elem.accepted} 
                        askingExperience={elem.asking_experience} 
                        status={elem.status}
                        note={elem.note}
                        asking_source={elem.asking_source}  /> 
                    </div>  
                ))}
        </div>
        </>
    )
}