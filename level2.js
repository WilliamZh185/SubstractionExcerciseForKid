// level2.js

// Utility function to generate a random number within a range
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Cache all DOM elements in an object for easy access
  const DOM = {
    applestakenbasket: document.getElementById('applestakenbasket'),
    papisbox: document.getElementById('papisbox'),
    celine: document.getElementById('celine'),
    question: document.getElementById('question'),
    myapple: document.getElementById('myapple'),
    myapplebasket: document.getElementById('myapplebasket'),
    applestaken: document.getElementById('applestaken'),
    notificationBoxCorrect: document.getElementById('notificationBoxCorrect'),
    notificationBoxWrong: document.getElementById('notificationBoxWrong'),
    answerbox: document.getElementById('answerbox'),
    submitButton: document.getElementById('submitButton'),
    tryAgainButton: document.getElementById('tryAgainButton'),
    questionbox: document.getElementById('questionbox')
  };
  
  // Function to display apples in a given container
  function displayApples(container, count) {
    container.innerHTML = ''; // Clear previous apples
    for (let i = 0; i < count; i++) {
      const apple = document.createElement('img');
      apple.src = './assets/apple.png';
      apple.width = 40;
      apple.height = 40;
      apple.alt = 'Apple Image';
      container.appendChild(apple);
    }
  }
  
  // Function to remove apples from #myapplebasket
  function removeApplesFromBasket(count) {
    const apples = DOM.myapplebasket.querySelectorAll('img'); // Get all apple images
    for (let i = 0; i < count; i++) {
      if (apples[i]) {
        apples[i].remove(); // Remove one apple image at a time
      }
    }
  }
  
  // Function to reset the game
  function startGame() {
    // Step 1: Remove any images of apples from #applestakenbasket
    DOM.applestakenbasket.innerHTML = '';
  
    // Step 2: Ensure the class 'text-white' exists in #papi and remove from #celine
    DOM.papisbox.classList.add('hidden');
    DOM.celine.classList.remove('text-white');
  
    // Step 3: Ensure #question is hidden (with class 'hidden')
    DOM.question.classList.add('hidden');

    // ensure try again button is hidden
    DOM.tryAgainButton.classList.add('hidden'); 
  
    // Step 4: Generate a random number between 7 and 15 for #myapple
    const initialApples = getRandomNumber(7, 15);
    DOM.myapple.textContent = initialApples;
  
    // Display the corresponding number of apples in #myapplebasket
    displayApples(DOM.myapplebasket, initialApples);
  
    // Step 5: After 3 seconds, update the UI
    setTimeout(() => {
      // Remove the class 'text-white' from #papi and add it to #celine
      DOM.papisbox.classList.remove('hidden');
      DOM.celine.classList.add('text-white');
  
      // Generate a random number NOT bigger than the initial number
      const applesTaken = getRandomNumber(1, Math.floor(initialApples / 2));
      DOM.applestaken.textContent = applesTaken;
  
      // Display the corresponding number of apples in #applestakenbasket
      displayApples(DOM.applestakenbasket, applesTaken);
  
      // Remove the same number of apples from #myapplebasket
      removeApplesFromBasket(applesTaken);
    }, 3000);
  
    // Step 6: After 6 seconds, hide #papisbox and display the question
    setTimeout(() => {
      DOM.papisbox.classList.add('hidden');
      DOM.question.classList.remove('hidden');
      DOM.questionbox.classList.remove('hidden');
    }, 6000);
  }
  
  // Event listener for the submit button
  DOM.submitButton.addEventListener('click', () => {
    // Get the user's answer and convert it to a number
    const userAnswer = parseInt(DOM.answerbox.value, 10);
  
    // Calculate the correct answer
    const initialApples = parseInt(DOM.myapple.textContent, 10);
    const applesTaken = parseInt(DOM.applestaken.textContent, 10);
    const correctAnswer = initialApples - applesTaken;
  
    // Check if the user's answer matches the correct answer
    if (userAnswer === correctAnswer) {
      // Show the correct notification box
      DOM.notificationBoxCorrect.classList.remove('hidden');
      DOM.notificationBoxWrong.classList.add('hidden');
      DOM.questionbox.classList.add('hidden');

  
      // Display the "Try Again" button
      tryAgainButton.classList.remove('hidden');
      tryAgainButton.addEventListener('click', () => {
        // Reset the game when "Try Again" is clicked
        DOM.notificationBoxCorrect.classList.add('hidden');
        DOM.answerbox.value = ''; // Clear the input field
        startGame();
      });
  
    } else {
      // Show the wrong notification box
      DOM.notificationBoxWrong.classList.remove('hidden');
      DOM.notificationBoxCorrect.classList.add('hidden');
    }
  });
  
  // Start the game on page load
  startGame();