
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "semantic-ui-react";
import Cookies from "js-cookie";
function RecipeForm() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const token = Cookies.get('token');
  const navigate = useNavigate()
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      return null
    }
    else {
      navigate('/login')
    }
  }, []);
  const onSubmit = (recipe) => {
    fetch('/recipes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(recipe)
    })
      .then(response => {
        if (response.ok) {
          // Recipe was successfully created
          console.log('Recipe was successfully created');
        } else {
          // There was an error creating the recipe
          console.error('There was an error creating the recipe');
        }
      })
      .catch(error => {
        console.error('There was a network error', error);
      });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    const recipe = { title, image, description, instructions };
    onSubmit(recipe);
    setTitle("");
    setImage("");
    setDescription("");
    setInstructions("");
  };

  return (
    <div style={{ padding: "200px", paddingTop: "50px", paddingBottom: "50px" }}>
      <h2>Add recipe</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Image URL</label>
          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(event) => setImage(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </Form.Field>
        <Form.Field>
          <label>Instructions</label>
          <textarea
            placeholder="Instructions"
            value={instructions}
            onChange={(event) => setInstructions(event.target.value)}
          ></textarea>
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
}

export default RecipeForm;
