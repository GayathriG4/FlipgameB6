const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
  
document.querySelector(".score").textContent = score;
  
    // Initialize emoji pairs directly in the script
    const emojis = ["😂", "😂", "❤️", "❤️", "💕", "💕", "😁", "😁", "👍", "👍", "🙌", "🙌", "😒", "😒", "✔", "✔"];
  
    // Copy the emojis array to create pairs and shuffle
    cards = [...emojis];
    shuffleCards();
    generateCards();
  
    function shuffleCards() {
        let currentIndex = cards.length,
          randomIndex,
          temporaryValue;
        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = cards[currentIndex];
          cards[currentIndex] = cards[randomIndex];
          cards[randomIndex] = temporaryValue;
        }
      }
  
      function generateCards() {
        for (let emoji of cards) {
            const cardElement = document.createElement("div");
            cardElement.classList.add("card");
            cardElement.setAttribute("data-name", emoji);
            cardElement.innerHTML = `
              <div class="front">
                ${emoji}
              </div>
              <div class="back"></div>
            `;
            gridContainer.appendChild(cardElement);
            cardElement.addEventListener("click", flipCard);
        }
      }
  
      function flipCard() {
        if (lockBoard) return; // Prevent further clicks while board is locked
        if (this === firstCard) return; // Prevent double-clicking the same card
    
        this.classList.add("flipped");
    
        if (!firstCard) {
            // First card clicked
            firstCard = this;
            return;
        }
    
        // Second card clicked
        secondCard = this;
        lockBoard = true;
    
        checkForMatch();
    }
    
    function checkForMatch() {
        let isMatch = firstCard.dataset.name === secondCard.dataset.name;
        
        if (isMatch) {
            disableCards();
            score++; // Increment score only when there is a match
            document.querySelector(".score").textContent = score;
        } else {
            unflipCards();
        }
    }
    
    function disableCards() {
        // Disable further clicks for matched cards
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
        resetBoard();
    }
    
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }
    
    function resetBoard() {
        [firstCard, secondCard] = [null, null];
        lockBoard = false;
    }
      
      function restart() {
        resetBoard();
        shuffleCards();
        score = 0;
        document.querySelector(".score").textContent = score;
        gridContainer.innerHTML = "";
        generateCards();
      }