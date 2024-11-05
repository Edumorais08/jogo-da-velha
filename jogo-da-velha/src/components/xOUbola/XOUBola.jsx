import PropTypes from "prop-types";

function XOUBola(props){

    const buttonClass = props.isSelected ? `${props.classe} selected` : props.classe;

    return(
            <button
             className={buttonClass}
             onClick={()=>props.onClick(props.content)}
             >{props.content}</button>
    );
}

export default XOUBola

XOUBola.propTypes = {
    content: PropTypes.string.isRequired,
    classe: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isSelected: PropTypes.bool.isRequired,
};