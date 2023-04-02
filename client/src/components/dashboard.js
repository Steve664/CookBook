import React, { useState, useEffect } from "react"
import Cookies from 'js-cookie';
import RecipeCard from "./recipecard";


function Dashboard() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = Cookies.get('token');

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
        console.log(`Edit button clicked for recipe ${id}`);
        // implement edit functionality
    }

    const handleDelete = (id) => {
        console.log(`Delete button clicked for recipe ${id}`);
        // implement delete functionality
    }
    console.log(user)
    return (<div>
        <h1>Hello {user.name}</h1>
        {user.recipes.map((recipe) => {
            return <RecipeCard
                key={recipe.id}
                title={recipe.title}
                image={recipe.image}
                description={recipe.description}
                onEdit={() => handleEdit(recipe.id)}
                onDelete={() => handleDelete(recipe.id)}
            />
        })
        }

    </div>)
}

export default Dashboard