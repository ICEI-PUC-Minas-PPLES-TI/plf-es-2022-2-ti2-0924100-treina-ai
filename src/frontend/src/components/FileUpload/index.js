import React, {useRef} from 'react'

const FileUploader = ({onFileSelect, register}) => {
    const fileInput = useRef(null)

    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];
      };

    return (
        <div className="file-uploader">
            <input type="file" onChange={handleFileInput} {...register("tipo")}/>
        </div>
    )
}

export default FileUploader;