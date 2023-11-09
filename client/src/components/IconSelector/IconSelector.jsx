import './IconSelector.css';
import { GiAngelWings } from 'react-icons/gi';
import { GiAries } from 'react-icons/gi';
import { GiBattleAxe } from 'react-icons/gi';
import { GiBull } from "react-icons/gi";
import { GiAlienSkull } from 'react-icons/gi';
import { useState } from 'react';
import 'react-bootstrap';

export default function IconSelector() {
    const [active, setActive] = useState("");
    const handleClick = (link) => {
        setActive(link);
    }

    return (
        <div className='icon-selector'>
            <header><h2>Choose An Icon For Your Profile</h2></header>
            <div className='icons'>
                <button onClick={() => handleClick('wings')} className={active === 'wings' ? 'icon-item active' : 'icon-item'}>< GiAngelWings /></button>
                <button onClick={() => handleClick('aries')} className={active === 'aries' ? 'icon-item active' : 'icon-item'}><GiAries /></button>
                <button onClick={() => handleClick('axe')} className={active === 'axe' ? 'icon-item active' : 'icon-item'}><GiBattleAxe /></button>
                <button onClick={() => handleClick('bull')} className={active === 'bull' ? 'icon-item active' : 'icon-item'}><GiBull /></button>
                <button onClick={() => handleClick('skull')} className={active === 'skull' ? 'icon-item active' : 'icon-item'}><GiAlienSkull /></button>
            </div>
        </div>
    );
}