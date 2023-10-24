import React from "react"; // Import Reactu abych ho mohl používat v komponentě
import Recipe from "./Recipe"; // Import komponenty Recipe

// Komponenta vrací seznam jako mřížku

function RecipeGridList(props) {
  return (
    <div className="row">
      {props.recipeList.map((recipe) => (
        <div key={recipe.id} className="col-md-4">
          <Recipe recipe={recipe} />
        </div>
      ))}
    </div>
  );
}

export default RecipeGridList;

