import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "../css/recipe.module.css";

function Recipe(props) {
  return (
    <Card className={styles.recipe}>
      <Card.Img variant="top" src={props.recipe.imgUri} alt={props.recipe.name} />
      <Card.Body className={styles.recipeBody + (props.cardSize === "large" ? " " + styles.recipeBodyLarge : " " + styles.recipeBodySmall)}>
        <Card.Title className={styles.recipeTitle}>{props.recipe.name}</Card.Title>
        {props.cardSize === "large" ? (
          <Card.Text className={styles.recipeText}>{props.recipe.description}</Card.Text>
        ) : (
          <Card.Text className={styles.recipeDescription}>{props.recipe.description}</Card.Text>
        )}
        <Card.Text>
          <strong>Ingredience:</strong>
          <ul>
            {props.cardSize === "large"
            ? props.recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.amount} {ingredient.unit}{" "}
                {props.ingredientList.find((ingredientInList) => ingredientInList.id === ingredient.id).name}
              </li>
            ))
              : props.recipe.ingredients.slice(0, 3).map((ingredient) => (
                  <li key={ingredient.id}>
                    {ingredient.amount} {ingredient.unit}{" "}
                    {props.ingredientList.find((ingredientInList) => ingredientInList.id === ingredient.id).name}
                  </li>
                ))
              }
          </ul>
        </Card.Text>
      </Card.Body>
      <Button className={styles.recipeButton} variant="primary">
        Celý recept
      </Button>
    </Card>
  );
}

export default Recipe;