import './IconSelector.css';
import { GiAngelWings } from 'react-icons/gi';
import { GiAries } from 'react-icons/gi';
import { GiBattleAxe } from 'react-icons/gi';
import { GiBull } from "react-icons/gi";
import { GiAlienSkull } from 'react-icons/gi';

export default function IconSelector() {
    return (
        <div className='icon-selector'>
            <header><h2>Choose An Icon For Your Profile</h2></header>
            <div className='icons'>
                <div className='icon-item'>< GiAngelWings /></div>
                <div className='icon-item'><GiAries /></div>
                <div className='icon-item'><GiBattleAxe /></div>
                <div className='icon-item'><GiBull /></div>
                <div className='icon-item'><GiAlienSkull /></div>
            </div>
        </div>


    );
}