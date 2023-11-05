import { AiFillGithub } from 'react-icons/ai';
import { AiFillFacebook } from 'react-icons/ai';
import { VscWand } from 'react-icons/vsc'
import './Footer.css'

export default function Footer() {
    return (
        <footer className='footer-container'>
            <nav className='footer'>
                <div>
                    <a href="https://github.com/cecrouch01/Tabletop-Leagues" target="_blank" rel="noreferrer"><AiFillGithub className='footerItem' /></a>
                </div>
                <div>
                    <a href="https://magic.wizards.com/en/mtgarena/digital-magic-strategy-card-game?gclid=Cj0KCQjw-pyqBhDmARIsAKd9XIOc7FtTIdAQatVOAS9xRTO_ld76zbNqfQrMEMLbw1pHYOfp86u4aOYaAsWwEALw_wcB" target="_blank" rel="noreferrer"><VscWand className='footerItem' /></a>
                </div>
                <div>
                    <a href="https://www.facebook.com/MagicTheGathering" target="_blank" rel="noreferrer"><AiFillFacebook className='footerItem' /></a>
                </div>
            </nav>
        </footer>
    );
}
