import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiTrashCanOutline } from "@mdi/js";
import styles from "../css/recipe.module.css";
import Confirmation from "./Confirmation";

// Komponenta RecipeDelete slouží k zobrazení tlačítka pro smazání receptu a ošetření celého procesu,
// včetně zobrazení potvrzovacího dialogu a komunikace s API pro odstranění receptu.
export default function RecipeDelete({ recipeId, onDelete, onError }) {
  const [deleteCall, setDeleteCall] = useState({ state: 'inactive' });
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Funkce pro manipulaci s požadavkem na smazání receptu
  const handleDelete = async () => {
    setShowConfirmation(false);
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

  // Funkce pro zobrazení potvrzovacího dialogu
  const handleShowConfirmation = () => {
    setShowConfirmation(true);
  };

  // Funkce pro skrytí potvrzovacího dialogu bez smazání
  const handleCancelConfirmation = () => {
    setShowConfirmation(false);
  };

  // Vrátí tlačítko, které reprezentuje akci smazání s aktuálním stavem požadavku
  return (
    <>
      <Button
        className={styles.deleteRecipeButton}
        variant="danger"
        onClick={handleShowConfirmation}
        disabled={deleteCall.state === 'pending'}
      >
        {deleteCall.state === 'pending' ? 'Mažu...' : <Icon className={styles.deleteIcon} path={mdiTrashCanOutline} size={1} />}
      </Button>

      <Confirmation
        show={showConfirmation}
        onHide={handleCancelConfirmation}
        title="Potvrzení smazání"
        message="Opravdu chcete smazat tento recept?"
        confirmText="Ano, smazat"
        onConfirm={handleDelete}
      />
    </>
  );
}
