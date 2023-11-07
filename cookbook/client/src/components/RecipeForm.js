import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import styles from "../css/modal.module.css";

function RecipeForm(props) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: [{ name: "", amount: "", unit: "" }],
    image: null,
  });

  const [validated, setValidated] = useState(false);
  const [duplicateIngredientError, setDuplicateIngredientError] = useState(false);

  const setField = (name, val) => {
    return setFormData((formData) => {
      const newData = { ...formData };
      newData[name] = val;
      return newData;
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setField("image", file);
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    if (hasDuplicateIngredients()) {
      setDuplicateIngredientError(true);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);

    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    console.log(formDataToSend);
    handleClose();
  };

  const handleClose = () => props.setAddRecipeShow(false);

  const hasDuplicateIngredients = () => {
    const ingredientNames = formData.ingredients.map((ingredient) => ingredient.name);
    return new Set(ingredientNames).size !== ingredientNames.length;
  };

  const handleIngredientChange = (index, field, value) => {
    setFormData((prevData) => {
      const newData = { ...prevData };
      newData.ingredients[index][field] = value;
      return newData;
    });
  };

  const handleAddIngredient = () => {
    setDuplicateIngredientError(false); // Reset duplicate ingredient error
    setFormData((prevData) => {
      const newData = { ...prevData };
      newData.ingredients = [...newData.ingredients, { name: "", amount: "", unit: "" }];
      return newData;
    });
  };

  const handleRemoveIngredient = (index) => {
    setFormData((prevData) => {
      const newData = { ...prevData };
      newData.ingredients = newData.ingredients.filter((_, i) => i !== index);
      return newData;
    });
  };

  return (
    <>
      <Modal show={true} onHide={handleClose} className={styles.modal}>
        <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
          <Modal.Header closeButton>
            <Modal.Title>{"Přidat recept"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>{"Název receptu"}</Form.Label>
              <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setField("name", e.target.value)}
                maxLength={70}
                required
              />
              <Form.Control.Feedback type="invalid">
                Zadejte název receptu.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{"Popis"}</Form.Label>
              <textarea
                className="form-control"
                value={formData.description}
                onChange={(e) => setField("description", e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Zadejte popis receptu.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{"Obrázek"}</Form.Label>
              <input type="file" accept="image/*" onChange={handleImageChange} required />
              <Form.Control.Feedback type="invalid">
                Zadejte obrázek.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{"Ingredience"}</Form.Label>
              {formData.ingredients.map((ingredient, index) => (
                <div key={`ingredient-${index}`} className="d-flex mb-2">
                  <Form.Select
                    value={ingredient.name}
                    onChange={(e) =>
                      handleIngredientChange(index, "name", e.target.value)
                    }
                    required
                  >
                    <option value="" disabled>
                      {"Ingredience"}
                    </option>
                    {props.ingredientList.map((ing, i) => (
                      <option key={i} value={ing.name}>
                        {ing.name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control
                    type="number"
                    placeholder="Počet"
                    value={ingredient.amount}
                    onChange={(e) =>
                      handleIngredientChange(index, "amount", e.target.value)
                    }
                    min={1}
                    max={1000}
                    required
                  />
                  <Form.Control
                    type="text"
                    placeholder="Jednotka"
                    value={ingredient.unit}
                    onChange={(e) =>
                      handleIngredientChange(index, "unit", e.target.value)
                    }
                    required
                  />
                  {index > 0 && ( // Zobrazit tlačítko "Odstranit" pouze pokud existuje více než jeden řádek
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveIngredient(index)}
                    >
                      Odstranit
                    </Button>
                  )}
                </div>
              ))}
              {duplicateIngredientError && (
                <p className="text-danger">Ingredience s tímto jménem již existuje.</p>
              )}
              <Button variant="primary" onClick={handleAddIngredient}>
                Přidat ingredienci
              </Button>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex flex-row gap-2">
              <Button variant="secondary" onClick={handleClose}>
                {"Zavřít"}
              </Button>
              <Button variant="primary" type="submit">
                {"Přidat"}
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default RecipeForm;
