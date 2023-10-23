import React, { useState } from "react"; // Import Reactu abych ho mohl používat v komponentě
import RecipeGridList from "./RecipeGridList";
import RecipeTableList from "./RecipeTableList";

import Icon from "@mdi/react";
import { mdiTable, mdiViewGridOutline } from "@mdi/js";

import Navbar from "react-bootstrap/Navbar"; // Import komponenty Navbar z bootstrap -> ten slouží pro vkládání navigačních prvků na stránku
import Button from "react-bootstrap/Button"; // Import komponenty Button z bootstrap

// Komponenta slouží k zobrazení seznamu receptů. Do komponenty jsou přidány Col, Row a Container, protože Card má defaultně
// nastevené řazení do sloupce. Zde Col dává jednomu receptu šířku 4 z 12 takže na řádek se vlezou 3.

function RecipeList(props) {
  const [viewType, setViewType] = useState("grid");
  const isGrid = viewType === "grid"; // isGrid je pomocná proměnná, kterou budu dále používat pro řízení vzhledu

  return (
    <div>
      <Navbar>
        <div className="container-fluid">
          <Navbar.Brand>Seznam receptů</Navbar.Brand>
          <Button
            variant="outline-primary"
            onClick={() =>
              setViewType((currentState) => {
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
      {isGrid ? (
        <RecipeGridList recipeList={props.recipeList} />
      ) : (
        <RecipeTableList recipeList={props.recipeList} />
      )}
      </div>
  );
}
  
export default RecipeList;