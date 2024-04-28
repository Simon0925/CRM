import { useEffect, useState } from 'react';
import styles from './ApplicationsData.module.scss';
import StatusToggle from '../StatusToggle/StatusToggle';
import Button from '../../UI/Button/Button';
import ModalWindow from '../ModalWindow/ModalWindow';


import { useDispatch} from 'react-redux';
import { accept } from '../../store/usersData.slice';





interface ApplicationsDataProps {
        id:number;
        created:string;
        name:string;
        userName:string;
        profit:number;
        accepted:boolean;
        askingExperience:string;
        status:string;
        note:string;
        asking_source:string;
}   


export default function ApplicationsData(
    {
        id,created,
        name,userName,profit,
        accepted,askingExperience,
        status,note,asking_source
    }:ApplicationsDataProps) {


    const dispatch = useDispatch();
   
    const [openModals, setOpenModals] = useState(false);

    const [newStatus, setNewStatus] = useState(accepted);


    const handleStatusUpdate = (status: boolean) => {
        setNewStatus(status);
        dispatch(accept({ accepted: status, id: id }));
    };
    
    return (
        <>
            
                <div  className={styles['title']}>
                    <span>{id}</span>
                    <span>{created}</span>
                    <span>{name}</span>
                    <span>@{userName}</span>
                    <span className={styles['center']}>$ {profit}</span>
                    <StatusToggle status={newStatus} updateStatus={handleStatusUpdate} />
                    <span
                        onClick={() => setOpenModals(!openModals)}
                        className={styles['center']}
                    >
                        <Button gradient={false} text={'open'} color={'rgb(48, 50, 55)'} textColor={'#707290'} hoverColor={"white"}  />
                    </span>
                    {openModals && (
                        <ModalWindow asking_experience={askingExperience} status={status} note={note} tgAdress={userName} closeModal={() => setOpenModals(!openModals)} id={id} name={name} profit={profit} asking_source={asking_source} />
                    )}
                </div>
           
        </>
    );
}
