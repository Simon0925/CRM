import ApplicationsData from "../ApplicationsData/ApplicationsData";
import styles from "./ApplicationsTableTest.module.scss";
import { applicationService } from '../../service/applicationService';
import { useEffect, useState, useMemo } from "react";

interface Application {
    id: number;
    created: string;
    name: string;
    userName: string;
    profit: number;
    accepted: boolean;
    asking_experience: string;
    status: string;
    note: string;
    asking_source: string;
}

interface ApplicationsTableProps {
    sections: string;
    search: string;
    page: number;
    pages: (currentPage: number) => void;
    filter:[];
}

export default function ApplicationsTableTest({ sections, search, page, pages,filter }: ApplicationsTableProps) {
    const [allData, setAllData] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(()=>{
        console.log("search:",search)
    },[search])

    useEffect(()=>{
        console.log("filter:",filter)
    },[filter])


    const fetchData = useMemo(() => async () => {
        try {
            const data = await applicationService(currentPage, sections,search);
            setAllData(data.data);
            pages(data.pages);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching application data:", error);
            setLoading(false);
        }
    }, [currentPage, sections, pages,search]);

    useEffect(() => {
        setCurrentPage(page);
    }, [page]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

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
                <div className={styles['applications-data']}>
                    {allData.map((elem, index) => (
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
                                asking_source={elem.asking_source}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
