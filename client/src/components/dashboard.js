import React, { useState, useEffect } from "react"
import Cookies from 'js-cookie';
import RecipeCard from "./recipecard";
import { Link } from 'react-router-dom';
import { Modal, Form, Button, Divider, Card, Item } from 'semantic-ui-react';
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [user, setUser] = useState({});
    const [editingRecipeId, setEditingRecipeId] = useState(null);
    const [deletingRecipeId, setDeletingRecipeId] = useState(null);
    const token = Cookies.get('token');
    const navigate = useNavigate()
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
        else { navigate('/login') }
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
                    const newRecipes = user.recipes.filter(recipe => recipe.id !== deletingRecipeId);
                    setUser({ ...user, recipes: newRecipes });
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
        <div style={{ padding: "50px" }}>
            <h2>Hello {user.name}</h2>


            {user.recipes && user.recipes.map((recipe) => {
                return (<Item.Group divided>
                    <Item key={recipe.id}>
                        <Item.Image src={recipe.image} size="medium" />

                        <Item.Content>
                            <Item.Header>{recipe.title}</Item.Header>
                            <Item.Description>{recipe.description}</Item.Description>
                            <Item.Extra>

                                <Link to={`/recipeview/${recipe.id}`}><Button >View</Button></Link>
                                <Button primary onClick={() => handleEdit(recipe.id)}>Edit</Button>
                                <Button negative onClick={() => handleDelete(recipe.id)}>Delete</Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                    <Divider />
                </Item.Group>
                );
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
