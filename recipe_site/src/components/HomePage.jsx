import React, { useState } from 'react';
import Menu from './Menu';
import RecipeSection from './RecipeSection';

import { getRecipeByIngredients, getRecipeByRestrictions } from '../utils/SpoonacularAPI';

export const PAGE_STATE = {
    MENU: 'Choosing Two Options',
    RECIPE_SEARCH: 'Searching',
    RECIPE_RANDOM: 'CheckBox',
}

const allRestrictions = [
    {name:"Vegetarian", checked: false},
    {name:"Vegan", checked: false},
    {name:"Gluten Free", checked: false},
    {name:"Dairy Free", checked: false}, 
]

const HomePage = (props) => {
    const [ingredients, setIngredients] = useState("");
    const [pageState, setPageState] = useState(PAGE_STATE.MENU);
    const [recipes, setRecipes] = useState([]);
    const [restrictions, setRestricions] = useState(allRestrictions);
    const [inputRestrictions, setInputRestrictions] =  useState('');

    // DEFINE leftOverRecipe onClick Functions
        // should render text box for input
    const onLeftOverRecipe = () => {
        setPageState(PAGE_STATE.RECIPE_SEARCH);
        setRecipes([]);
    }
    // DEFINE surpiseRecipe onClick Functions 
        // should render
    const onSurpiseRecipe = () => {
        setPageState(PAGE_STATE.RECIPE_RANDOM);
        setRecipes([]);
    }
    const getIngredients = (val) => {
        const ingredients = val.target.value;
        setIngredients(ingredients);
    }
    const getRestriction = (setRestriciton) => {
        let newRestrictions = []
        let newInput = "";
        restrictions.map(restriction => {
            if(restriction.name === setRestriciton.name){
                newRestrictions.push({name: restriction.name, checked: !restriction.checked}); 
            }else{
                newRestrictions.push(restriction);
            }
            if(restriction.checked){
                newInput += restriction.name + ',';
            }
        })
        setRestricions(newRestrictions);
        setInputRestrictions(newInput);
    }
    //TODO:
       // -  Error handling, if it returns empty array
    const getLeftOverRecipe = async () => {
        const recipesData = await getRecipeByIngredients(ingredients);
        const newRecipes = [recipesData[0], recipesData[1], recipesData[2], recipesData[3], recipesData[4]];
        setRecipes(newRecipes); 
    }
    const getRandomRecipe = async () => {
        const recipesData = await getRecipeByRestrictions(inputRestrictions);
        const newRecipes = [recipesData.recipes[0]];
        setRecipes(newRecipes);
    }

    return (
        <div id='home-page'>
            <Menu
                pageState={pageState}
                onLeftOverRecipe={onLeftOverRecipe}
                onSurpiseRecipe={onSurpiseRecipe}
                getIngredients={getIngredients}
                getLeftOverRecipe={getLeftOverRecipe}
                restrictions={restrictions}
                getRestriction={getRestriction}
                getRandomRecipe={getRandomRecipe}
            />
            <RecipeSection 
                recipes={recipes}
            />
        </div>
    )
}

export default HomePage;