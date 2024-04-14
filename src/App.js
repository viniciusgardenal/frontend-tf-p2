import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import contextoCandidato from "./componentes/contextos/contextoCandidato";
import TelaCadastroLogin from "./componentes/telas/telaCadastroLogin";
import TelaCadastroCandidatos from "./componentes/telas/telaCadastroCandidatos";
import TelaVagas from "./componentes/telas/telaVagas";
import TabelaCandidatos from './componentes/tabelas/TabelaCandidatos';
import FormCandidatos from './componentes/formularios/formularioCandidatos';

function App() {
  const [candidato, setCandidato] = useState({
    nome: '',
    logado: false
  });

  if (!candidato.logado) {
    return (
      <contextoCandidato.Provider value={[candidato, setCandidato]}>
        <TelaCadastroLogin />
      </contextoCandidato.Provider>
    );
  }
  else {
    return (
      <div className='App'>
        <contextoCandidato.Provider value={[candidato, setCandidato]}>
            <BrowserRouter>
              <Routes>
                <Route path="/cadastrocandidatos" element={<FormCandidatos />} />
                <Route path="/tabela" element={<TabelaCandidatos />} />
                <Route path="/cadastro" element={<TelaCadastroLogin />} />
                <Route path="/candidatos" element={<TelaCadastroCandidatos />} />
                <Route path="/" element={<TelaVagas/>} />
  
              </Routes>
            </BrowserRouter>
        </contextoCandidato.Provider>
      </div>
    );
  }
}

export default App;
