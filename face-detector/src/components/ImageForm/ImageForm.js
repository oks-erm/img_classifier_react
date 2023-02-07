import react from "react";
import './ImageForm.css';

const ImageForm = ({ onInputChange, onSubmit }) => {
    return (
        <div className='ma4 mt0'>
            <p className='f3'>
                {"Detect faces in your pictures. Upload your image and we'll do the rest."}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='tex' onChange={onInputChange}/>
                    <button 
                        className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' 
                        onClick={onSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>);
}

export default ImageForm;