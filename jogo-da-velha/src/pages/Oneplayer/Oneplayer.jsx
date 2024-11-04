import ConfirmationButton from "../../components/botao/index";
import XOUBola from "../../components/xOUbola/xOUbola";
import "../../components/xOUbola/xOUbola.css"
import "./OnePlayer.css";

function OnePlayer(){
    return(
        <>
           <section className="content-home container-UmJogador">
                <h1 className="title">Jogo da Velha</h1>
                <input type="text" placeholder="Cadastre o P1" className="input"/>
                <div className="botoes-home xOUo">
                    <XOUBola content="X" classe="X"/>
                    <XOUBola content="O" classe="O"/>
                </div>
                <ConfirmationButton link="/jogo" content="Confirmar"/>
            </section> 
        </>
    );
}

export default OnePlayer