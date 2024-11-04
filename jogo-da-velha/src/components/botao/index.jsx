import "../../components/botao/botao.css"
import { Link } from "react-router-dom"
import PropTypes from "prop-types";

function ConfirmationButton(props){
    return(
        <Link to={props.link}>
            <button className="confirmation-button" >{props.content}</button>
            </Link> 
    );
}

ConfirmationButton.propTypes = {
    link: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};


export default ConfirmationButton
