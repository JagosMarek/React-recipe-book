import "./App.css";

function renderRecipes(name) {
  return <h1>Naše {name} recepty</h1>
}

const recipes = {
  beef: "Hovězí",
  chicken: "Kuřecí",
  healthy: "Zdravé"
}



function App() {
  return (
    <div className="App">
      {renderRecipes (recipes.chicken)}
    </div>
  );
}

export default App;