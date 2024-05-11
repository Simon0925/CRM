import { useEffect, useState } from 'react';
import Arrow from '../../SVG/Arrow/Arrow';
import styles from './PageBtns.module.scss';

interface PageBtnsProps {
    totalPages: number;
    number: (currentPage: number) => void;
}

export default function PageBtns({ totalPages, number }: PageBtnsProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const maxVisiblePages = 6;

    const handlePrevClick = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
            number(activeIndex);
        }
    };

    const handleNextClick = () => {
        if (activeIndex < totalPages - 1) {
            setActiveIndex(activeIndex + 1);
            number(activeIndex + 2);
        }
    };

    const handlePageClick = (index: number) => {
        setActiveIndex(index);
        number(index + 1);
    };

    useEffect(() => {
        number(activeIndex + 1);
    }, [activeIndex]);

    const renderPages = () => {
        const startIndex = Math.max(0, Math.min(activeIndex - Math.floor(maxVisiblePages / 2), totalPages - maxVisiblePages));
        const endIndex = Math.min(totalPages, startIndex + maxVisiblePages);
        const visiblePages = Array.from({ length: endIndex - startIndex }, (_, i) => startIndex + i);

        const pagesToRender = visiblePages.map((pageIndex, index) => (
            <div
                className={pageIndex === activeIndex ? styles['active'] : styles['page']}
                key={pageIndex}
                onClick={() => handlePageClick(pageIndex)}
            >
                {pageIndex + 1}
            </div>
        ));

        if (startIndex > 0) {
            pagesToRender.unshift(
                <div className={styles['points']} key={`ellipsis-start-${startIndex}`}>
                    <span className={styles['point']}></span>
                    <span className={styles['point']}></span>
                    <span className={styles['point']}></span>
                </div>
            );
        }

        if (endIndex < totalPages) {
            pagesToRender.push(
                <div className={styles['points']} key={`ellipsis-end-${endIndex}`}>
                    <span className={styles['point']}></span>
                    <span className={styles['point']}></span>
                    <span className={styles['point']}></span>
                </div>
            );
        }

        return pagesToRender;
    };

    return (
        <div className={styles['wrap']}>
            <div className={styles['prev-btn']} onClick={handlePrevClick}>
                <Arrow activeColor={''} color={'rgb(144 146 178)'} />
            </div>
            <div className={styles['pages-btns']}>
                {renderPages()}
            </div>
            <div className={styles['next-btn']} onClick={handleNextClick}>
                <Arrow activeColor={''} color={'rgb(144 146 178)'} />
            </div>
        </div>
    );
}
