import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import styles from "../css/modal.module.css";

function RecipeForm(props) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ingredients: [],
    image: null,
  });

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
    e.preventDefault();
    e.stopPropagation();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);

    console.log(formDataToSend);
    handleClose();
  };

  const handleClose = () => props.setAddRecipeShow(false);

  const handleIngredientChange = (index, field, value) => {
    setFormData((prevData) => {
      const newData = { ...prevData };
      newData.ingredients[index][field] = value;
      return newData;
    });
  };

  const handleAddIngredient = () => {
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
        <Modal.Header closeButton>
          <Modal.Title>{"Přidat recept"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>{"Název receptu"}</Form.Label>
            <Form.Control
              type="text"
              placeholder={"Zadej název"}
              value={formData.name}
              onChange={(e) => setField("name", e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{"Popis"}</Form.Label>
            <ReactQuill
              theme="snow"
              value={formData.description}
              onChange={(value) => setField("description", value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{"Obrázek"}</Form.Label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
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
                />
                <Form.Control
                  type="text"
                  placeholder="Jednotka"
                  value={ingredient.unit}
                  onChange={(e) =>
                    handleIngredientChange(index, "unit", e.target.value)
                  }
                />
                <Button variant="danger" onClick={() => handleRemoveIngredient(index)}>
                  Odstranit
                </Button>
              </div>
            ))}
            <Button variant="primary" onClick={handleAddIngredient}>
              Přidat
            </Button>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex flex-row gap-2">
            <Button variant="secondary" onClick={handleClose}>
              {"Zavřít"}
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              {"Přidat"}
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RecipeForm;
