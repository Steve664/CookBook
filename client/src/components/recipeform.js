
import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

function RecipeForm({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");

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
  );
}

export default RecipeForm;
