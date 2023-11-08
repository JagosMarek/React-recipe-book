import React, { useState, useEffect } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import styles from "../css/modal.module.css";

function RecipeForm(props) {
  // State pro uchování dat formuláře.
  const [formData, setFormData] = useState({
    id: "", 
    name: "",
    description: "",
    ingredients: [{ id: "", amount: "", unit: "" }],
    imgUri: "",
  });
  
  // State pro validaci formuláře.
  const [validated, setValidated] = useState(false);
  
  // State pro zobrazení chyby při duplicitě ingrediencí.
  const [duplicateIngredientError, setDuplicateIngredientError] = useState(false);
  
  const unitOptions = ['ks', 'l', 'ml', 'g', 'kg', 'šálek', 'lžíce', 'lžička', 'špetka', 'kávová lžička', 'plátek', 'snítka', 'kousek'];

  // Funkce pro aktualizaci hodnot ve state formData.
  const setField = (name, val) => {
    return setFormData((formData) => {
      const newData = { ...formData };
      newData[name] = val;
      return newData;
    });
  };

  useEffect(() => {
    // Tento efekt se spustí pouze pokud `isEdit` je `true` a `recipe` objekt existuje
    // Je to určeno pro inicializaci formuláře s existujícími daty receptu při editaci.
    if (props.isEdit && props.recipe) {
      setFormData({
        // Pokud některá z těchto props není nahradím prázdným řetězcem
        name: props.recipe.name,
        description: props.recipe.description,
        ingredients: props.recipe.ingredients,
        imgUri: props.recipe.imgUri,
      });
    } else if (!props.isEdit) {
      // Pokud není režim úprav, resetuji formulář na výchozí hodnoty -> když chci vytvořit novej recept
      setFormData({
        name: "",
        description: "",
        ingredients: [{ id: "", amount: "", unit: "" }],
        imgUri: "",
      });
    }
  }, [props.isEdit, props.recipe]); // Tento efekt se spustí pouze když se změní `props.isEdit` nebo `props.recipe`
  

    // Funkce pro odeslání formuláře.
  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    e.stopPropagation();

    // Kontrola na duplicitu ingrediencí.
    if (hasDuplicateIngredients()) {
      setDuplicateIngredientError(true);
      return;
    }

    // Kontrola validace formuláře.
    if (form.checkValidity()) {
      const endpoint = props.isEdit ? 'http://localhost:3000/recipe/update' : 'http://localhost:3000/recipe/create';
      const method = 'POST';
    
      // Příprava dat pro odeslání.
      const formDataToSend = {
        name: formData.name,
        description: formData.description,
        imgUri: formData.imgUri,
        ingredients: formData.ingredients.map((ingredient) => ({
          id: ingredient.id,
          amount: parseFloat(ingredient.amount), 
          unit: ingredient.unit,
        })),
        ...(props.isEdit && { id: props.recipe.id }) // Přidám id jenom pokud je to editace
      };

      // Asynchronní odeslání dat na server.
      try {
        const response = await fetch(endpoint, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formDataToSend),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        handleClose(); // Zavření modálního okna po úspěšném odeslání.
      } catch (error) {
        console.error('Chyba při odesílání formuláře:', error);
      }
    } else {
      // Pokud formulář není validní, nastavím validated na true a zobrazí se chybové hlášky
      setValidated(true);
    }
  };
  
  // Funkce pro zavření modálního okna.
  const handleClose = () => props.setAddRecipeShow(false);

  // Funkce pro kontrolu duplicitních ingrediencí podle ID.
  const hasDuplicateIngredients = () => {
    const ingredientIds = formData.ingredients.map((ingredient) => ingredient.id);
    return new Set(ingredientIds).size !== ingredientIds.length;
  };

  // Funkce pro manipulaci s ingrediencemi v state.
  const handleIngredientChange = (index, field, value) => {
    if (duplicateIngredientError) {
      setDuplicateIngredientError(false);
    }
  
  // Funkce pro aktualizaci hodnoty konkrétní ingredience v poli ingrediencí.
  setFormData((prevData) => {
      const newData = { ...prevData };
      newData.ingredients[index][field] = value;
      return newData;
    });
  };

  // Funkce pro přidání nové ingredience do formuláře.
  const handleAddIngredient = () => {
    setDuplicateIngredientError(false);
    setFormData(prevData => ({
      ...prevData,
      ingredients: prevData.ingredients.concat({ id: "", amount: "", unit: "" })
    }));
  };
  
  // Funkce slouží k odstranění ingredience z pole ingrediencí 
  const handleRemoveIngredient = index => {
    setFormData(prevData => ({
      ...prevData,
      ingredients: prevData.ingredients.filter((_, i) => i !== index)
    }));
  };

  return (
    <>
      <Modal show={true} onHide={handleClose} size="lg" className={styles.modal}>
        <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
        <Modal.Header closeButton>
          <Modal.Title>{props.isEdit ? "Upravit recept" : "Přidat recept"}</Modal.Title>
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
              <Form.Label>{"Obrázek URL"}</Form.Label>
              <Form.Control
                type="text"
                value={formData.imgUri}
                onChange={(e) => setField("imgUri", e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Zadejte URL obrázku.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>{"Ingredience"}</Form.Label>
              {formData.ingredients.map((ingredient, index) => (
                <div key={`ingredient-${index}`} className="d-flex mb-2">
                  <Form.Select
                    value={ingredient.id}
                    onChange={(e) => handleIngredientChange(index, "id", e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      {"Vyberte ingredienci"}
                    </option>
                    {Array.isArray(props.ingredientList) && props.ingredientList
                      .slice() // vytvořím kopii pole
                      .sort((a, b) => a.name.localeCompare(b.name)) // Seřadím kopii abecedně
                      .map((ing) => (
                        <option key={ing.id} value={ing.id}>
                          {ing.name}
                        </option>
                      ))
                    }
                  </Form.Select>
                  <Form.Control
                    type="number"
                    placeholder="Počet"
                    value={ingredient.amount}
                    onChange={(e) => handleIngredientChange(index, "amount", e.target.value)}
                    step="0.1"
                    min={0.1}
                    max={10000}
                    required
                  />
                  <Form.Select
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
                    required
                  >
                    <option value="">Vyberte jednotku</option>
                    {unitOptions.map((unit, i) => (
                      <option key={i} value={unit}>{unit}</option>
                    ))}
                  </Form.Select>
                  {index > 0 && (
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
                {props.isEdit ? "Uložit" : "Přidat"}
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default RecipeForm;
