import { useEffect, useState } from "react";
import "../App.css";
import recipeInfo from "../components/RecipeInfo";
import RecipeList from "../components/RecipeList";
import mainFooter from "../components/RecipeFooter";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../css/recipeInfo.module.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { STATUS } from "../components/constants/RequestStates"; // Import konstant stavu

function RecipeLoadList() {
    const [recipeListLoadCall, setRecipeListLoadCall] = useState({ // Výchozí stav nastaven na pending 
        state: STATUS.PENDING, 
      });
    
      const [ingredienceListLoadCall, setingredienceListLoadCall] = useState({
        state: STATUS.PENDING, 
      });
    
      useEffect(() => { // Provede asynchronní požadavek na server a aktualizuje stav recipeListLoadCall
        fetch(`http://localhost:3000/recipe/list`, { // Získám seznam receptů z API recipe/list
          method: "GET",
        }).then(async (response) => { // Tato metoda obsahuje zpracování odpovědi ze serveru
          const responseJson = await response.json(); // Transformace odpovědi na response.json
          if (response.status >= 400) { // Potom podle kódu se nastaví stav
            setRecipeListLoadCall({ state: STATUS.ERROR, error: responseJson }); 
          } else {
            setRecipeListLoadCall({ state: STATUS.SUCCESS, data: responseJson }); 
          }
        });
      }, []); // prázdné pole podmínek znamená, že kód se spustí pouze jednou
    
      useEffect(() => {
        fetch(`http://localhost:3000/ingredient/list`, { 
          method: "GET",
        }).then(async (response) => {
          const responseJson = await response.json();
          if (response.status >= 400) {
            setingredienceListLoadCall({ state: STATUS.ERROR, error: responseJson }); 
          } else {
            setingredienceListLoadCall({ state: STATUS.SUCCESS, data: responseJson }); 
          }
        });
      }, []); 
    
      function getChild() { // Na zálkadě stavu recipeListLoadCall a ingredienceListLoadCall vrátí obsah -> recepty, error nebo panding
        if (recipeListLoadCall.state === STATUS.SUCCESS && ingredienceListLoadCall.state === STATUS.SUCCESS) { 
          return (
            <>
              {recipeInfo()}
              <RecipeList recipeList={recipeListLoadCall.data} ingredientList = {ingredienceListLoadCall.data}/>
              {mainFooter()}
            </>
          );
        } else if (recipeListLoadCall.state === STATUS.ERROR || ingredienceListLoadCall.state === STATUS.ERROR) { 
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
    
  export default RecipeLoadList;