import React from 'react';
import PropTypes from 'prop-types';
import "../../components/botaoReiniciar/botaoReiniciar.css"


const ReiniciarButton = ({ onClick, content }) => {
    return (
        <button className='reiniciar-button' onClick={onClick}>{content}</button>
    );
};

ReiniciarButton.PropTypes = {
    onClick: PropTypes.func.isRequired,
    content: PropTypes.string.isRequired,
};

export default ReiniciarButton;