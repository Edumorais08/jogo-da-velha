import XOUBola from "../../components/xOUbola/XOUBola";
import ConfirmationButton from "../../components/botao";
import "./TwoPlayers.css"
import { useState, useEffect } from "react"
import VoltarButton from "../../components/botaoVoltar/botaoVoltar";



function TwoPlayers(){

    const [nomeP1, setNomeP1] = useState('');
    const [saveNomeP1, setSaveNomeP1] = useState([])
    const handleChange = (event) => {
        setNomeP1(event.target.value);
    };

    useEffect( () => {
        if(nomeP1.trim() !== ''){
            const newNomeP1 = [...saveNomeP1, nomeP1]
            setSaveNomeP1(newNomeP1)

            localStorage.setItem('client', JSON.stringify({ player1: newNomeP1, player2: saveNomeP2 }))
        }
    },[nomeP1]);

    const [nomeP2, setNomeP2] = useState('');
    const [saveNomeP2, setSaveNomeP2] = useState([])
    const handleChangeP2 = (event) => {
        setNomeP2(event.target.value);
    };

    useEffect( () => {
        if(nomeP2.trim() !== ''){
            const newNomeP2 = [...saveNomeP2, nomeP2]
            setSaveNomeP2(newNomeP2)

            localStorage.setItem('client', JSON.stringify({ player1: saveNomeP1, player2: newNomeP2 }))
        }
    },[nomeP2]);



    return(
        <>
           <section className="content-home container-UmJogador">
                <h1 className="title">Jogo da Velha</h1>
                <div className='voltar'>
                    <VoltarButton link= "/" content="Voltar"/>
                </div>
                <div className="container-TwoPlayers">
                    <div className="TwoPlayers">
                        <input type="text" placeholder="Cadastre o P1" className="input inputX" onChange={handleChange} value={nomeP1}/>
                        <XOUBola content="X" classe="X X2"/>
                    </div>
                    <div className="TwoPlayers">
                        <input type="text" placeholder="Cadastre o P2" className="input inputO" onChange={handleChangeP2} value={nomeP2}/>
                        <XOUBola content="O" classe="O O2"/>
                    </div>
                </div>
                <ConfirmationButton link="/jogo" content="Confirmar" disabled={!nomeP1 || !nomeP2}/>
            </section>  

        </>
    );
    
}

export default TwoPlayers
