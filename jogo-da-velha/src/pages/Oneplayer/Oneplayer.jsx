import ConfirmationButton from "../../components/botao/index";
import XOUBola from "../../components/xOUbola/xOUbola";
import "../../components/xOUbola/xOUbola.css"
import "./OnePlayer.css";
import { useState, useEffect } from "react"
import VoltarButton from "../../components/botaoVoltar/botaoVoltar";


function OnePlayer(){

    const [nomeP1, setNomeP1] = useState('');
    const [saveNomeP1, setSaveNomeP1] = useState([])
    const handleChange = (event) => {
        setNomeP1(event.target.value);
    };

    useEffect( () => {
        if(nomeP1.trim() !== ''){
            const newNomeP1 = [...saveNomeP1, nomeP1]
            setSaveNomeP1(newNomeP1)

            localStorage.setItem('client', JSON.stringify(newNomeP1))
        }
    },[nomeP1]);

    return(
        <>
           <section className="content-home container-UmJogador">
                <h1 className="title">Jogo da Velha</h1>
                <div className='voltar'>
                    <VoltarButton link= "/" content="Voltar"/>
                </div>
                <input type="text" placeholder="Cadastre o P1" className="input" onChange={handleChange} value={nomeP1}/>
                <div className="botoes-home xOUo">
                    <XOUBola content="X" classe="X"/>
                    <XOUBola content="O" classe="O"/>
                </div>
                <ConfirmationButton link="/Bot" content="Confirmar"/>
            </section> 
        </>
    );
}

export default OnePlayer