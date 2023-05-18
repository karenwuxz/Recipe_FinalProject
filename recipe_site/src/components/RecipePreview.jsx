import React from 'react';

const RecipePreview = (props) => {
    console.log(props.link);
    return (
        <div className='recipe-preview'>
            <a href={props.link}>{props.name}</a>
        </div>
    )
}

export default RecipePreview;