 let secretNumber = Math.floor(Math.random() * 100) + 1;
    let points = 100;
    let attempts = 0;
    let guss_between = [0,100];

    const form = document.getElementById("guessForm");
    const inputField = form.querySelector("input");
    const ul = document.getElementById("command_box");
    const restartBtn = document.getElementById("restart");
    const scoreDisplay = document.getElementById("scoreDisplay");

    // Function to reset game
    function resetGame() {
      secretNumber = Math.floor(Math.random() * 100) + 1;
      points = 100;
      attempts = 0;
      guss_between = [0,100];
      ul.innerHTML = "";
      inputField.value = "";
      scoreDisplay.textContent = "Score: 100";
      restartBtn.style.display = "none";
      inputField.disabled = false;
    }

    // Validate guess
    function validateGuess(guess) {
      if (guess > secretNumber) {
        if(guess < guss_between[1]){guss_between[1] = guess;
        inputField.max = guss_between[1]}
        return `Too high! Try a smaller number than ${guess}. between <span class="SpanStyle"> ${guss_between[0]}</span> and <span class="SpanStyle">${guss_between[1]}</span>`;
      } else if (guess < secretNumber) {
        if(guess > guss_between[0]){guss_between[0] = guess;
        inputField.max = guss_between[0]}
        return `Too low! Try a bigger number than ${guess}. between <span class="SpanStyle"> ${guss_between[0]} </span> and <span class="SpanStyle"> ${guss_between[1]}</span>`;
      } else {
        return `🎉 Correct! The number was ${secretNumber}. Your final score is ${points}.`;
      }
    }

    // Form submit event
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const guess = parseInt(inputField.value);
    
      if (!guess || guess < 1 || guess > 100) {
        alert("Please enter a valid number between 1 and 100.");
        return;
      }

      attempts++;
      points -= 10;

      const message = validateGuess(guess);
      const li = document.createElement("li");
      li.innerHTML = message;
      ul.prepend(li);

      scoreDisplay.textContent = `Score: ${points}`;

      if (guess === secretNumber || attempts >= 10) {
        if (guess !== secretNumber) {
          const li = document.createElement("li");
          li.textContent = `😞 Game Over! The correct number was ${secretNumber}.`;
          ul.appendChild(li);
        }

        inputField.disabled = true;
        restartBtn.style.display = "block";
      }

      inputField.value = "";
    });

    // Restart button click
    restartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      resetGame();
    });