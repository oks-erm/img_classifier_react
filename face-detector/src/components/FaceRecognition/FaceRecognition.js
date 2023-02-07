import react from "react";

const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className='center ma mb-2'>

                <img alt='' src={imageUrl} width='500px' height='auto' />

        </div>
    );
}

export default FaceRecognition;