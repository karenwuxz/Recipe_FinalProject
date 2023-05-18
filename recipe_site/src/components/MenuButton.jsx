import React from 'react';

const MenuButton = (props) => {
    return (
        <button className='menu-btn' onClick={props.onClick}>{props.label}</button>
    )
}

export default MenuButton;