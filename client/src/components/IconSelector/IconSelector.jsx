import './IconSelector.css';
import { GiAngelWings } from 'react-icons/gi';
import { GiAries } from 'react-icons/gi';
import { GiBattleAxe } from 'react-icons/gi';
import { GiBull } from "react-icons/gi";
import { GiAlienSkull } from 'react-icons/gi';
import { useState } from 'react';
import { useColosseumContext } from '../../utils/ColosseumContext';
import { CHOOSE_ICON } from '../../utils/actions';
import 'react-bootstrap';

export default function IconSelector() {
    const [active, setActive] = useState('')
    const [state, dispatch] = useColosseumContext();
    const handleClick = (link) => {
        setActive(link)
        dispatch({ type: CHOOSE_ICON, payload: link })
    }

    return (
        <div className='icon-selector'>
            <header className='icon-selector-title'><h2>Choose An Icon</h2></header>
            <div className='icons'>
                <button onClick={(e) => {
                    e.preventDefault()
                    handleClick('angel')
                }}
                    className={active === 'angel' ? 'icon-item active' : 'icon-item'}>< GiAngelWings /></button>
                <button onClick={(e) => {
                    e.preventDefault()
                    handleClick('aries')
                }}
                    className={active === 'aries' ? 'icon-item active' : 'icon-item'}><GiAries /></button>
                <button onClick={(e) => {
                    e.preventDefault()
                    handleClick('axe')
                }}
                    className={active === 'axe' ? 'icon-item active' : 'icon-item'}><GiBattleAxe /></button>
                <button onClick={(e) => {
                    e.preventDefault()
                    handleClick('bull')
                }}
                    className={active === 'bull' ? 'icon-item active' : 'icon-item'}><GiBull /></button>
                <button onClick={(e) => {
                    e.preventDefault()
                    handleClick('alien')
                }}
                    className={active === 'alien' ? 'icon-item active' : 'icon-item'}><GiAlienSkull /></button>
            </div>
        </div>
    );
}