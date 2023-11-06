import { useEffect, useState } from "react";
import "../App.css";
import recipeInfo from "../components/RecipeInfo";
import mainFooter from "../components/RecipeFooter";
import IngredientList from "../components/IngredientList";
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from "../css/recipeInfo.module.css";
import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";
import { STATUS } from "../components/constants/RequestStates"; // Import konstant stavu

function IngredientLoadList() {
    const [ingredientListLoadCall, setIngredientListLoadCall] = useState({ // Výchozí stav nastaven na pending 
        state: STATUS.PENDING, 
      });
    
      useEffect(() => { // Provede asynchronní požadavek na server a aktualizuje stav recipeListLoadCall
        fetch(`http://localhost:3000/ingredient/list`, { // Získám seznam receptů z API recipe/list
          method: "GET",
        }).then(async (response) => { // Tato metoda obsahuje zpracování odpovědi ze serveru
          const responseJson = await response.json(); // Transformace odpovědi na response.json
          if (response.status >= 400) { // Potom podle kódu se nastaví stav
            setIngredientListLoadCall({ state: STATUS.ERROR, error: responseJson }); 
          } else {
            setIngredientListLoadCall({ state: STATUS.SUCCESS, data: responseJson }); 
          }
        });
      }, []); // prázdné pole podmínek znamená, že kód se spustí pouze jednou
    
      function getChild() { // Na zálkadě stavu recipeListLoadCall a ingredientListLoadCall vrátí obsah -> recepty, error nebo panding
        if (ingredientListLoadCall.state === STATUS.SUCCESS) { 
          return (
            <>
              {recipeInfo()}
              <IngredientList ingredientList = {ingredientListLoadCall.data}/>
              {mainFooter()}
            </>
          );
        } else if (ingredientListLoadCall.state === STATUS.ERROR) { 
          return (
            <div className={styles.error}>
              <div>Nepodařilo se načíst recepty nebo ingredience</div>
              <br />
              <pre>{JSON.stringify(ingredientListLoadCall.error, null, 2)}</pre>
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
    
  export default IngredientLoadList;