import Pagina from "../templates/pagina";

import {useContext} from "react";
import { useState } from "react";
import contextoCandidato from "../contextos/contextoCandidato";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import React from "react";

export default function TelaCadastroLogin(props) {
    const [candidato, setCandidato] = useContext(contextoCandidato);
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');

    function verificarCredenciais() {
        if (nome === 'admin' && senha === 'admin') {
            setCandidato({
                nome: '',
                logado: true
            });
        }
    }
    return (
        <div>
            <Pagina className='' >
                <h2 className="title-form mt-3 h2">
                            <span className="h2">Faça Login</span></h2>
                <div className="d-flex justify-content-center">
                    <Form className="mt-2 container col-4 bg-azul d-flex justify-content-center align-items-center row" noValidate >
                    <Row>
                        <Form.Group >
                            <Form.Label className="mt-5 color-w">Candidato:</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                value={nome}
                                placeholder="nome de usuário"
                                id='nome'
                                onChange={(e) => setNome(e.target.value)}
                            />
                            <Form.Control.Feedback type='invalid'>Preencha a informação!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mt-4'>
                            <Form.Label className="color-w">Senha:</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                value={senha}
                                placeholder="******"
                                id='senha'
                                onChange={(e) => setSenha(e.target.value)}
                            />
                            <Form.Control.Feedback type='invalid'>Preencha a informação!</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <div className='d-flex mt-4 mb-4 justify-content-center'>
                        <Button className="button" onClick={verificarCredenciais} type="submit">Entrar</Button>
                    </div>
                </Form>
                </div>
                
            </Pagina>
        </div>
    )
}