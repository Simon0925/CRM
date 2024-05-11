import { useState } from 'react';
import SearchSvg from '../../SVG/SearchSvg/SearchSvg';
import styles from './Search.module.scss';

interface SearchProps {
    placeholder: string;
    text: (text: string) => void; 
}

export default function Search ({placeholder, text}: SearchProps) {
    const [search, setSearch] = useState('');

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            heandleSearch();
        }
    };

    const heandleSearch = () => {
        text(search);
    };

    return (
        <div className={styles['search-container']}>
            <span><SearchSvg /></span>
            <input 
                className={styles['search-inpt']} 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                onKeyDown={handleKeyDown} 
                placeholder={placeholder} 
            />
        </div>
    );
}
