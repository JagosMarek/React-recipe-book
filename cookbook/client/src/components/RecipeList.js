import React, { useState, useMemo } from "react"; // Import Reactu abych ho mohl používat v komponentě
import RecipeGridList from "./RecipeGridList"; // Import Grid pro vykreslování seznamu jako karty
import RecipeTableList from "./RecipeTableList"; // Import Table pro vykreslování seznamu jako tabulky

import Navbar from "react-bootstrap/Navbar"; // Import komponenty Navbar z bootstrap -> ten slouží pro vkládání navigačních prvků na stránku
import Button from "react-bootstrap/Button"; // Import komponenty Button z bootstrap
import Form from "react-bootstrap/Form"; // Import komponenty formulář z bootstrap

import styles from "../css/recipeInfo.module.css"; // Import komponenty CSS styl
import Icon from "@mdi/react"; // Import ikon pro table a grid
import { mdiTable, mdiViewGridOutline, mdiMagnify } from "@mdi/js"; // ikona s lupou pro tlačítko vyhledávání + ikony grid a table

// Komponenta slouží k zobrazení seznamu receptů. V závislosti na proměnné isGrid jestli je true nebo false vykreslí bud grid nebo table.

function RecipeList(props) {
  const [viewType, setViewType] = useState("grid"); // výchozí stav zobrazení receptů -> jako karty
  const isGrid = viewType === "grid"; // isGrid je proměnná je true pokud viewType = grid jinak je false.
  const [searchBy, setSearchBy] = useState(""); // výchozí hodnota useState je prázdný řetězec
  const [cardSize, setCardSize] = useState("small"); // výchozí hodnota je small

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
    setCardSize(cardSize === "small" ? "large" : "small"); // mění velikost karet
  }

  return (
    <div>
      <Navbar>
        <div className="container-fluid">
          <Navbar.Brand className={styles.listOfRecipesHeader}>
            Seznam receptů
          </Navbar.Brand>
          <div>
            <Form className="d-flex" onSubmit={handleSearch}>
              <Form.Control
                id={"searchInput"}
                style={{ maxWidth: "150px" }}
                type="search"
                placeholder="Vyhledat"
                aria-label="Vyhledat"
                onChange={handleSearchDelete}
              />
              <Button
                style={{ marginRight: "8px" }}
                variant="outline-success"
                type="submit"
              >
                <Icon size={1} path={mdiMagnify} />
              </Button>
              <Button
                  className={`mx-2 ${styles.listOfRecipesButton}`}
                  variant="outline-primary"
                  onClick={() =>
                    setViewType((currentState) => { // funkce nastavuje viewType na opačnou hodnotu podle toho co je aktuálně nastaveno
                      if (currentState === "grid") return "table";
                      else return "grid";
                    })
                  }
                >
                  <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} />{" "}
                  {isGrid ? "Tabulka" : "Grid"}
                </Button>
                {isGrid && (
                  <Button
                    className={`mx-2 ${styles.listOfRecipesButton}`}
                    variant="outline-secondary"
                    onClick={handleToggleCardSize}
                  >
                    {cardSize === "large" ? "Malé karty" : "Velké karty"}
                  </Button>
                )}
            </Form>
          </div>
        </div>
      </Navbar>
      {isGrid ? ( // klasika pokud je grid true tak vykreslím mřížky jinak table
        <RecipeGridList recipeList={filteredRecipeList} cardSize={cardSize} />
      ) : (
        <RecipeTableList recipeList={filteredRecipeList} />
      )}
    </div>
  );
}

export default RecipeList;
