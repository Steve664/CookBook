import AllRecipeCard from "./allRecipeCards";
import React, { useState, useEffect } from "react"
import { Modal, Form, Button, Divider, Card, Item } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


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
        <div style={{ padding: "50px" }}>
            <h1>Recipes</h1>
            {recipes && recipes.map((recipe) => {
                return (<Item.Group divided>
                    <Item key={recipe.id}>
                        <Item.Image src={recipe.image} size="medium" />

                        <Item.Content>
                            <Item.Header>{recipe.title}</Item.Header>
                            <Item.Description>{recipe.description}</Item.Description>
                            <Item.Extra>

                                <Link to={`/recipeview/${recipe.id}`}><Button >View</Button></Link>

                            </Item.Extra>
                        </Item.Content>
                    </Item>
                    <Divider />
                </Item.Group>
                );
            })}
        </div>
    );

}
export default RecipePage