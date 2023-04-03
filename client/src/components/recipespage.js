import AllRecipeCard from "./allRecipeCards";
import React, { useState, useEffect } from "react"
import { Card } from 'semantic-ui-react';


function RecipePage() {
    const [recipes, setRecipes] = useState(null);


    useEffect(() => {
        fetch('/recipes')
            .then(response => response.json())
            .then(data => {
                setRecipes(data); // logs the recipe data returned from the server
            })
            .catch(error => console.log(error));
        //if not valid redirect
        // else {}
    }, []);


    return (
        <div>
            <h1>Recipes</h1>
            {recipes && recipes.map((recipe) => {
                return <Card.Group centered>
                    <AllRecipeCard
                        key={recipe.id}
                        id={recipe.id}
                        title={recipe.title}
                        image={recipe.image}
                        description={recipe.description}
                    />
                </Card.Group>
            })
            }
        </div>
    );

}
export default RecipePage