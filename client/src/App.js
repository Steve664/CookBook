
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login'
import SignUp from './components/signup'
import RecipePage from './components/recipespage';
import Dashboard from './components/dashboard';
import RecipeForm from './components/recipeform'
import RecipeView from './components/recipeview';
import 'semantic-ui-css/semantic.min.css';
import Navbar from './components/navbar';
function App() {

  return (


    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recipeform" element={<RecipeForm />} />
        <Route path="/recipes" element={<RecipePage />} />
        <Route path="/recipeview/:id" element={<RecipeView />} />
      </Routes>
    </Router>
  );
}

export default App;
