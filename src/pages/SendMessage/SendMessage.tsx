import { useEffect, useState } from 'react';
import styles from './SendMessage.module.scss';
import Button from '../../UI/Button/Button';
import SelectUsers from '../../component/SelectUsers/SelectUsers';


export default function SendMessage() {
    const [text, setText] = useState('');
    const [group, setGroup] = useState('consideration');
    const [inpt, setInpt] = useState<string | undefined>('');

    useEffect(() => {
        if (group === 'consideration') setInpt(undefined);
    }, [group]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (group !== 'consideration') {
            setInpt(e.target.value);
        }
    };

    const send = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const markdownText = text.replace(/\n/g, '\n'); 
        sendData(group, group === 'consideration' ? undefined : inpt, markdownText);
        setInpt('');
        setText('');
    };
    

    const sendData = async (group: string, userName: string | undefined, message: string) => {
        const dataToSend = {
            group: group,
            userName: userName,
            message: message
        };

        console.log(dataToSend);

        try {
            const response = await fetch(`http://localhost:8001/api/send-message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update user data');
            }

            if (response.status === 200) console.log(data.message);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <form onSubmit={send} className={styles['wrap']}>
                <div className={styles['settings-bar']}>
                    <div className={styles['toggle']}>
                        <SelectUsers updateStatus={setGroup} />
                    </div>
                    <div className={styles['adress']}>
                        <div className={styles['title']}>
                            <span>Enter :</span>
                            <span>TG adress or Id</span>
                        </div>
                        <div>
                            {group !== 'consideration' ? (
                                <input
                                    placeholder='Enter data'
                                    value={inpt || ''}
                                    onChange={handleInputChange}
                                    className={styles['inpt']}
                                />
                            ) : (
                                <input
                                    placeholder='Enter data'
                                    value={''}
                                    onChange={() => {}}
                                    className={styles['inpt']}
                                    disabled 
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles['text-container']}>
                    <textarea
                        placeholder='Enter message'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className={styles['textarea']}
                    />
                </div>
                <div className={styles['btn']}>
                    <Button text={'Send'} color={'rgb(33, 96, 164)'} textColor={'black'} hoverColor={'white'} />
                </div>
            </form>
        </>
    );
}
