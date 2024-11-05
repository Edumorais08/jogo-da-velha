import {useEffect, useState} from 'react';
import './jogo.css';
import VoltarButton from "../../components/botaoVoltar/botaoVoltar";
import ReiniciarButton from '../../components/botaoReiniciar/botaoReiniciar';
import ImagemEmpate from '../../images/ImagemEmpate.png'
import ImagemVitoria from '../../images/ImagemVitoria.png'

function Jogo() {

  const emptyBoard = Array(9).fill(""); //cria um array com 9 posições vazias
  const [board, setBoard] = useState(emptyBoard); //cria um estado para o board
  const [currentPlayer, setCurrentPlayer] = useState('X'); //cria um estado para o jogador atual
  const [winner, setWinner] = useState(null); //cria um estado para o ganhador
  const [winsX, setWinsX] = useState(0);
  const [winsO,setWinsO] = useState(0);


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
  const [nomeP2, setNomeP2] = useState('');

    useEffect(() => {
        // Recupera o valor de 'client' do localStorage
        const savedNomes = JSON.parse(localStorage.getItem('client'));
        if (savedNomes) {
            setNomeP1(savedNomes.player1[savedNomes.player1.length - 1]); 
            setNomeP2(savedNomes.player2[savedNomes.player2.length - 1]);
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
        <p>Vitórias {nomeP2}: {winsO}</p>
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
              <span>{winner === 'X' ? nomeP1 : nomeP2}</span> ganhou!
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
}export default Jogo;
