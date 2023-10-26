import React from "react"; // Import Reactu abych ho mohl používat v komponentě
import Recipe from "./Recipe"; // Import Recipe komponenty pro vykreslení

// Komponenta slouží k vykreslení receptů jako mřížka (karty)
// Pokud je large tak jsou dvě jinak tři karty vedle sebe

function RecipeGridList(props) {
  const { recipeList, cardSize, ingredientList } = props; // Přijme tři propsy recipeList (recepty co budou zobrazeny) a cardSize (velikost karty která se aplikuje) ingredientList 

  return (
    <div className="row">
      {recipeList.map((recipe) => (
        <div key={recipe.id} className={`col-md-${cardSize === "large" ? "6" : "4"}`}> 
          <Recipe recipe={recipe} cardSize={cardSize} ingredientList={ingredientList} />
        </div>
      ))}
    </div>
  );
}

export default RecipeGridList;