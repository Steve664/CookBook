import React, { useState, useEffect } from "react"
import Cookies from 'js-cookie';



function Dashboard() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            // verify session token
            fetch('/auth/verify_token', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => setUser(data.user))
                .catch(error => console.log(error));
        }
        // else {}
    }, []);

    return <h1> Dashboard {user.name}  </h1>
}

export default Dashboard