import "./App.css";
import RecipeInfo from "./components/RecipeInfo";
import RecipeList from "./components/RecipeList";
import recipeList from "./MockData"; // Import Mockup dat -> zde jsou recepty.
import MainFooter from "./components/RecipeFooter";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      {RecipeInfo()}
      <RecipeList recipeList={recipeList}/>
      {MainFooter()}
    </div>
  );
}

export default App;
