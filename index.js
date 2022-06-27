// MAKE THE CARDS USING ARRAYS TO GROUP EM at first i made 52 card what a waste of time 
const SUITS = ["♦","♥","♣","♠"]
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
let userHand, cpuHand
// define the deck and what it will consists of whether its a players hand or all the cards 
class Deck {
    constructor(cards = cleanDeck()) {
        this.cards = cards
    }

    // getter for the number of cards it is  
    get numberOfCards() {
        return this.cards.length
    } 

    // function for the deck to shuffle randomly 
    shuffle () {
        for (let i = this.numberOfCards - 1; i >0; i--) {
            const newCard = Math.floor(Math.random()* (i +1))
            const oldCard = this.cards[newCard]
            this.cards[newCard] = this.cards[i]
            this.cards[i] = oldCard
            //random card thats unused switched with new card for a shuffle at random

            // deck.shuffle()
            // console.log(deck.cards)
        }
    }
}

//function to create the cards define the card and what it will consist of 
class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }
}

// function to create the deck each deck has 52 cards
// loop through the two arrays to get a card and those cards will create the Deck so 
const cleanDeck = () => {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })
}


letsPlay()
function letsPlay() {
    const newDeal = new Deck()
// console.log(newDeal.cards)
// this works we have 52 cards in a deck but we have to have them shuffle 
//
newDeal.shuffle()
// moved down here because it was above the call before **
// moved these two into to start game so they are there at the beginning

const deckMidpoint = newDeal.numberOfCards / 2
userHand = new Deck(newDeal.cards.slice(0, deckMidpoint))
cpuHand = new Deck(newDeal.cards.slice(deckMidpoint, newDeal.numberOfCards))

console.log(cpuHand) // this works ! got 26 cards no longer in order and when refresh got a different set of cards at random
console.log(userHand) // works got cards now, 52 of them, two hands 26 a piece coming out random after refresh..
// now we have to add a button and event listener to listen to the click  
}

