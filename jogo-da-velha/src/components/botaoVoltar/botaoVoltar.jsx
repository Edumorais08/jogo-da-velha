import "../../components/botaoVoltar/botaoVoltar.css"
import { Link } from "react-router-dom"
import PropTypes from "prop-types";

function  VoltarButton(props){
    return(
        <Link to={props.link}>
            <button className="voltar-button" >{props.content}</button>
        </Link> 
    );
}

VoltarButton.propTypes = {
    link: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};


export default VoltarButton
