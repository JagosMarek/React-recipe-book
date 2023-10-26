import "./App.css";
import { useState, useEffect } from "react";
import recipeInfo from "./components/RecipeInfo";
import RecipeList from "./components/RecipeList";
import mainFooter from "./components/RecipeFooter";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "./css/recipeInfo.module.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

function App() {
  const [recipeListLoadCall, setRecipeListLoadCall] = useState({
    state: "pending",
  });

  const [ingredienceListLoadCall, setingredienceListLoadCall] = useState({
    state: "pending",
  });

  useEffect(() => {
    fetch(`http://localhost:3000/recipe/list`, { 
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

  useEffect(() => {
    fetch(`http://localhost:3000/ingredient/list`, { 
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setingredienceListLoadCall({ state: "error", error: responseJson });
      } else {
        setingredienceListLoadCall({ state: "success", data: responseJson });
      }
    });
  }, []); 

  function getChild() {
    if (recipeListLoadCall.state === "success" && ingredienceListLoadCall.state === "success") {
      return (
        <>
          {recipeInfo()}
          <RecipeList recipeList={recipeListLoadCall.data} ingredientList = {ingredienceListLoadCall.data}/>
          {mainFooter()}
        </>
      );
    } else if (recipeListLoadCall.state === "error" || ingredienceListLoadCall.state === "error") {
        return (
          <div className={styles.error}>
            <div>Nepodařilo se načíst recepty nebo ingredience</div>
            <br />
            <pre>{JSON.stringify(recipeListLoadCall.error, null, 2)}</pre>
          </div>
        );
    } else {
        return (
          <div className={styles.loading}>
            <Icon size={2} path={mdiLoading} spin={true} />
          </div>
        );
    }
  }

    return <div className="App">{getChild()}</div>;
}

export default App;
