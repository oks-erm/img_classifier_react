import react from "react";
import './ImageForm.css';

const ImageForm = () => {
    return (
        <div className='ma4 mt0'>
            <p className='f3'>
                {"Detect faces in your pictures. Upload your image and we'll do the rest."}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
                </div>
            </div>
        </div>);
}

export default ImageForm;