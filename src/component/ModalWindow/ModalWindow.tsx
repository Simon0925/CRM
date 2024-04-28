import { useEffect, useState } from 'react';
import X from '../../SVG/X/X';
import styles from './ModalWindow.module.scss';
import ModalUserData from '../ModalUserData/ModalUserData';



interface ModalWindowProps {
	closeModal: React.Dispatch<React.SetStateAction<boolean>>,
    id:number;
	tgAdress: string;
    name:string;
    profit:number;
    asking_source:string;
    asking_experience:string;
    status:string;
    note:string;
}

export default function ModalWindow({
	closeModal,
	id,tgAdress,name,profit,asking_source,asking_experience,status,note
	
}:ModalWindowProps){


	const handleClose = (bool:boolean) =>{
		closeModal(bool);

	}

	const [isHovered, setIsHovered] = useState(false);
	return <>
		<div
			
			className={styles['modal-content']}
			
		>
			<button
            onClick={() => {
				
                closeModal(false);
                }}
                onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className={styles['close-btn']}
			><X active={isHovered}/></button>
			
            <ModalUserData close={handleClose} id={id} tgAdress={tgAdress} name={name} profit={profit} asking_source={asking_source} asking_experience={asking_experience} status={status} note={note} />
		
		</div>
	</>;
	
}