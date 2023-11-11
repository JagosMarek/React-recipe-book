import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import styles from "../css/recipe.module.css";
import { CARD_SIZE } from "./constants/CardSize";
import RecipeModalDetail from "./RecipeModalDetail";
import RecipeForm from './RecipeForm';
import RecipeDelete from './RecipeDelete';
import Icon from '@mdi/react';
import { mdiLeadPencil, mdiMagnify } from '@mdi/js';

// Hlavní komponenta Recipe pro zobrazení jednotlivých receptů
// Umožňuje zobrazit detail receptu, upravit recept nebo recept smazat
function Recipe(props) {
  // State proměnné pro řízení viditelnosti modálních oken
  const [isModalShown, setShow] = useState(false);
  const [isEditModalShown, setEditModalShow] = useState(false);

  // Funkce pro otevření modálního okna s detailem receptu
  const handleShowModal = () => setShow(true);

  // Funkce pro zavření modálního okna s detailem receptu
  const handleCloseModal = () => setShow(false);

  // Funkce pro otevření modálního okna pro editaci receptu
  const handleShowEditModal = () => setEditModalShow(true);

  // Renderování komponenty
  return (
    <>
      <Card className={styles.recipe}>
        <Card.Img variant="top" src={props.recipe.imgUri} alt={props.recipe.name} />
        <Card.Body
          // Přizpůsobení velikosti těla karty podle konstanty CARD_SIZE
          className={styles.recipeBody + (props.cardSize === CARD_SIZE.LARGE ? " " + styles.recipeBodyLarge : " " + styles.recipeBodySmall)}
        >
          <Card.Title className={styles.recipeTitle}>{props.recipe.name}</Card.Title>
          {props.cardSize === CARD_SIZE.LARGE ? (
            <Card.Text className={styles.recipeText}>{props.recipe.description}</Card.Text>
          ) : (
            <Card.Text className={styles.recipeDescription}>{props.recipe.description}</Card.Text>
          )}
          <Card.Text>
            <strong>Ingredience:</strong>
            <ul>
              {props.cardSize === CARD_SIZE.LARGE
                ? props.recipe.ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                      {ingredient.amount} {ingredient.unit} {props.ingredientList.find((ingredientInList) => ingredientInList.id === ingredient.id).name}
                    </li>
                  ))
                : props.recipe.ingredients.slice(0, 3).map((ingredient) => (
                    <li key={ingredient.id}>
                      {ingredient.amount} {ingredient.unit} {props.ingredientList.find((ingredientInList) => ingredientInList.id === ingredient.id).name}
                    </li>
                  ))}
            </ul>
          </Card.Text>
        </Card.Body>
        <div className={styles.buttons}>
            <Button className={styles.viewRecipeButton} variant="primary" onClick={handleShowModal}>
              <Icon className={styles.viewIcon} path={mdiMagnify} size={1} />
            </Button>
            {props.isAuthorized && (
              <>
                <Button className={`${styles.editRecipeButton} ${styles.squareButton}`} variant="secondary" onClick={handleShowEditModal}>
                  <Icon className={styles.editIcon} path={mdiLeadPencil} size={1} />
                </Button>
                <RecipeDelete recipeId={props.recipe.id} onDelete={props.handleRecipeDeleted} />
              </> 
            )}
        </div>
      </Card>

      <RecipeModalDetail
        show={isModalShown}
        onHide={handleCloseModal}
        recipe={props.recipe}
        ingredientList={props.ingredientList}
      />

      {isEditModalShown && (
          <RecipeForm
            setAddRecipeShow={setEditModalShow}
            recipe={props.recipe}
            isEdit={true}
            ingredientList={props.ingredientList}
            onComplete={props.handleRecipeAdded}
          />
        )}
    </>
  );
}

// Export komponenty Recipe pro použití v jiných částech aplikace
export default Recipe;
