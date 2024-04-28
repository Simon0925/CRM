import { useEffect, useState } from 'react';
import SearchSvg from '../../SVG/SearchSvg/SearchSvg';
import styles from './Search.module.scss';

interface SearchProps {
    placeholder: string;
    text: (text: string) => void; 
}

export default function Search ({placeholder,text}:SearchProps) {
    const [search,setSearch] = useState('')
    
    useEffect(()=>{
        text(search)
    },[search])

    return(
        <div className={styles['search-container']}>
            <span ><SearchSvg/></span>
            <input className={styles['search-inpt']} value={search} onChange={(e) => setSearch(e.target.value) } placeholder={placeholder}/>   
        </div>
    )
}