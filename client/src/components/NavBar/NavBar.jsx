import { Link, useLocation } from 'react-router-dom';
import './NavBar.css'

const NavBar = () => {
    const currentPage = useLocation().pathname;

    return (
        <header className="navbar">
            <div className="navbar-text">
                <div className='title-subtitle'>
                    {/* <h1 className="navbar-title">Colosseum</h1> */}
                    <img className='logo' src='./COLOSSEUM.png'></img>
                    <div className='sub-title'>
                        <Link
                            to="/league/join"
                            className={currentPage === '/league/join' ? 'nav-link active' : 'nav-link'}
                        >
                            <h3 className='league-link-text'>View Leagues</h3>
                        </Link>
                        <Link
                            to="/league/create"
                            className={currentPage === '/league/create' ? 'nav-link active' : 'nav-link'}
                        >
                            <h3 className='league-link-text'>Create League</h3>
                        </Link>
                    </div>
                </div>

                <div className='login-signUp-link'>
                    <Link
                        to="/login"
                        className={currentPage === '/login' ? 'nav-link active' : 'nav-link'}
                    >
                        <h3 className='login-signUp-link-text'>Login</h3>
                    </Link>
                    <Link
                        to="/signUp"
                        className={currentPage === '/signUp' ? 'nav-link active' : 'nav-link'}
                    >
                        <h3 className='login-signUp-link-text'>Sign Up</h3>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default NavBar