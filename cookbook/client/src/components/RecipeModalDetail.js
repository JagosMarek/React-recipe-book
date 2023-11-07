import React from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "../css/modal.module.css";

function RecipeModalDetail(props) {
  const { show, onHide, recipe, ingredientList } = props;

  return (
    <Modal show={show} onHide={onHide} className={styles.modal}>
        
      <Modal.Header closeButton>
        <Modal.Title>{recipe.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.modalImg}>
        <img src={recipe.imgUri} alt={recipe.name} />
        </div>
        <p>{recipe.description}</p>
        <strong>Ingredience:</strong>
        <ul>
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.amount} {ingredient.unit}{" "}
              {ingredientList.find((ingredientInList) => ingredientInList.id === ingredient.id).name}
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Zavřít
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RecipeModalDetail;
