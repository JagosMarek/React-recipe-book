import React, { useState } from "react"; // Import Reactu abych ho mohl používat v komponentě
import RecipeGridList from "./RecipeGridList"; // Import Grid pro vykreslování seznamu jako karty
import RecipeTableList from "./RecipeTableList"; // Import Table pro vykreslování seznamu jako tabulky

import Icon from "@mdi/react"; // Import ikon pro table a grid
import { mdiTable, mdiViewGridOutline } from "@mdi/js"; // ikony grid a table
import styles from "../css/recipeInfo.module.css"; // Import komponenty CSS styl

import Navbar from "react-bootstrap/Navbar"; // Import komponenty Navbar z bootstrap -> ten slouží pro vkládání navigačních prvků na stránku
import Button from "react-bootstrap/Button"; // Import komponenty Button z bootstrap

// Komponenta slouží k zobrazení seznamu receptů. V závislosti na proměnné isGrid jestli je true nebo false vykreslí budˇ grid nebo table.

function RecipeList(props) {
  const [viewType, setViewType] = useState("grid"); // výchozí stav zobrazení receptů -> jako karty
  const isGrid = viewType === "grid"; // isGrid je proměnná je true pokud viewType = grid jinak je false.

  return (
    <div>
      <Navbar>
        <div className="container-fluid"> 
          <Navbar.Brand className={styles.listOfRecipesHeader}>Seznam receptů</Navbar.Brand>
          <Button className={styles.listOfRecipesButton}
            variant="outline-primary"
            onClick={() =>
              setViewType((currentState) => { // funkce nastavuje viewType na opačnou hodnotu podle toho co je aktuálně nastaveno
                if (currentState === "grid") return "table";
                else return "grid";
              })
            }
          >
            <Icon size={1} path={isGrid ? mdiTable : mdiViewGridOutline} /> {" "}
            {isGrid ? "Tabulka" : "Grid"}
          </Button>
        </div>
      </Navbar>
      {isGrid ? ( // klasika pokud je grid true tak vykreslím mřížky jinak table
        <RecipeGridList recipeList={props.recipeList} />
      ) : (
        <RecipeTableList recipeList={props.recipeList} />
      )}
      </div>
  );
}
  
export default RecipeList;