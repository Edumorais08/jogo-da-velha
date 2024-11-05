import {useEffect, useState} from 'react';
import './jogo.css';

function Jogo() {

  const emptyBoard = Array(9).fill(""); //cria um array com 9 posições vazias
  const [board, setBoard] = useState(emptyBoard); //cria um estado para o board
  const [currentPlayer, setCurrentPlayer] = useState('X'); //cria um estado para o jogador atual
  const [winner, setWinner] = useState(null); //cria um estado para o ganhador

  const handleCellClick = (index) => {
    if (winner) { //se tiver um ganhador não pode mais jogar
      return;
    }

    if (board[index] !== "") { //se a celula está vazia pode clicar, se não não pode
      return;
    }

    let newBoard = [...board];  //cria um novo array com o board atual
    newBoard[index] = currentPlayer; //coloca o currentPlayer na posição clicada
    setBoard(newBoard); //atualiza o board

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X'); //se for X muda pra O, se for O muda pra X
  }

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

    
    possibleWaysToWin.forEach((cells) => { //verifica se tem um ganhador
      if (cells.every(item => item === 'X')) setWinner('X');
      if (cells.every(item => item === 'O')) setWinner('O');
    });

    checkDraw();
  }

  const checkDraw = () => { //verifica se deu empate
    if (board.every(item => item !== "")) { //se todas as celulas estiverem preenchidas e não tiver um ganhador é empate 
      setWinner('E');
    }
  }

  useEffect(checkWinner, [board]); // Chama checkWinner toda vez que o board mudar para verificar se tem um ganhador

  const resetGame = () => {  //função para recomeçar o jogo
    setCurrentPlayer('X');   //reinicia o jogo com o jogador X começando
    setBoard(emptyBoard);
    setWinner(null);
  }

  return (
    <main>
      <h1 className='tittle'>Jogo da Velha</h1>

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

          <button onClick={resetGame}>Recomeçar o jogo!</button>
        </footer>
      }
    </main>
  );
}export default Jogo;
