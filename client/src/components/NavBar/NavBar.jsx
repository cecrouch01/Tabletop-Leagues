import { Link, useLocation } from 'react-router-dom';
import './NavBar.css'


const NavBar = () => {
    const currentPage = useLocation().pathname;

    return (
        <>
            <header className="header">
                <section className='header-top'>
                    <Link className='link' to='/'>
                        <img className='logo' src='/COLOSSEUM.png'></img>
                    </Link>
                </section>
            </header>
            <nav className='navbar'>
                <Link
                    to="/"
                    className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
                >
                    <h3 className='nav-text'>Homepage</h3>
                </Link>
                <Link
                    to="/dashboard"
                    className={currentPage === '/dashboard' ? 'nav-link active' : 'nav-link'}
                >
                    <h3 className='nav-text'>Dashboard</h3>
                </Link>
                <Link
                    to="/league/join"
                    className={currentPage === '/league/join' ? 'nav-link active' : 'nav-link'}
                >
                    <h3 className='nav-text'>View Leagues</h3>
                </Link>
                <Link
                    to="/league/create"
                    className={currentPage === '/league/create' ? 'nav-link active' : 'nav-link'}
                >
                    <h3 className='nav-text'>Create League</h3>
                </Link>
                <Link
                    to="/signUp"
                    className={currentPage === '/signUp' ? 'nav-link active' : 'nav-link'}
                >
                    <h3 className='nav-text'>Sign Up</h3>
                </Link>
                <Link
                    to="/login"
                    className={currentPage === '/login' ? 'nav-link active' : 'nav-link'}
                >
                    <h3 className='nav-text'>Login</h3>
                </Link>
            </nav>
        </>
    );
}

export default NavBar