import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import "./App.css";
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
        fixed="top"
        expand={"sm"}
        className="mb-3"
        bg="dark"
        variant="dark"
      >
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/")}>
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
              <Nav>
                <Nav.Link onClick={() => navigate('/recipeList')}>
                  Recepty
                </Nav.Link>
                <Nav.Link onClick={() => navigate('/ingredientList')}>
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
