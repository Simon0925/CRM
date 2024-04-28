import { useState } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
    text: string;
    color: string | false;
    gradient?: string | false;
    textColor: string; 
    hoverColor: string;
    click?: () => void; 
}
export default function Button({ text, color, gradient, textColor, hoverColor, click }: ButtonProps) {
    const [isHovered, setIsHovered] = useState(false);

    const backgroundStyle = gradient ? { backgroundImage: gradient } : {};
    const backgroundColor = color ? { backgroundColor: color } : {};
    const hover = !isHovered ? textColor : hoverColor;

    return (
        <button
            onClick={click} 
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ ...backgroundColor, ...backgroundStyle, color: hover }}
            className={styles['btn']}
        >
            {text}
        </button>
    );
}

