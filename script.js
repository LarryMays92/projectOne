let userHand , cpuHand

const cpuCardSlot = document.querySelector(".cpu-card-slot")
const userCardSlot = document.querySelector(".user-card-slot")
const cpuHandElement = document.querySelector(".cpu-hand")
const userHandElement = document.querySelector(".user-hand")
const text = document.querySelector(".text")


const SUITS = ['♦', '♥', '♣', '♠']
const VALUES = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"]

const cleanDeck = () => {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return new Card(suit, value)
        })
    })
}


class Deck {
    constructor(cards = cleanDeck()) {
        this.cards = cards
    
    }

    // getter for the number of cards it is  
    get numberOfCards() {
        return this.cards.length
    } 

    shuffle () {
        for (let i = this.numberOfCards -1; i > 0; i--) {
            const newIndex = Math.floor(Math.random() * (i + 1))
            const oldValue = this.cards[newIndex]
            this.cards[newIndex] = this.cards[i]
            this.cards[i] = oldValue
    //////////////////////////////////////////////////////////
            //random card thats unused switched with new card for a shuffle at random

            // deck.shuffle()
            // console.log(deck.cards)
        }
    } 

    //call pop to remove and add cards 
    popCard = function () {
        return this.cards.shift()
    }

    pushCard = function (card) {
        this.cards.push(card)
    }

    // function for the deck to shuffle randomly 
    ///////////////////////////////////////////////////////////
    
}

//function to create the cards with suit and value
class Card {
    constructor(suit, value) {
        this.suit = suit
        this.value = value
    }

get color() {
    return this.suit === '♣' || this.suit === '♠' ? 'black' : 'red'
}
getHTML = () => {
    const cardDiv = document.createElement('div')
    cardDiv.innerText = this.suit
    cardDiv.classList.add('card', this.color)
    cardDiv.dataset.value = `${this.value} ${this.suit}`
    return cardDiv
    //console.log(this.suit)
    }
}




// // MAKE THE CARDS USING ARRAYS TO GROUP EM at first i made 52 card what a waste of time 
let stop
let duringTurn = false 

const RANKS = {
"2": 2, 
"3": 3, 
"4": 4, 
"5": 5, 
"6": 6, 
"7": 7, 
"8": 8, 
"9": 9, 
"10": 10, 
J: 11, 
Q: 12, 
K: 13, 
A: 14}

// function to create the deck each deck has 52 cards
// loop through the two arrays to get a card and those cards will create the Deck so 
// defines the deck and what it will consists of whether its a players hand or all the cards 7 shuffle the cards with cards not yet used yet 

const cardsLeft = () => {
    userHandElement.innerText = userHand.numberOfCards
    cpuHandElement.innerText = cpuHand.numberOfCards
}

const roundSweep = () => {
    duringTurn = false
    cpuCardSlot.innerText = "" 
    userCardSlot.innerText = ""
    text.innerText = ""
}

const bookWinner = (cardOne, cardTwo) => {
    return RANKS[cardOne.value] > RANKS[cardTwo.value]
}

const isEndOfGame = (deck) => {
    return deck.numberOfCards === 0
}


document.addEventListener('click', function(event) {
    if (stop) {
        letsPlay()
        return 
    }
    if (duringTurn) {
            roundSweep()
        } else {
            flipCardsOver()
        }
    
    })


const letsPlay = () => {
    const newDeal = new Deck()
// console.log(newDeal.cards)
// this works we have 52 cards in a deck but we have to have them shuffle 
    newDeal.shuffle()
    
    const newDealMidpoint = Math.ceil(newDeal.numberOfCards / 2)
    
    userHand = new Deck(newDeal.cards.slice(0, newDealMidpoint))
    cpuHand = new Deck(newDeal.cards.slice(newDealMidpoint, newDeal.numberOfCards))
duringTurn = false
stop = false
// moved down here because it was above the call before **
// letsPlay()
// moved these two into to start game so they are there at the beginning
}

letsPlay()


const flipCardsOver = () => {
    duringTurn = true
    
    const userCard = userHand.popCard()
    const cpuCard = cpuHand.popCard()

    userCardSlot.appendChild(userCard.getHTML())
    cpuCardSlot.appendChild(cpuCard.getHTML())
    
    cardsLeft()
////////////////////////////////////////////////////////////

// console.log(cpuHand) // this works ! got 26 cards no longer in order and when refresh got a different set of cards at random
// console.log(userHand) // works got cards now, 52 of them, two hands 26 a piece coming out random after refresh..
///////each round has to clear out the previous and we gotta start the game fresh


// now we have to add a button and event listener to listen to the click and then in turn take that click to show 1 card at a time from each players hand... so we also gotta hide previous cards as well ....ima start by adding a button at top of the page 
//then determine who has the higher card or number amongst the two or if it is a tie 
//then we can look at making the cards in css 

// this is the function for clearing the cards aftr your turn and counting how many cards yu have left 

    if (bookWinner(userCard, cpuCard)) {
        text.innerText = "Win"
        userHand.pushCard(userCard)
        userHand.pushCard(cpuCard)
    } else if (bookWinner(cpuCard, userCard)) {
        text.innerText = "Lose"
        cpuHand.pushCard(userCard)
        cpuHand.pushCard(cpuCard)
    } else {
        text.innerText = "WAR"
        userHand.pushCard(playerCard)
        cpuHand.pushCard(cpuCard)
    }
        // make three cards appear at random 
        //if player card greater than cpu card after three clicks' push 3 cards revealing 3rd for each player'
        //they push those cards to the winner
    if (isEndOfGame(userHand)) {
        text.innerText = "You Lose"
        stop = true
    } else if (isEndOfGame(cpuHand)) {
        text.innerText = "You Win"
        stop = true
    }
}



