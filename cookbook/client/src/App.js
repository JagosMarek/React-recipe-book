import "./App.css";
import recipeInfo from "./components/RecipeInfo";
import RecipeList from "./components/RecipeList";
import recipeList from "./MockData"; // Import Mockup dat -> zde jsou recepty.
import mainFooter from "./components/RecipeFooter";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      {recipeInfo()} {/* Zde volám funkci -> pokud mám {} závorky volám funkci */}
      <RecipeList recipeList={recipeList}/> {/* Zde volám komponentu -> pokud mám <> závorky volám komponentu */}
      {mainFooter()}
    </div>
  );
}

export default App;
