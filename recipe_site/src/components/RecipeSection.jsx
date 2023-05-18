// This is the file where we call APIs (food and image)
import React from 'react';
import RecipePreview from './RecipePreview';

const RecipeSection = (props) => {
    return (
        <div id='recipe-seciton'>
            {props.recipes.map(r => {
                return (
                    <RecipePreview name={r.title} link={r.sourceUrl}/>
                )
            })}
        </div>
    )
}

export default RecipeSection;