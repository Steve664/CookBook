import React, { useState, useEffect } from "react"
import Cookies from 'js-cookie';
import RecipeCard from "./recipecard";
import { Modal, Form, Button, Card } from 'semantic-ui-react';

function Dashboard() {
    const [user, setUser] = useState({});
    const [editingRecipeId, setEditingRecipeId] = useState(null);
    const [deletingRecipeId, setDeletingRecipeId] = useState(null);
    const token = Cookies.get('token');
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

    useEffect(() => {
        if (token) {
            // verify session token
            fetch('/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => setUser(data))
                .catch(error => console.log(error));
        }
        //if not valid redirect
        // else {}
    }, []);

    const handleEdit = (id) => {
        setEditingRecipeId(id);
    }

    const handleEditSubmit = (data) => {
        // send PATCH request to server with updated data
        fetch(`/recipes/${editingRecipeId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(updatedRecipe => {
                // replace old recipe with updated recipe in user's recipes list
                const newRecipes = user.recipes.map(recipe => {
                    if (recipe.id === updatedRecipe.id) {
                        return updatedRecipe;
                    }
                    return recipe;
                });
                setUser({ ...user, recipes: newRecipes });
                // close modal
                setEditingRecipeId(null);
            })
            .catch(error => console.log(error));
    }

    const handleDelete = (id) => {
        setDeleteConfirmationOpen(true);
        setDeletingRecipeId(id);
    }

    const handleDeleteConfirm = () => {
        // send DELETE request to server with recipe ID
        fetch(`/recipes/${deletingRecipeId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    // remove recipe from user's recipes list
                    const newRecipes = user.recipes.filter(recipe => recipe.id !== editingRecipeId);
                    setUser(prevState => ({ ...prevState, recipes: newRecipes }));
                }
                setDeleteConfirmationOpen(false);
                setDeletingRecipeId(null);
            })
            .catch(error => console.log(error));
    }

    const handleDeleteCancel = () => {
        setDeleteConfirmationOpen(false);
        setDeletingRecipeId(null);
    }

    return (
        <div >
            <h1>Hello {user.name}</h1>
            {user.recipes && user.recipes.map((recipe) => {
                return <Card.Group centered>
                    <RecipeCard
                        key={recipe.id}
                        id={recipe.id}
                        title={recipe.title}
                        image={recipe.image}
                        description={recipe.description}
                        onEdit={() => handleEdit(recipe.id)}
                        onDelete={() => handleDelete(recipe.id)}
                    />
                </Card.Group>
            })}
            <Modal open={editingRecipeId !== null}>
                <Modal.Header>Edit Recipe</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={(event) => {
                        event.preventDefault();
                        const data = {
                            title: event.target.title.value,
                            image: event.target.image.value,
                            description: event.target.description.value
                        };
                        handleEditSubmit(data);
                    }}>
                        <Form.Field>
                            <label>Title</label>
                            <input name="title" defaultValue={editingRecipeId !== null ? user.recipes.find(recipe => recipe.id === editingRecipeId).title : ''} />
                        </Form.Field>
                        <Form.Field>
                            <label>Image URL</label>
                            <input name="image" defaultValue={editingRecipeId !== null ? user.recipes.find(recipe => recipe.id === editingRecipeId).image : ''} />
                        </Form.Field>
                        <Form.Field>
                            <label>Description</label>
                            <textarea name="description" defaultValue={editingRecipeId !== null ? user.recipes.find(recipe => recipe.id === editingRecipeId).description : ''} />
                        </Form.Field>
                        <Button type="submit">Save</Button>
                    </Form>
                </Modal.Content>
            </Modal>
            <Modal open={deleteConfirmationOpen}>
                <Modal.Header>Delete Recipe</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete this recipe?</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={handleDeleteCancel}>Cancel</Button>
                    <Button negative onClick={handleDeleteConfirm}>Delete</Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

export default Dashboard
