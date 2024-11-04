import '../../pages/home/home.css'
import ConfirmationButton from "../../components/botao/index";

function Home() {

  return (
    <>
     <section className="content-home">
        <h1 className="title">Jogo da Velha</h1>
        <div className="botoes-home">
          <ConfirmationButton link="/OnePlayer" content="Um Jogador"/>
          <ConfirmationButton link="/TwoPlayers" content="Dois jogadores"/>
        </div>
      </section>
    </>
  )
}

export default Home
