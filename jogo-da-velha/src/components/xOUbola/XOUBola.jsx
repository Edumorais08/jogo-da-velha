import PropTypes from "prop-types";

function XOUBola(props){
    return(
            <button className={props.classe}>{props.content}</button>
    );
}

export default XOUBola

XOUBola.propTypes = {
    content: PropTypes.string.isRequired,
    classe: PropTypes.string.isRequired,
};