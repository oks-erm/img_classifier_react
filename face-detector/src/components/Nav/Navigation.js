import react from "react";

const Navigation = ({ onRouteChange, isSignedIn, user }) => {
    if (isSignedIn) {
        return (
            <nav className="fixed top-0 w-100 z-1" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('profile', user.id)} className='f3 link dim black underline pa3 pointer'>(ᵔᵕᵔ){user.name}</p>
                <p onClick={() => onRouteChange('signout')} className='f3 link dim black underline pa3 pointer'>Sign Out</p>
            </nav>
        )
    } else {
        return (
            <nav className="fixed top-0 w-100 z-1" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim black underline pa3 pointer'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f3 link dim black underline pa3 pointer'>Register</p>
            </nav>)
    }
}


export default Navigation;