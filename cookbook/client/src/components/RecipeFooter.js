import React from "react"; // Import Reactu abych ho mohl používat v komponentě
import styles from "../css/recipeFooter.module.css";  // Import komponenty CSS styl

// Komponenta slouží k vykreslování patičky na stránce

function MainFooter() {
    return <div className={styles.footer}>
        @Marek Jagoš, 2023
    </div>
}

export default MainFooter; // Export funkce