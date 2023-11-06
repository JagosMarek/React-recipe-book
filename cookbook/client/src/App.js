import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import "./App.css";
import styles from "./css/navbar.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar'; // Importujte Navbar z knihovny react-bootstrap
import Container from 'react-bootstrap/Container'; // Importujte Container z knihovny react-bootstrap
import Offcanvas from 'react-bootstrap/Offcanvas'; // Importujte Offcanvas z knihovny react-bootstrap
import Nav from 'react-bootstrap/Nav'; // Importujte Nav z knihovny react-bootstrap

function App() {
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar 
        className={` ${styles.navbar} mb-3`}
        fixed="top"
        expand={"sm"}
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/home")} className={styles.navbarHeader}>
            Recepty z roztrhlého pytle
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
          <Navbar.Offcanvas id={`offcanvasNavbar-expand-sm`}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`} onClick={() => navigate('/')}>
                Recepty z roztrhlého pytle
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Nav.Link onClick={() => navigate('/recipeList')} className={styles.navbarLink}>
                  Recepty
                </Nav.Link>
                <Nav.Link onClick={() => navigate('/ingredientList')} className={styles.navbarLink}>
                  Ingredience
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>

      <Outlet />
    </div>
  );
}

export default App;
