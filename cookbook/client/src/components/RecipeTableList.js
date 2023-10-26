import React from "react"; // Import Reactu abych ho mohl používat v komponentě
import Table from "react-bootstrap/Table"; // Import komponenty Table z bootstrap
import styles from "../css/recipeTableList.module.css"; // Import komponenty CSS styl
import Icon from '@mdi/react'; // Import ikon 
import { mdiSilverwareVariant } from '@mdi/js'; // Import ikon

// komponenta vrací seznam jako tabulku

function RecipeTableList(props) {
  return (
    <Table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.tableDes}>Název</th>
          <th className={styles.tableDes}>Popis</th>
        </tr>
      </thead>
      <tbody>
        {props.recipeList.map((recipe) => {
          return (
            <tr key={recipe.id}>
              <td className={styles.recipeTitle}><Icon className={styles.icon} path={mdiSilverwareVariant} size={1} /> {recipe.name}</td>
              <td className={styles.recipeText}>{recipe.description}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default RecipeTableList;