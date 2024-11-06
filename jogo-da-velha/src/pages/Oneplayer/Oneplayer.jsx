import ConfirmationButton from "../../components/botao/index";
import XOUBola from "../../components/xOUbola/XOUBola";
import "../../components/xOUbola/xOUbola.css"
import "./Oneplayer.css";
import { useState, useEffect } from "react"
import VoltarButton from "../../components/botaoVoltar/botaoVoltar";


function OnePlayer(){
    const [nomeP1, setNomeP1] = useState('');
    const [saveNomeP1, setSaveNomeP1] = useState([])
    const [playerSymbol, setPlayerSymbol] = useState('');
    const [selectedSymbol, setSelectedSymbol] = useState('');

    const handleChange = (event) => {
        setNomeP1(event.target.value);
    };

    const handleSymbolChange = (symbol) => {
        setPlayerSymbol(symbol);
        setSelectedSymbol(symbol);
    };

    useEffect( () => {
        if(nomeP1.trim() !== ''){
            const newNomeP1 = [...saveNomeP1, nomeP1]
            setSaveNomeP1(newNomeP1)

            localStorage.setItem('client', JSON.stringify(newNomeP1));
            localStorage.setItem('playerSymbol', playerSymbol);
        }
    },[nomeP1, playerSymbol]);

    return(
        <>
           <section className="content-home container-UmJogador">
                <h1 className="title">Jogo da Velha</h1>
                <div className='voltar'>
                    <VoltarButton link= "/" content="Voltar"/>
                </div>
                <input type="text" placeholder="Cadastre o P1" className="input" onChange={handleChange} value={nomeP1}/>
                <div className="botoes-home xOUo">
                    <XOUBola content="X" classe="X" onClick={handleSymbolChange} isSelected={selectedSymbol === 'X'}/>
                    <XOUBola content="O" classe="O" onClick={handleSymbolChange} isSelected={selectedSymbol === 'O'}/>
                </div>
                <ConfirmationButton link="/Bot" content="Confirmar" disabled={!nomeP1 || !playerSymbol}/>
            </section> 
        </>
    );
}

export default OnePlayer