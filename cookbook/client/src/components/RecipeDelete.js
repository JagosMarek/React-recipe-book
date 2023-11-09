import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";
import styles from "../css/recipe.module.css";

// Komponenta RecipeDelete zajišťuje odstranění receptu
// Poskytuje tlačítko, které spustí odstranění receptu a zpracuje odpověď serveru
export default function RecipeDelete({ recipeId, onDelete, onError }) {
  // State pro sledování stavu požadavku na smazání
  const [deleteCall, setDeleteCall] = useState({ state: 'inactive' });

  // Funkce pro manipulaci s požadavkem na smazání receptu
  const handleDelete = async () => {
    // Pokud je již požadavek ve stavu čekání, nic nedělá
    if (deleteCall.state === 'pending') return;
  
    // Nastavení stavu požadavku na 'pending' před zahájením volání API
    setDeleteCall({ state: 'pending' });
  
    try {
      // Provedení HTTP POST požadavku pro smazání receptu
      const res = await fetch(`http://localhost:3000/recipe/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: recipeId })
      });

      // Zpracování odpovědi od serveru
      const data = await res.json();

      // Kontrola, zda došlo k chybě při požadavku
      if (res.status >= 400) {
        // Nastavení chybového stavu a zavolání případného callbacku
        setDeleteCall({ state: 'error', error: data });
        if (typeof onError === 'function') {
          onError(data.errorMessage);
        }
      } else {
        // Nastavení úspěšného stavu a zavolání callbacku pro odstranění
        setDeleteCall({ state: 'success' });
        if (typeof onDelete === 'function') {
          onDelete(recipeId);
        }
      }
    } catch (error) {
      // Zachycení a zpracování jakékoliv chyby při volání API
      setDeleteCall({ state: 'error', error: error.message });
      if (typeof onError === 'function') {
        onError(error.message);
      }
    }
  };

  // Vrátí tlačítko, které reprezentuje akci smazání s aktuálním stavem požadavku
  return (
    <Button className={styles.deleteRecipeButton} variant="danger" onClick={handleDelete} disabled={deleteCall.state === 'pending'}>
      {deleteCall.state === 'pending' ? 'Mažu...' : <Icon className={styles.deleteIcon} path={mdiTrashCanOutline} size={1} />}
    </Button>
  );
}
