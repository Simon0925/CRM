import styles from './Arrow.module.scss';

interface ArrowProps {
    active?: boolean;
    activeColor: string;
    color: string;
    click?: () => void; 
}

export default function Arrow({ active , color, activeColor, click }: ArrowProps) {
    return (
        <svg className={styles['btn']} onClick={click} width="25" height="25" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke={active ? activeColor : color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            </path>
        </svg>
    );
}
