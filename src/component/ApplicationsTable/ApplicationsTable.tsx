import React, { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../UI/Spinner/Spinner';
import { fetchData } from '../../store/usersData.slice';
import { RootState } from '../../store/store';

import styles from './ApplicationsTable.module.scss';

const LazyApplicationsData = lazy(() => import('../ApplicationsData/ApplicationsData'));

interface ApplicationsTableProps {
    sections: string;
    search: string;
}

export default function ApplicationsTable({ sections, search }: ApplicationsTableProps) {
    let data: any[] = [];
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    if (sections === 'applications') {
        const userData = useSelector((state: RootState) => state.data.data) || [];
        data = userData.filter((elem) => elem.accepted === false && elem.status === 'consideration');
        if (search !== '') {
            const searchData = data.filter((name) =>
                name.userName.toLowerCase().startsWith(search.trim().toLowerCase())
            );
            data = searchData;
        }
    } else if (
        sections === 'consideration' ||
        sections === 'successful' ||
        sections === 'canceled' ||
        sections === 'trash'
    ) {
        const userData = useSelector((state: RootState) => state.data.data) || [];
        data = userData.filter((elem) => elem.status === sections);
        if (search !== '') {
            const searchData = data.filter((name) =>
                name.userName.toLowerCase().startsWith(search.trim().toLowerCase())
            );
            data = searchData;
        }
    } else {
        return null;
    }

    return (
        <>
            <div className={styles['wrap']}>
                <div className={styles['title']}>
                    <span>ID</span>
                    <span>Created</span>
                    <span>Customer</span>
                    <span>TG address</span>
                    <span className={styles['center']}>Profit</span>
                    <span>Status</span>
                </div>

                <Suspense fallback={<Spinner />}>
                    {data.map((elem, index) => (
                        <div key={index}>
                            <LazyApplicationsData
                                id={elem.id}
                                created={elem.created}
                                name={elem.name}
                                userName={elem.userName}
                                profit={elem.profit}
                                accepted={elem.accepted}
                                askingExperience={elem.asking_experience}
                                status={elem.status}
                                note={elem.note}
                                asking_source={elem.asking_source}
                            />
                        </div>
                    ))}
                </Suspense>
            </div>
        </>
    );
}
