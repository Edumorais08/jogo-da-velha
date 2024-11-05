import {useEffect, useState} from 'react';
import './Bot.css';
import VoltarButton from "../../components/botaoVoltar/botaoVoltar";
import ReiniciarButton from '../../components/botaoReiniciar/botaoReiniciar';
import ImagemEmpate from '../../images/ImagemEmpate.png'
import ImagemVitoria from '../../images/ImagemVitoria.png'


function Bot() {

  const emptyBoard = Array(9).fill(""); //cria um array com 9 posições vazias
  const [board, setBoard] = useState(emptyBoard); //cria um estado para o board
  const [currentPlayer, setCurrentPlayer] = useState('X'); //cria um estado para o jogador atual
  const [winner, setWinner] = useState(null); //cria um estado para o ganhador
  const [winsX, setWinsX] = useState(0);
  const [winsO,setWinsO] = useState(0);
  const playerSymbol = localStorage.getItem('playerSymbol') || 'X'; // Símbolo do jogador
  const botSymbol = playerSymbol === 'X' ? 'O' : 'X'; // Símbolo do bot é o oposto
  

  useEffect(() => {
    const savedNomeP1 = JSON.parse(localStorage.getItem('client'));
    if (savedNomeP1) {
      setNomeP1(savedNomeP1[savedNomeP1.length - 1]);
    }
    setCurrentPlayer(playerSymbol);
  }, []);

  const handleCellClick = (index) => {
    if (winner || currentPlayer === botSymbol || board[index] !== "") return;
    
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(botSymbol);
  };

  function botMove(board) {  //função para o bot jogar
    const availableCells = board
      .map((cell, index) => (cell === "" ? index : null))
      .filter(index => index !== null);
  
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    return availableCells[randomIndex];
  }

  const botPlay = () => {
    const botIndex = botMove(board);
    const newBoard = [...board];
    newBoard[botIndex] = botSymbol;
    setBoard(newBoard);
    setCurrentPlayer(playerSymbol);
  };

  useEffect(() => {
    checkWinner(nomeP1);
    
    if (!winner && currentPlayer === botSymbol) {
      const botTimeout = setTimeout(botPlay, 500);
      return () => clearTimeout(botTimeout);
    }
  }, [board, winner, currentPlayer]);

  const checkWinner = (playerName) => {
    const possibleWaysToWin = [  //possibilidades de ganhar
      [board [0], board[1], board[2]], //linhas
      [board [3], board[4], board[5]], 
      [board [6], board[7], board[8]],

      [board [0], board[3], board[6]], //colunas
      [board [1], board[4], board[7]],
      [board [2], board[5], board[8]],

      [board [0], board[4], board[8]], //diagonais
      [board [2], board[4], board[6]],
    ];
    
    for (const cells of possibleWaysToWin) {
      if (cells.every((item) => item === playerSymbol)) {
        setWinner(playerName);
        return;
      }
      if (cells.every((item) => item === botSymbol)) {
        setWinner('Bot');
        return;
      }
    }
  
    // Verifica empate apenas se nenhum vencedor foi encontrado
    if (board.every((item) => item !== "")) {
      setWinner('E');
    }
  };

  useEffect(checkWinner, [board]); // Chama checkWinner toda vez que o board mudar para verificar se tem um ganhador

  //Adiciona um a cada vitoria de um dos jogadores 
  useEffect(() => {
    if (winner === nomeP1) setWinsX(winsX + 1); // adiciona um ao numero de vitorias do X
    if (winner === 'Bot') setWinsO(winsO + 1); // adiciona um ao numero de vitorias do O
  }, [winner]);

  const resetGame = () => {
    setCurrentPlayer(playerSymbol);
    setBoard(emptyBoard);
    setWinner(null);
  };

  const resetScore = () => {
    setWinsX(0);
    setWinsO(0);
    resetGame();
  }

  const [nomeP1, setNomeP1] = useState('');

    useEffect(() => {
      
        const savedNomeP1 = JSON.parse(localStorage.getItem('client'));
        if (savedNomeP1) {
            setNomeP1(savedNomeP1[savedNomeP1.length - 1]); 
        }
    }, []);

  return (
    <main>
      <h1 className='tittle'>Jogo da Velha</h1>
      <div className='voltar'>
        <VoltarButton link= "/" content="Voltar"/>
      </div>

      <div className='reiniciar'>
        <ReiniciarButton onClick={resetScore} content="Reiniciar" />
      </div>

      <div className='score'>
        <p>Vitórias {nomeP1}: {winsX}</p>
        <p>Vitórias Bot: {winsO}</p>
      </div>


        <div className={`board ${winner ? "game-over" : ""}`}> 
        {board.map((item, index) => ( 
          <div
            key={index}
            className={`cell ${item}`}
            onClick={() => handleCellClick(index)} //quando clicar na celula chama a função handleCellClick
          >
            {item}
          </div>
        ))}
        </div>

     {winner &&    //não mostar a  msg de winner desde o começo
        <footer> 
          {winner === 'E' ?  //se for empate mostra a msg de empate, se não mostra a msg de quem ganhou
            <div className='container-message'>
            <h2 className='winner-message'> 
              <span className={winner}>Empate!</span>
            </h2>
            <img className='ImagemEmpate imagem' src={ImagemEmpate} alt=""/>
            </div>
          :
          <>
            <div className='container-message'>
            <h2 className='winner-message'> 
              <span className={winner}>{winner} </span> ganhou!
            </h2>
            <img className='ImagemVitoria imagem' src={ImagemVitoria} alt=""/>
            </div>
          </>
          }

          <button className='nova-partida' onClick={resetGame}>Nova Partida!</button>
        </footer>
      }
  
    </main>
  );
}export default Bot;
