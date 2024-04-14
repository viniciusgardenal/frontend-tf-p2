import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import urlBaseCandidatos from '../utilitarios/config';
import Pagina from '../templates/pagina';

export default function FormCandidatos(props) {
    const [validado, setValidado] = useState(false);
    const [candidato, setCandidato] = useState(props.modoEdicao ? props.candidatoSelecionado : {
        cpf: '',
        nome: '',
        sobrenome: '',
        genero: '',
        dataNascimento: '',
        cep: '',
        cidade: '',
        estado: ''
    });
    async function enviarCandidatoBackend() {
        const resposta = await fetch(urlBaseCandidatos, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(candidato),
        });
        const dados = await resposta.json();
        return dados;
    }

    async function alterarCandidatoBackend() {
        const resposta = await fetch(urlBaseCandidatos, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(candidato),
        });
        try {
            const dados = await resposta.json();
            return dados;
        } catch (erro) {
            console.error('A resposta não é um JSON válido:', resposta);
        }
    }

    function manipularMudanca(evento) {
        const { name, value } = evento.target;
        setCandidato({ ...candidato, [name]: value });
    }

    async function manipularSubmissao(evento) {
        evento.preventDefault();
        evento.stopPropagation();
        const form = evento.currentTarget;

        if (form.checkValidity() === false) {
            setValidado(true);
            return;
        }

        if (!props.modoEdicao) {
            try {
              const dados = await enviarCandidatoBackend();
              if (dados && dados.status) {

                props.setListaDeCandidatos(prevLista => [...prevLista, candidato]);
                props.setExibirTabela(true);
              }
              if (dados) {
                alert(dados.mensagem);
              }
            } catch (erro) {
              alert('Não foi possível conectar ao Backend. Erro:' + erro.message);
            }
          } else {
            try {
              const dados = await alterarCandidatoBackend();
              if (dados) {
                alert(dados.mensagem);
                if (dados.status) {
                  const posicao = props.listaDeCandidatos.findIndex(item => item.cpf === props.candidatoSelecionado.cpf);
                  const novaLista = [...props.listaDeCandidatos];
                  novaLista[posicao] = candidato;
                  props.setListaDeCandidatos(novaLista);
                  props.setExibirTabela(true);
                }
              }
            } catch (erro) {
              alert('Não foi possível conectar ao Backend. Erro:' + erro.message);
            }
          }
    }


    return (
        <Pagina modoEdicao={props.modoEdicao}>

            <h2 className="text-color mt-5 text-center">Cadastre-se</h2>
            <Form className='container col-8 bg-form pt-5 px-5 pb-5 mb-5' noValidate validated={validado} onSubmit={manipularSubmissao}>
                <Row className="">
                    <Form.Group className='mt-4' as={Col} md="6">
                        <Form.Label>Primeiro Nome:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder=""
                            id='nome'
                            name='nome'
                            value={candidato.nome}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type='invalid'>Preencha a informação.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-4' as={Col} md="6">
                        <Form.Label>Sobrenome:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder=""
                            id='sobrenome'
                            name='sobrenome'
                            value={candidato.sobrenome}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type='invalid'>Preencha a informação.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-4' as={Col} md="4">
                        <Form.Label>Gênero:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Gênero"
                            id='genero'
                            name='genero'
                            value={candidato.genero}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type='invalid'>Preencha a informação.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-4' as={Col} md="4">
                        <Form.Label>CPF:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="XXX.XXX.XXX-XX"
                            id='cpf'
                            name='cpf'
                            maxlength='11'
                            value={candidato.cpf}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type='invalid'>Preencha a informação.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-4' as={Col} md="4">
                        <Form.Label>Data de Nascimento:</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            placeholder=""
                            id='dataNascimento'
                            name='dataNascimento'
                            value={candidato.dataNascimento}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type='invalid'>Preencha a informação.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-4' as={Col} md="4" >
                        <Form.Label>CEP:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="CEP"
                            id='cep'
                            name='cep'
                            value={candidato.cep}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type='invalid'>Preencha a informação!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-4' as={Col} md="4">
                        <Form.Label>Cidade:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Cidade"
                            id='cidade'
                            name='cidade'
                            value={candidato.cidade}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type='invalid'>Preencha a informação!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-4' as={Col} md="4">
                        <Form.Label>Estado:</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Estado"
                            id='estado'
                            name='estado'
                            value={candidato.estado}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type='invalid'>Preencha a informação!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-4' as={Col} md="6">
                        <Form.Label>E-mail:</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="email@email.com"
                            id='email'
                            name='email'
                            value={candidato.email}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type='invalid'>Preencha a informação!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className='mt-4' as={Col} md="6">
                        <Form.Label>Confirme seu e-mail:</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="email@email.com"
                            id='confirmeEmail'
                            name='confirmeEmail'
                            value={candidato.confirmeEmail}
                            onChange={manipularMudanca}
                        />
                        <Form.Control.Feedback type='invalid'>Preencha a informação!</Form.Control.Feedback>
                    </Form.Group>

                </Row>

                <div className='d-flex mt-4 justify-content-around'>
                    <Button className="btn-success" type="submit">{props.modoEdicao ? "Salvar edição" : "Candidatar-se"}</Button>
                    <Button onClick={() => {
                        props.setModoEdicao(false);
                        props.setExibirTabela(true);
                    }}>Voltar</Button>
                </div>

            </Form>
        </Pagina>

    );
}