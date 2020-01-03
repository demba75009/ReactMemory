import React from 'react'

import './Card.css'
import PropTypes from 'prop-types'

// on crée une faces caché des cartes 
const HIDDEN_SYMBOL = '❓'
//on gére l'état des cartes : faces caché ouvertes 
const Card = ({ card, feedback,index, onClick }) => (
  <div className={`card ${feedback}`} onClick={() => onClick(index)}>
      <span className="symbol">
        {feedback === 'hidden' ? HIDDEN_SYMBOL : card}
      </span>
    </div>
  )
// On exiges que les props correspondes au types reçu ex: id = number 

Card.propTypes = {
  card: PropTypes.string.isRequired,
  //tableau : oneOf
  feedback: PropTypes.oneOf([
    'hidden',
    'justMatched',
    'justMismatched',
    'visible',
  ]).isRequired,
  index: PropTypes.number.isRequired,

  onClick: PropTypes.func.isRequired,
}


export default Card