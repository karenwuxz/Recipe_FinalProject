const apiKey = '03a60c875ca849da989a8d997e82394d';

export const getRecipeByIngredients = (ingredients) => {
    return fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredients}&number=5`)
        .then(res => res.json())
        .then(data => data);
}

export const getRecipeByRestrictions = (restrictions) => {
    console.log(restrictions);
    return fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=5&tags=${restrictions}`)
        .then(res => res.json())
        .then(data => data);
}

