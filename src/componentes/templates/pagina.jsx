import Cabecalho from "./cabecalho";
import Menu from "./menu";
import Rodape from "./rodape";


export default function Pagina(props) {
    return (
        <div className="margin">
            {!props.modoEdicao && <Cabecalho texto="Recrutamento"/>}
            {!props.modoEdicao && <Menu/>}
            <div className="container">
                {props.children}
            </div>
            <Rodape/>
        </div>
    );
};