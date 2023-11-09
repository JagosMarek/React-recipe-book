import React, { useState, useMemo } from "react"; // Import Reactu abych ho mohl používat v komponentě
import RecipeGridList from "./RecipeGridList"; // Import Grid pro vykreslování seznamu jako karty
import RecipeTableList from "./RecipeTableList"; // Import Table pro vykreslování seznamu jako tabulky
import { useMediaQuery } from "react-responsive"; // Import funkce z knihovny react-esponsive pro zjištění velikosti obrazovky
import RecipeForm from "./RecipeForm";

import Navbar from "react-bootstrap/Navbar"; // Import komponenty Navbar z bootstrap -> ten slouží pro vkládání navigačních prvků na stránku
import Button from "react-bootstrap/Button"; // Import komponenty Button z bootstrap
import Form from "react-bootstrap/Form"; // Import komponenty formulář z bootstrap

import styles from "../css/recipeInfo.module.css"; // Import komponenty CSS styl
import Icon from "@mdi/react"; // Import ikon pro table a grid
import { mdiTable, mdiViewGridOutline, mdiMagnify} from "@mdi/js"; // ikona s lupou pro tlačítko vyhledávání + ikony grid a table

import { RECIPES_VIEW } from "./constants/RecipesView"; // Import konstanty
import { CARD_SIZE } from "./constants/CardSize"; // Import konstanty

// Komponenta slouží k zobrazení seznamu receptů. V závislosti na proměnné isGrid jestli je true nebo false vykreslí bud grid nebo table.

function RecipeList(props) {
  const [viewType, setViewType] = useState(RECIPES_VIEW.GRID); // výchozí stav zobrazení receptů -> jako karty
  const [searchBy, setSearchBy] = useState(""); // výchozí hodnota useState je prázdný řetězec
  const [cardSize, setCardSize] = useState(CARD_SIZE.SMALL); // výchozí hodnota je small
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' }); // proměnná bude true pokud je velikost obrazovky 768px a nižší.
  const isGrid = isTabletOrMobile ? true : viewType === RECIPES_VIEW.GRID; // pokud je isTableOrMobile true tak isGrid je taky true a zobrazí se mřížka
  const [addRecipeShow, setAddRecipeShow] = useState(false);
  const handleAddRecipeShow = () => setAddRecipeShow(true);

  const filteredRecipeList = useMemo(() => { // Vytvoří nový seznam receptů pomocí useMemo funkce. Výsledek je uložen do proměnné.
    return props.recipeList.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchBy.toLowerCase()) ||
        item.description.toLowerCase().includes(searchBy.toLowerCase()) // Pokud se searchBy změní tak useMemo vytvoří nový seznam.
      );
    });
  }, [searchBy, props.recipeList]); // Zde se funkce useMemo přepočítá znova pokud změnít text v searchBy nebo pokud změnít pole (např. bych odstranil recept, přidal)

  function handleSearch(event) { // funkce, kterou budeme spoustět na "odeslání" formuláře, tedy na stisknutí tlačítka vyhledat
    event.preventDefault();
    setSearchBy(event.target["searchInput"].value);
  }

  function handleSearchDelete(event) { // funkce, která se bude spouštět při změně hodnoty vstupu pro vyhledávání
    if (!event.target.value) setSearchBy(""); // pokud ve vstupu nebude hodnota (uživatel stiskne x), bude zrušeno vyhledávání
  }

  function handleToggleCardSize() {
    setCardSize(cardSize === CARD_SIZE.SMALL ? CARD_SIZE.LARGE : CARD_SIZE.SMALL); // mění velikost karet
  }

  return (
    <div>
      <Navbar expand="lg">
        <div className="container-fluid">
          <Navbar.Brand className={styles.listOfRecipesHeader}>
            Seznam receptů
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" bg="dark">
          <div>
            <Form className={styles.form} onSubmit={handleSearch}>
              <div className={styles.divForm}>
              <Form.Control
                id={"searchInput"}
                className={styles.formControl}
                type="search"
                placeholder="Vyhledat"
                aria-label="Vyhledat"
                onChange={handleSearchDelete}
              />
              <Button 
                className={styles.glassButton}
                style={{ marginRight: "8px" }}
                variant="outline-success"
                type="submit"
              >
                <Icon className={styles.icon} size={1} path={mdiMagnify} />
              </Button>
              <Button
                  className={styles.plusIcon}
                  style={{ float: "right" }}
                  variant="secondary"
                  onClick={handleAddRecipeShow}
                >
                  Přidat recept
                </Button>
              </div>
              <div className={`${styles.divForm} d-none d-md-block`}>
              <Button
                  className={`mx-2 ${styles.listOfRecipesButton}`}
                  variant="outline-primary"
                  onClick={() =>
                    setViewType((currentState) => { // funkce nastavuje viewType na opačnou hodnotu podle toho co je aktuálně nastaveno
                      if (currentState === RECIPES_VIEW.GRID) return RECIPES_VIEW.TABLE;
                      else return RECIPES_VIEW.GRID;
                    })
                  }
                >
                  <Icon className={styles.icon} size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />{" "}
                  {isGrid ? RECIPES_VIEW.TABLE : RECIPES_VIEW.GRID}
                </Button>
                </div>
                <div className={`${styles.divForm} d-none d-md-block`}>
                {isGrid && (
                  <Button
                    className={`mx-2 ${styles.listOfRecipesButton}`}
                    variant="outline-secondary"
                    onClick={handleToggleCardSize}
                  >
                    {cardSize === CARD_SIZE.LARGE ? "Malé karty" : "Velké karty"}
                  </Button>
                )}
                </div>
            </Form>
          </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
      {isGrid ? ( // klasika pokud je grid true tak vykreslím mřížky jinak table
        <RecipeGridList recipeList={filteredRecipeList} ingredientList={props.ingredientList} handleRecipeAdded={props.handleRecipeAdded} handleRecipeDeleted={props.handleRecipeDeleted} cardSize={cardSize} />
      ) : (
        <RecipeTableList recipeList={filteredRecipeList} handleRecipeAdded={props.handleRecipeAdded} handleRecipeDeleted={props.handleRecipeDeleted} />
      )}
      {addRecipeShow &&
                <RecipeForm
                    setAddRecipeShow={setAddRecipeShow}
                    ingredientList={props.ingredientList}
                    onComplete={(recipe) => props.handleRecipeAdded(recipe)}
                />
            }
    </div>
  );
}

export default RecipeList;