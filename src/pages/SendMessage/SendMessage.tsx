import React, { useEffect, useState } from 'react';
import styles from './SendMessage.module.scss';
import Button from '../../UI/Button/Button';
import SelectUsers from '../../component/SelectUsers/SelectUsers';


import {host} from "../../config/config"

export default function SendMessage() {
    const [text, setText] = useState('');
    const [title, setTitle] = useState('');
    const [group, setGroup] = useState('consideration');
    const [inpt, setInpt] = useState<string | undefined>('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (group === 'consideration') setInpt(undefined);
    }, [group]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (group !== 'consideration') {
            setInpt(e.target.value);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleButtonClick = () => {
        const fileInput = document.getElementById('file-input');
        fileInput && fileInput.click();
    };

    const send = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const markdownText = text.replace(/\n/g, '\n');
        sendData(group, group === 'consideration' ? undefined : inpt, title, markdownText, selectedFile);
        setInpt('');
        setTitle('')
        setText('');
    };
    


    const sendData = async (group: string, userName: string | undefined, title: string, message: string, selectedFile: File | null) => {
        const formData = new FormData();

        formData.append('group', group);

        if (userName !== undefined) {
            formData.append('userName', userName);
        }


        formData.append('title', title);
        formData.append('message', message);
    
        if (selectedFile) {
            formData.append('photo', selectedFile);
        }
    
        try {
            const response = await fetch(`${host}/api/send-message`, {
                method: 'POST',
                body: formData,
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Failed to update user data');
            }
    
            console.log(data.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={send} className={styles.wrap}>
            <div className={styles['settings-bar']}>
                <div className={styles.toggle}>
                    <SelectUsers updateStatus={setGroup} />
                </div>
                <div className={styles.adress}>
                    <div className={styles.title}>
                        <span>Enter :</span>
                        <span>TG adress or Id</span>
                    </div>
                    <div>
                        {group !== 'consideration' ? (
                            <input
                                placeholder='Enter data'
                                value={inpt || ''}
                                onChange={handleInputChange}
                                className={styles.inpt}
                            />
                        ) : (
                            <input
                                placeholder='Enter data'
                                value={''}
                                onChange={() => {}}
                                className={styles.inpt}
                                disabled
                            />
                        )}
                    </div>
                </div>
                <div className={styles.file}>
                    <div className={styles.title}>
                        <span>Choose :</span>
                        <span>Image</span>
                    </div>
                    <div className={styles['file-input']}>
                        <input type='file' id='file-input' onChange={handleFileChange} style={{ display: 'none' }} />
                        <button type='button' onClick={handleButtonClick} className={styles['file-button']}>
                            Choose
                        </button>
                    </div>
                </div>
                <div className={styles['selected-file']}>
                    {selectedFile ? (
                        <img className={styles['img']} src={URL.createObjectURL(selectedFile)} alt='Selected Image' />
                    ) : (
                        'No file chosen'
                    )}
                </div>
            </div>
            <div className={styles['title-container']}>
                <textarea
                    placeholder='Enter title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.textarea}
                />
            </div>
            <div className={styles['text-container']}>
                <textarea
                    placeholder='Enter message'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className={styles.textarea}
                />
            </div>
            <div className={styles.btn}>
                <Button text={'Send'} color={'rgb(33, 96, 164)'} textColor={'black'} hoverColor={'white'} />
            </div>
        </form>
    );
}
