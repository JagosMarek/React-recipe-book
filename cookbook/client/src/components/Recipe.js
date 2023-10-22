import React from "react"; // Import Reactu abych ho mohl používat v komponentě
import Card from "react-bootstrap/Card"; // Import komponenty Card z bootstrap
import Button from "react-bootstrap/Button"; // Import komponenty Button z bootstrap
import styles from "../css/recipe.module.css"; // Import komponenty CSS styl

// Komponenta Recipe slouží k vypisování jednotlivých receptů. Používá styly Card z Bootstrap a vlastní CSS styly.

function Recipe(props) {
    return (
      <Card className={styles.recipe}>
        <Card.Img variant="top" src={props.recipe.imgUri} alt={props.recipe.name} />
        <Card.Body className={styles.recipeBody}>
          <Card.Title className={styles.recipeTitle}>{props.recipe.name}</Card.Title>
          <Card.Text className={styles.recipeText}>{props.recipe.description}</Card.Text>    
        </Card.Body>
        <Button className={styles.recipeButton} variant="primary">Celý recept</Button>
      </Card>
    );
  }

export default Recipe;