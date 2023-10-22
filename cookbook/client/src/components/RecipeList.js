import React from "react"; // Import Reactu abych ho mohl používat v komponentě
import Recipe from "./Recipe"; // Import komponenty Recipe
import Container from "react-bootstrap/Container";  // Import komponenty Container z bootstrap
import Row from "react-bootstrap/Row";  // Import komponenty Row z bootstrap
import Col from "react-bootstrap/Col";  // Import komponenty Col z bootstrap

// Komponenta slouží k zobrazení seznamu receptů. Do komponenty jsou přidány Col, Row a Container, protože Card má defaultně
// nastevené řazení do sloupce. Zde Col dává jednomu receptu šířku 4 z 12 takže na řádek se vlezou 3.

function RecipeList(props) {
  function getRecipeList(recipeList) {
    return recipeList.map((recipe) => {
      return (
        <Col key={recipe.id} md={4}>
          <Recipe recipe={recipe} />
        </Col>
      );
    });
  }

  return (
    <Container>
      <Row>
        {getRecipeList(props.recipeList)}
      </Row>
    </Container>
  );
}

export default RecipeList;