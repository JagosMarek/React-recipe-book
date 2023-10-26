import "./App.css";
import { useState, useEffect } from "react";
import recipeInfo from "./components/RecipeInfo";
import RecipeList from "./components/RecipeList";
import recipeList from "./MockData"; // Import Mockup dat -> zde jsou recepty.
import mainFooter from "./components/RecipeFooter";
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  const [recipeListLoadCall, setRecipeListLoadCall] = useState({
    state: "pending",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/recipe/get?id=${"b6c21cf8807dd356"}`, { // -> Našlo to salát z naklíčené čočky stav success
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setRecipeListLoadCall({ state: "error", error: responseJson });
      } else {
        setRecipeListLoadCall({ state: "success", data: responseJson });
      }
    });
  }, []); // prázdné pole podmínek znamená, že kód se spustí pouze jednou

  console.log(recipeListLoadCall)

  return (
    <div className="App">
      {recipeInfo()} {/* Zde volám funkci -> pokud mám {} závorky volám funkci */}
      <RecipeList recipeList={recipeList}/> {/* Zde volám komponentu -> pokud mám <> závorky volám komponentu */}
      {mainFooter()}
    </div>
  );
}

export default App;
