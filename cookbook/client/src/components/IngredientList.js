import React from "react";
import Table from "react-bootstrap/Table"; // Importujte komponentu Table z react-bootstrap
import styles from "../css/ingredient.module.css";
import Icon from '@mdi/react';
import { mdiShakerOutline } from '@mdi/js';

function IngredientList(props) {
  return (
    <Table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.tableDes}>Název</th>
        </tr>
      </thead>
      <tbody>
        {props.ingredientList.map((ingredient) => (
          <tr key={ingredient.id}>
            <td className={styles.ingredient}><Icon className={styles.icon} path={mdiShakerOutline} size={1} />{ingredient.name}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default IngredientList;
