import React, { useState } from 'react';
import Menu from './Menu';
import '../styles/HomePage.css'
import RecipeSection from './RecipeSection';
// import { MongoClient } from 'mongodb';

import { getRecipeByIngredients, getRecipeByRestrictions } from '../utils/SpoonacularAPI';

export const PAGE_STATE = {
    RECIPE_SEARCH: 'Searching',
    RECIPE_RANDOM: 'CheckBox',
    RECIPE_SAVED: 'Saved'
}

const allRestrictions = [
    {name:"Vegetarian", apiName: "vegetarian", checked: false},
    {name:"Vegan", apiName: "vegan", checked: false},
    {name:"Gluten Free", apiName: "glutenFree", checked: false},
    {name:"Dairy Free", apiName: "dairyFree", checked: false}, 
]

let savedRecipes = [];
let error = false;

const HomePage = (props) => {
    const [ingredients, setIngredients] = useState("");
    const [error, setError] = useState(false);

    const [pageState, setPageState] = useState();
    const [recipes, setRecipes] = useState([]);
    const [restrictions, setRestricions] = useState(allRestrictions);
    const [inputRestrictions, setInputRestrictions] =  useState('');

    // Getting User Input
    const onLeftOverRecipe = () => {
        setPageState(PAGE_STATE.RECIPE_SEARCH);
        setRecipes([]);
    }
    const onSurpiseRecipe = () => {
        setPageState(PAGE_STATE.RECIPE_RANDOM);
        setRecipes([]);
    }
    const onSavedRecipe = () => {
        setPageState(PAGE_STATE.RECIPE_SAVED);
        setRecipes(savedRecipes);
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
                newRestrictions.push({name: restriction.name, apiName: restriction.apiName, checked: !restriction.checked}); 
            }else{
                newRestrictions.push(restriction);
            }
            if(restriction.checked){
                newInput += restriction.apiName + ',';
            }
        })
        setRestricions(newRestrictions);
        setInputRestrictions(newInput);
    }
    // Save Functionality (local instance)
    const setSave = (r) => {
        savedRecipes.push(r);
        let newRecipes = [];
        recipes.map(recipe => {
            if(recipe != r){
                newRecipes.push(recipe);
            }
        })
        setRecipes(newRecipes);
    }
    // Call API
    const getLeftOverRecipe = async () => {
        const recipesData = await getRecipeByIngredients(ingredients);
        //  Error handling, if it returns empty array
        if(recipesData.length == 0){
            setError(true);
            return;
        }
        setError(false);
        const newRecipes = [recipesData[0], recipesData[1], recipesData[2], recipesData[3], recipesData[4]];
        setRecipes(newRecipes); 
    }
    const getRandomRecipe = async () => {
        const recipesData = await getRecipeByRestrictions(inputRestrictions);
        //  Error handling, if it returns empty array
        if(recipesData.length == 0){
            setError(true);
            return;
        }
        setError(false);
        const newRecipes = [recipesData.recipes[0], recipesData.recipes[1], recipesData.recipes[2], recipesData.recipes[3], recipesData.recipes[4]];
        setRecipes(newRecipes);
    }
    // Calling Data Base
    // const getSaveRecipes = async () => {
    //     const mongoClient = new MongoClient(
    //         'mongodb+srv://mongodb_lab:Wgoz4IWFdUhS3joI@cluster0.mvsro0u.mongodb.net/food_recipes?retryWrites=true&w=majority'
    //     );
    //     const data = await mongoClient
    //         .db()
    //         .collection('saved_recipes')
    //         .find({})
    //         .toArray();
    //     console.log(data)
    // }

    return (
        <div id='home-page'>
            <Menu
                pageState={pageState}
                onLeftOverRecipe={onLeftOverRecipe}
                onSurpiseRecipe={onSurpiseRecipe}
                onSavedRecipe={onSavedRecipe}
                getIngredients={getIngredients}
                getLeftOverRecipe={getLeftOverRecipe}
                restrictions={restrictions}
                getRestriction={getRestriction}
                getRandomRecipe={getRandomRecipe}
            />
            <RecipeSection 
                recipes={recipes}
                setSave={setSave}
                pageState={pageState}
                error={error}
            />
        </div>
    )
}

export default HomePage;