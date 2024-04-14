import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import contextoCandidato from '../contextos/contextoCandidato';
import { NavbarBrand } from 'react-bootstrap';
import React from 'react';

export default function Menu(props) {
  const [candidato, setCandidato] = useContext(contextoCandidato);
  return (
      <Navbar className='bg-azul-w'>
        <Container>
          <Navbar.Collapse>
            <Nav className='me-auto'>
              <Navbar className='text-color'>Cadastro online:</Navbar>
              <NavDropdown>
                <NavDropdown.Item><Link className='text-color' to={"/candidatos"}>Candidatos Cadastrados</Link></NavDropdown.Item>
                 <NavDropdown.Divider/>
                <NavDropdown.Item ><Link className='text-color' to={"/"}>Vagas</Link></NavDropdown.Item>
              </NavDropdown>
              
            </Nav>
            <Nav className="d-flex justidy-content-around align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className='me-1' width="32" height="32" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
              </svg>
            <Nav className='text-color ps-2 pe-5'>Candidato: {candidato.nome}</Nav>
            <Nav.Link className='text-color' href='#' onClick={() => { setCandidato({ nome: '', logado: false }) }}>Logout</Nav.Link>
          
          </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}