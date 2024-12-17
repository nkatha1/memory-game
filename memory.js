const icons = [
    "🍎", "🍎",
    "🍌", "🍌",
    "🍇", "🍇",
    "🍓", "🍓",
    "🍍", "🍍",
    "🍒", "🍒",
    "🥭", "🥭",
    "🍉", "🍉"
  ];
  
  const gameBoard = document.getElementById("game-board");
  const movesEl = document.getElementById("moves");
  
  let flippedCards = [];
  let matchedCards = [];
  let moves = 0;
  
  // Shuffle the icons
  function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
  }
  
  // Create cards
  function createBoard() {
    const shuffledIcons = shuffle(icons);
    shuffledIcons.forEach(icon => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.icon = icon;
      card.innerText = icon; // Show icon for a moment
      gameBoard.appendChild(card);
  
      setTimeout(() => {
        card.innerText = ""; // Hide the icon
      }, 1000);
  
      card.addEventListener("click", flipCard);
    });
  }
  
  // Flip card
  function flipCard() {
    if (this.classList.contains("flipped") || flippedCards.length >= 2) return;
  
    this.classList.add("flipped");
    this.innerText = this.dataset.icon;
    flippedCards.push(this);
  
    if (flippedCards.length === 2) {
      checkMatch();
    }
  }
  
  // Check for match
  function checkMatch() {
    moves++;
    movesEl.innerText = `Moves: ${moves}`;
  
    const [card1, card2] = flippedCards;
  
    if (card1.dataset.icon === card2.dataset.icon) {
      matchedCards.push(card1, card2);
      flippedCards = [];
      checkWin();
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card1.innerText = "";
        card2.classList.remove("flipped");
        card2.innerText = "";
        flippedCards = [];
      }, 1000);
    }
  }
  
  // Check for win
  function checkWin() {
    if (matchedCards.length === icons.length) {
      setTimeout(() => {
        alert(`You won! 🎉 Total Moves: ${moves}`);
        resetGame();
      }, 500);
    }
  }
  
  // Reset the game
  function resetGame() {
    gameBoard.innerHTML = "";
    matchedCards = [];
    flippedCards = [];
    moves = 0;
    movesEl.innerText = "Moves: 0";
    createBoard();
  }
  
  createBoard();
  