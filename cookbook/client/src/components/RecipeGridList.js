import React from "react"; // Import Reactu abych ho mohl používat v komponentě
import Recipe from "./Recipe";  // Import Recipe komponenty pro vykreslení
import { CARD_SIZE } from "./constants/CardSize";

// Komponenta slouží k vykreslení receptů jako mřížka (karty)
// Pokud je large tak jsou dvě jinak tři karty vedle sebe

function RecipeGridList(props) {
  const { recipeList, cardSize, ingredientList } = props; // Přijme tři propsy recipeList (recepty co budou zobrazeny) a cardSize (velikost karty která se aplikuje) ingredientList 

  const getColumnSize = (cardSize) => { // Na základě velikosti vrátí bootstrap třídy
    if (cardSize === CARD_SIZE.LARGE) {
      return "col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4"; // Pro velké karty
    } else {
      return "col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3"; // Pro malé karty
    }
  };

  return (
    <div className="row">
      {recipeList.map((recipe) => (
        <div key={recipe.id} className={getColumnSize(cardSize)}>
          <Recipe recipe={recipe} cardSize={cardSize} ingredientList={ingredientList} handleRecipeAdded={props.handleRecipeAdded} handleRecipeDeleted={props.handleRecipeDeleted} />
        </div>
      ))}
    </div>
  );
}

export default RecipeGridList;