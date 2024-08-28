document.addEventListener('DOMContentLoaded', () => {
    // Step 1: Set up symbols and cards
    const symbols = ["🍎", "🍌", "🍇", "🍉", "🍒", "🍑", "🍍", "🍓"];
    const gameBoard = document.querySelector('.game-board');
    let flippedCards = [];
    let cardElements = [];

    // Duplicate symbols to create pairs and shuffle them
    const cardSymbols = shuffle([...symbols, ...symbols]);

    // Step 2: Create cards and add event listeners
    cardSymbols.forEach(symbol => {
        const card = createCard(symbol);
        gameBoard.appendChild(card);
        cardElements.push(card);
    });

    // Add event listener to flip cards
    cardElements.forEach(card => {
        card.addEventListener('click', () => {
            if (flippedCards.length < 2 && !card.classList.contains('show-symbol')) {
                flipCard(card);
            }
        });
    });

    // Step 1: Create a card element
    function createCard(symbol) {
        const card = document.createElement('div');
        card.classList.add('card', 'hide-symbol');
        card.textContent = symbol; // Add the symbol to the card
        return card;
    }

    // Step 1: Shuffle array function
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Step 1: Flip card function
    function flipCard(card) {
        card.classList.remove('hide-symbol');
        card.classList.add('show-symbol');
        flippedCards.push(card);

        // Step 3: Check for match when two cards are flipped
        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    // Step 3: Check if two flipped cards match
    function checkForMatch() {
        const [card1, card2] = flippedCards;

        if (card1.textContent === card2.textContent) {
            // Cards match, leave them flipped
            flippedCards = [];
        } else {
            // Cards don't match, flip them back after a delay
            setTimeout(() => {
                card1.classList.remove('show-symbol');
                card1.classList.add('hide-symbol');
                card2.classList.remove('show-symbol');
                card2.classList.add('hide-symbol');
                flippedCards = [];
            }, 1000);
        }
    }
});

