import React from "react";
import Recipe from "./Recipe"; // Import komponenty Recipe

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

