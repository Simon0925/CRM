import React, { useEffect, useState } from 'react';
import styles from './Spam.module.scss';
import Button from '../../UI/Button/Button';
import SelectUsers from '../../component/SelectUsers/SelectUsers';

export default function Spam() {
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

    const send = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const markdownText = text.replace(/\n/g, '\n');
        await sendData( markdownText, selectedFile);
        setInpt('');
        setText('');
        setTitle('');
        setSelectedFile(null);

    };

    const bytesToBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                const base64String = reader.result as string;
                const base64Data = base64String.split(',')[1];
                resolve(base64Data);
            };
            reader.onerror = (error) => reject(error);
        });
    };

    const sendData = async ( message: string, selectedFile: File | null) => {
    try {
        const formData = new FormData();
        formData.append('message', message);
        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        const response = await fetch(`http://localhost:8001/api/photo`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to update user data');
        }

        if (response.status === 200) console.log(data.message);
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
