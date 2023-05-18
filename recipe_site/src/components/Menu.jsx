import React from 'react';
import MenuButton from './MenuButton';
import '../styles/Menu.css'

const Menu = (props) => {
    const Checkbox = ({ isChecked, label, checkHandler }) => {
        return (
          <div>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={checkHandler}
            />
            <label>{label}</label>
          </div>
        )
      }
    return (
        <div id='menu'>
            <div className='menu-content'>
                <div id='homepage-text'>Hungry ?</div>
            </div>
            <div className='menu-content'>
                <MenuButton label="Fridge Leftover" onClick={props.onLeftOverRecipe}/>
                <MenuButton label="Suprise Me" onClick={props.onSurpiseRecipe}/>
            </div>
            {props.pageState === "Searching" && (
            <div className='menu-content'>
                <input onChange={val => props.getIngredients(val)} placeholder='Ingredients sperated by comas'/>
                <MenuButton label="Get Recipe" onClick={props.getLeftOverRecipe}/>
            </div>
            )}
            {props.pageState === "CheckBox" && (
            <div className='menu-content'>
                {props.restrictions.map(restriction=>{
                    return (
                       <Checkbox 
                        isChecked={restriction.checked}
                        label={restriction.name}
                        checkHandler={()=>props.getRestriction(restriction)}
                        /> 
                    )
                })}
                <MenuButton label="Get Recipe" onClick={props.getRandomRecipe}/>
            </div>
            )}
        </div>
       
    )
}

export default Menu; 


