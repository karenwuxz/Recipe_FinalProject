// This is the file where we call APIs (food and image)
import React from 'react';
import '../styles/RecipeSection.css'

const RecipeSection = (props) => {
    return (
        <div id='recipe-section'>
            {props.error ? <h1>No Recipes, try again</h1> : null}
            {!props.error && props.recipes.map(r => {
                return (
                    <div className='recipes'>
                        <a href={r.sourceUrl}>{r.title}</a> <br/>
                        {props.pageState != 'Saved' ? <button className='menu-btn' onClick={()=>props.setSave(r)}>Save</button> : null}
                    </div>
                )
            })}
        </div>
    )
}

export default RecipeSection;