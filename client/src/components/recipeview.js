import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function RecipeView() {
    const [recipe, setRecipe] = useState({});
    const [reviews, setReviews] = useState([]);
    const [author, setAuthor] = useState([])
    const { id } = useParams();

    useEffect(() => {
        fetch(`/recipes/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setRecipe(data);
            })
            .catch((error) => console.log(error));

        fetch(`/recipes/${id}/review`)
            .then((response) => response.json())
            .then((data) => {
                setReviews(data); // access the reviews array

            })
            .catch((error) => console.log(error));
    }, [id]);
    console.log(reviews + " " + author)

    return (
        <div>
            <img id="#Recipeimg" src={recipe.image} alt={recipe.title} />
            <h2 className="center">
                <span>{recipe.title}</span>
            </h2>
            <div>
                <h3>Reviews</h3>
                {console.log(reviews)}
                {reviews && reviews.reviews.map((review, index) => {
                    return <div key={review.id}>
                        <span>{index}</span>
                        <p>Rating: {review.rating}</p>
                        <p>{review.content}</p>
                    </div>
                })}

            </div>
        </div>
    );
}

export default RecipeView;
