import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import './css/Recipeview.css'
import { Rating, Divider, Form, Button, Comment, Header } from 'semantic-ui-react';
import Cookies from 'js-cookie';
function RecipeView() {
    const [recipe, setRecipe] = useState({});
    const [reviews, setReviews] = useState([]);
    const [author, setAuthor] = useState([])
    const token = Cookies.get('token');
    const { id } = useParams();

    const [newReview, setNewReview] = useState({
        rating: null,
        content: ''
    });

    const handleRate = (e, { rating }) => {
        setNewReview({ ...newReview, rating: rating });
        console.log(rating)
    };

    const handleReviewChange = (e) => {
        setNewReview({ ...newReview, content: e.target.value });
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (token) {
            const response = await fetch(`/recipes/${id}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newReview),
            });
            if (response.ok) {
                // Update the reviews state with the new review
                const review = await response.json();
                setReviews([...reviews, review]);
                // Clear the form
                setNewReview({ content: '', rating: 0 });
            } else {
                console.error('Failed to create review:', response.statusText);
            }
        }
        else {
            alert("log in to comment")
        }
    };

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
                return setReviews(data.reviews), setAuthor(data.authors);   // access the reviews array 
            })
            .catch((error) => console.log(error));
    }, [id]);

    return (
        <div id="main">
            <div id="recipe">
                <img id="Recipeimg" src={recipe.image} alt={recipe.title} />
                <h2 className="center">
                    <span>{recipe.title}</span>
                </h2>
                <h3>Description:</h3>
                <p>{recipe.description}</p>
                <h3>instructions:</h3>
                <p>{recipe.instructions}</p>
            </div>
            <div id="reviews">
                <Divider />
                <Comment.Group >
                    <Header as='h3' dividing>
                        Reviews
                    </Header>
                    {reviews && reviews.map((review, index) => {
                        return <Comment key={index}>
                            <Comment.Content>
                                <Comment.Author as='a'>{author[index] || "You"}</Comment.Author>
                                <Comment.Metadata>
                                    <div>{review.created_at}</div>
                                </Comment.Metadata>
                                <Comment.Text>{review.content}</Comment.Text>
                                <Comment.Metadata>
                                    <span>Rating:</span>
                                    <Rating defaultRating={review.rating} maxRating={5} disabled />
                                </Comment.Metadata>
                            </Comment.Content>
                        </Comment>
                    }
                    )}
                    <Divider />
                    <Form onSubmit={handleReviewSubmit}>
                        <span>Rating:</span>
                        <Rating maxRating={5} onRate={handleRate} />
                        <Form.TextArea name='content' placeholder='Write a review...' onChange={handleReviewChange} value={newReview.content || ''} />
                        <Button content='Add Review' labelPosition='left' icon='edit' primary />
                    </Form>
                </Comment.Group>

            </div>
        </div>
    );
}

export default RecipeView;
