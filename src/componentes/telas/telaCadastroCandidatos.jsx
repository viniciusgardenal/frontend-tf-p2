import Pagina from "../templates/pagina";
import FormCandidatos from "../formularios/formularioCandidatos";
import TabelaCandidatos from "../tabelas/TabelaCandidatos";
import React, { useState, useEffect } from 'react';
import urlBaseCandidatos from '../utilitarios/config';


export default function TelaCadastroCandidatos(props) {
    const [exibirTabela, setExibirTabela] = useState(true);
    const [listaDeCandidatos, setListaDeCandidatos] = useState([]);
    const [candidatoSelecionado, setCandidatoSelecionado] = useState({});
    const [modoEdicao, setModoEdicao] = useState(false);

    useEffect(() => {
        fetch(urlBaseCandidatos,{method:"GET"})
        .then(resposta => resposta.json())
        .then(candidatos=> setListaDeCandidatos(candidatos));
    }, []);


    if (exibirTabela) {
        return (
            <div>
                <Pagina>
                    <h2 className="text-color mt-5 text-center">Lista de Candidatos</h2>
                    <TabelaCandidatos 
                        listaDeCandidatos={listaDeCandidatos} 
                        setExibirTabela={setExibirTabela}
                        setListaDeCandidatos={setListaDeCandidatos}
                        setCandidatoSelecionado={setCandidatoSelecionado}
                        setModoEdicao={setModoEdicao}
                    />
                </Pagina>
            </div>   
        )
    }     
    else {
        return (
            <div>
                <Pagina>
                    <h2 className="title-form mt-4">
                        <span className="h2">
                            Cadastro de Candidatos
                        </span>
                    </h2>
                    <FormCandidatos 
                        setExibirTabela={setExibirTabela}
                        listaDeCandidatos={listaDeCandidatos}
                        setListaDeCandidatos={setListaDeCandidatos}
                        candidatoSelecionado={candidatoSelecionado}
                        setModoEdicao={setModoEdicao}
                        modoEdicao={modoEdicao}
                    />
                    
                </Pagina>
            </div>
        )
    }
}