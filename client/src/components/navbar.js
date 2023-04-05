import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Segment } from "semantic-ui-react";
import Cookies from "js-cookie";

function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [activeItem, setActiveItem] = useState('');
  const navigate = useNavigate()
  const token = Cookies.get('token');
  useEffect(() => {

    if (token) {
      setLoggedIn(true);
    }
  }, [token]);


  const handleLogout = () => {
    // clear session cookie

    Cookies.remove('token');
    setLoggedIn(false);
    navigate('/')
  }

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Segment inverted>
      <Menu inverted pointing secondary>
        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={handleItemClick}
          as={Link} to="/">
          Home
        </Menu.Item>
        <Menu.Item
          name='recipes'
          active={activeItem === 'recipes'}
          onClick={handleItemClick}
          as={Link} to="/recipes">
          Recipes
        </Menu.Item>

        {loggedIn ? (<Menu.Menu position="right">
          <Menu.Item
            name='dashboard'
            active={activeItem === 'dashboard'}
            onClick={handleItemClick}
            as={Link} to="/dashboard">
            Your Dashboard
          </Menu.Item>

          <Menu.Item
            name='addrecipe'
            active={activeItem === 'addrecipe'}
            onClick={handleItemClick}
            as={Link} to="/recipeform">
            Add Recipe
          </Menu.Item>

          <Menu.Item onClick={handleLogout}>
            Log Out
          </Menu.Item>

        </Menu.Menu>) : (<Menu.Menu position="right">
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link} to="/login">
            Login
          </Menu.Item>
          <Menu.Item
            name='signup'
            active={activeItem === 'signup'}
            onClick={handleItemClick}
            as={Link} to="/signup">
            Sign Up
          </Menu.Item>
        </Menu.Menu>)
        }
      </Menu>
    </Segment>
  );
}

export default Navbar;
