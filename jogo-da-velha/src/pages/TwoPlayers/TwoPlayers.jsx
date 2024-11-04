import XOUBola from "../../components/xOUbola/xOUbola";
import ConfirmationButton from "../../components/botao";
import "./TwoPlayers.css"


function TwoPlayers(){
    return(
        <>
           <section className="content-home container-UmJogador">
                <h1 className="title">Jogo da Velha</h1>
                <div className="container-TwoPlayers">
                    <div className="TwoPlayers">
                        <input type="text" placeholder="Cadastre o P1" className="input inputX"/>
                        <XOUBola content="X" classe="X X2"/>
                    </div>
                    <div className="TwoPlayers">
                        <input type="text" placeholder="Cadastre o P2" className="input inputO"/>
                        <XOUBola content="O" classe="O O2"/>
                    </div>
                </div>
                <ConfirmationButton link="/jogo" content="Confirmar"/>
            </section>  

        </>
    );
}

export default TwoPlayers