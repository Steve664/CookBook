import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"


function RecipeView() {
    const [recipe, setRecipe] = useState({})
    const { id } = useParams();

    useEffect(() => {
        fetch('/recipes/' + id)
            .then(response => response.json())
            .then(data => {
                setRecipe(data); // logs the recipe data returned from the server
            })
            .catch(error => console.log(error));
        //if not valid redirect
        // else {}
    }, []);


    return (<div>
        <img
            id="#Recipeimg"
            src={recipe.image}
            alt={recipe.title}
        />
        <h2 className="center"><span>{recipe.title}</span></h2>
        <p id="Instructions">{recipe.instructions}</p>
    </div>);
}



export default RecipeView