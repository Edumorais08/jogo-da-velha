import {useEffect, useState} from 'react';
import './Bot.css';
import VoltarButton from "../../components/botaoVoltar/botaoVoltar";
import ReiniciarButton from '../../components/botaoReiniciar/botaoReiniciar';

function Bot() {

  const emptyBoard = Array(9).fill(""); //cria um array com 9 posições vazias
  const [board, setBoard] = useState(emptyBoard); //cria um estado para o board
  const [currentPlayer, setCurrentPlayer] = useState('X'); //cria um estado para o jogador atual
  const [winner, setWinner] = useState(null); //cria um estado para o ganhador
  const [winsX, setWinsX] = useState(0);
  const [winsO,setWinsO] = useState(0);

  const handleCellClick = (index) => {
    if (winner || currentPlayer === 'O' || board[index] !== "") {
      // Se houver um vencedor, ou for a vez do bot ('O'), ou a célula já estiver preenchida, não permite a jogada
      return;
    }
  
    let newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer('O'); // Troca para o bot após a jogada do jogador
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
    newBoard[botIndex] = 'O';
    setBoard(newBoard);
    setCurrentPlayer('X');
  };

  useEffect(() => {
    checkWinner();
    
    if (!winner && currentPlayer === 'O') {
      const botTimeout = setTimeout(botPlay, 500); // bot joga apenas se não houver vencedor
      return () => clearTimeout(botTimeout); // Limpa o timeout se o componente desmontar
    }
  }, [board, winner]); // 'winner' como dependência

  const checkWinner = () => {
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
      if (cells.every((item) => item === 'X')) {
        setWinner('X');
        return;
      }
      if (cells.every((item) => item === 'O')) {
        setWinner('O');
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
    if (winner === 'X') setWinsX(winsX + 1); // adiciona um ao numero de vitorias do X
    if (winner === 'O') setWinsO(winsO + 1); // adiciona um ao numero de vitorias do O
  }, [winner]);

  const resetGame = () => {  //função para recomeçar o jogo
    setCurrentPlayer('X');   //reinicia o jogo com o jogador X começando
    setBoard(emptyBoard);
    setWinner(null);
  }

  const resetScore = () => {
    setWinsX(0);
    setWinsO(0);
    resetGame();
  }

  const [nomeP1, setNomeP1] = useState('');

    useEffect(() => {
        // Recupera o valor de 'client' do localStorage
        const savedNomeP1 = JSON.parse(localStorage.getItem('client'));
        if (savedNomeP1) {
            setNomeP1(savedNomeP1[savedNomeP1.length - 1]); // Obtém o último nome salvo
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
            <h2 className='winner-message'> 
              <span className={winner}>Empate!</span>
            </h2>
          :
            <h2 className='winner-message'> 
              <span className={winner}>{winner} </span> ganhou!
            </h2>
          }

          <button className='nova-partida' onClick={resetGame}>Nova Partida!</button>
        </footer>
      }
  
    </main>
  );
}export default Bot;
