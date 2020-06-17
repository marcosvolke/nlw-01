import React, { useCallback, useState } from 'react'
import {useDropzone} from 'react-dropzone'
import { FiUpload } from 'react-icons/fi';

import './styles.css';

interface Props {
    onFileUploaded: (file: File) => void; // vai ser uma função que retorna vazio
}

const  Dropzone: React.FC<Props> = (props) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState<string>('');

    const onDrop = useCallback(acceptedFiles => {
        // console.log(acceptedFiles);
        const file = acceptedFiles[0];

        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl);
        props.onFileUploaded(file);
    }, [])

    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
        accept: 'image/*'
        })

    return (
        <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} accept="image/*" />

            { selectedFileUrl
                ? <img src={selectedFileUrl} alt="Point thumbnail" />
                : (
                    <p>
                        <FiUpload />
                        Imagem do estabelecimento
                    </p>
                )
            }

            
        </div>
    )
}

export default Dropzone;