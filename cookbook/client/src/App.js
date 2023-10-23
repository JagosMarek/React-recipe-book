import "./App.css";
import recipeInfo from "./components/RecipeInfo";
import RecipeList from "./components/RecipeList";
import recipeList from "./MockData"; // Import Mockup dat -> zde jsou recepty.
import mainFooter from "./components/RecipeFooter";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      {recipeInfo()}
      <RecipeList recipeList={recipeList}/>
      {mainFooter()}
    </div>
  );
}

export default App;
