import React from "react"; // Import Reactu abych ho mohl používat v komponentě
import styles from "../css/recipeInfo.module.css"; // Import komponenty CSS styl
import bagImage from "../images/bag.png" // Import obrázku

// Komponenta slouží k vykreslování nadpisu na stránce

function RecipeInfo() {
    return <h1 className={styles.recipeHeader}>
        Recepty z roztrhlého pytle
        <img src={bagImage} alt="Obrázek pytle" />
        </h1> 
}

export default RecipeInfo; // Export funkce