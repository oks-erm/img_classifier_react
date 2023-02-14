import react from "react";


const Logo = ({ route }) => {
    return (
        <div>
            { route !== 'home'
                ? <div className="mt4">
                    <div>
                        <h1 className='center f1 white'>&#123;'&#95;'&#125;</h1>
                    </div>
                    <div>
                        <h1 className='center f2 white'>{"[ face detector ]"}</h1>
                    </div>
                </div>
                : <div className="mt7">
                    <div>
                        <h1 className='center f1 white'>&#123;'&#95;'&#125;</h1>
                    </div>
                    <div>
                        <h1 className='center f2 white'>{"[ face detector ]"}</h1>
                    </div>
                </div>
            }
        </div>
    );
};


export default Logo;