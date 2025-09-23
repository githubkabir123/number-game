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
      console.log("New Secret Number:", secretNumber); // For debugging
      points = 100;
      attempts = 0;
      guss_between = [0,100];
      inputField.min = guss_between[0];
      inputField.max = guss_between[1];
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
        inputField.min = guss_between[0]}
        return `Too low! Try a bigger number than ${guess}. between <span class="SpanStyle"> ${guss_between[0]} </span> and <span class="SpanStyle"> ${guss_between[1]}</span>`;
      } else {
        launchConfetti();
        // Call this when a player wins
        playWinningTone();

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


    // ---------- Confetti ----------
    function launchConfetti() {
      console.log("Confetti launched!");
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        confetti.style.animationDuration = 2 + Math.random() * 4 + 's';
        document.body.appendChild(confetti);

        setTimeout(() => {
          confetti.remove();
        }, 6000);
      }
    }
    // ---------- Sound Effect ----------
    // ---------- Winning Sound Effect ----------
function playWinningTone() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

  // Sequence of frequencies for a winning sound
  const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  const duration = 0.2; // seconds for each note

  frequencies.forEach((freq, index) => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'triangle'; // smoother than 'sine'
    oscillator.frequency.value = freq;

    // connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    const startTime = audioCtx.currentTime + index * duration;
    const endTime = startTime + duration;

    // Schedule start and stop
    oscillator.start(startTime);
    gainNode.gain.setValueAtTime(0.2, startTime); // volume
    gainNode.gain.exponentialRampToValueAtTime(0.0001, endTime);
    oscillator.stop(endTime);
  });
}


    // Restart button click
    restartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      resetGame();
    });