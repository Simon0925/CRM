import React, { useCallback, useEffect, useMemo, useState } from 'react';
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

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (group !== 'consideration') {
            setInpt(e.target.value);
        }
    }, [group]);

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    }, []);

    const handleButtonClick = useCallback(() => {
        const fileInput = document.getElementById('file-input');
        fileInput && fileInput.click();
    }, []);

    const formData = useMemo(() => {
        const formData = new FormData();
        formData.append('group', group);
        if (inpt !== undefined) {
            formData.append('userName', inpt);
        }
        formData.append('title', title);
        formData.append('message', text.replace(/\n/g, '\n'));
        if (selectedFile) {
            formData.append('photo', selectedFile);
        }
        return formData;
    }, [group, inpt, title, text, selectedFile]);

    const send = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendData(formData);
        setInpt('');
        setTitle('');
        setText('');
    }, [formData]);

    const sendData = async (formData: FormData) => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            const response = await fetch(`${host}/api/send-message?accessToken=${accessToken}`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Failed to update user data');
            }
            const responseData = await response.text();
            console.log(responseData);
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
