import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'
import HallOfFame, { FAKE_HOF } from './HallOfFame'
import './App.css'
import Card from './Card'
import GuessCount from './GuessCount'

// affiche le nombre de cartes par lignes
const SIDE = 6

//Symbols du jeu
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'

//laisser un temps pour visualiser des paire inccorectes
const VISUAL_PAUSE_MSECS = 750

class App extends Component {


  //on défini l'eat local avec les différentes variable
  state = {
    //generer des cartes
    cards: this.generateCards(),
//compter le nombre de paires
    currentPair: [],
    //nombre d'essais
    guesses: 0,
    // nombre de paire réaliser 
    matchedCardIndices: [],
  }

//on mets à jour le jeu en fonction des paires retrouver avec cette fonction en utilisant setstate
  handleNewPairClosedBy(index) {
    const { cards, currentPair, guesses, matchedCardIndices } = this.state
   //remet la paire à zero si incorecte
    const newPair = [currentPair[0], index]
    //compte le nombre de tentative
    const newGuesses = guesses + 1
    //constante qui va compter le nombre de paire correct
    const matched = cards[newPair[0]] === cards[newPair[1]]

    this.setState({ currentPair: newPair, guesses: newGuesses })
    //si une paire est bonnes :
    if (matched) {
      //on modifie les données de l'état local avec le tableau suivant
      this.setState({ matchedCardIndices: [...matchedCardIndices, ...newPair] })
    }
    setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS)
   }






//permet de cachez et d'afficher les cartes
  getFeedbackForCard(index) {
    //on utilise l'état local avec les props suivantes 
    const { currentPair, matchedCardIndices } = this.state
   
    const indexMatched = matchedCardIndices.includes(index)
  
    if (currentPair.length < 2) {
      return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
    }
  
    if (currentPair.includes(index)) {
      return indexMatched ? 'justMatched' : 'justMismatched'
    }
  
    return indexMatched ? 'visible' : 'hidden'
  }

//on va chercher les données du jeu
  generateCards() {
    const result = []
    const size = SIDE * SIDE
    const candidates = shuffle(SYMBOLS)
    while (result.length < size) {
      const card = candidates.pop()
      result.push(card, card)
    }
    return shuffle(result)
  }

// initialisateur de champs : cette fonction permet d'affiche la carte sur laquelle on aura cliqué 
handleCardClick = index => {
  // on utilise l'état local
  const { currentPair } = this.state

  // si il ya une paire
  if (currentPair.length === 2) {
    return
  }

  //si il n'y a pas de paire , on met à jour l'ett local
  if (currentPair.length === 0) {
    //on met à jour l'état local avec setState
    this.setState({ currentPair: [index] })
    return
  }

  this.handleNewPairClosedBy(index)
}

  render() {

    // on utilise l'état local state avec this
    const { cards, guesses, matchedCardIndices } = this.state
    
    //on crée une constanstes won qui va s'applique si les deux variables suivantes sont egales
    const won = matchedCardIndices.length === cards.length
        return (
      <div className="memory">
      <GuessCount guesses={guesses} />
      {
        // permet d'appeler la fonction feedback
  cards.map((card, index) => (
    <Card
      card={card}
      feedback={this.getFeedbackForCard(index)}
      index={index}
      key={index}
      onClick={this.handleCardClick}
    />
  ))
}
    {won && <HallOfFame entries={FAKE_HOF} />}
    </div>
    )
  }
}

export default App