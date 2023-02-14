import react from "react";


const Metric = ({boxes, imageUrl}) => {
    return (
        <div>
            { imageUrl === ''
            ? <div></div>
            : boxes.length === 1 
            ? <div className="white f3 mt2" id='result'>
                1 face detected
            </div>
            : boxes.length > 1 
            ? <div className="white f3 mt2" id='result'>
                {boxes.length} faces detected
            </div>
            : <div className="white f3 mt2" id='result'>
                No faces detected
            </div>
        }
        </div>
    );
}

export default Metric;