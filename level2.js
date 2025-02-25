// level2.js

// Utility function to generate a random number within a range
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Function to display apples in a given container
  function displayApples(containerId, count) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous apples
    for (let i = 0; i < count; i++) {
      const apple = document.createElement('img');
      apple.src = '/assets/apple.png';
      apple.width = 40;
      apple.height = 40;
      apple.alt = 'Apple Image';
      container.appendChild(apple);
    }
  }
  
  // Function to remove apples from #myapplebasket
  function removeApplesFromBasket(count) {
    const myAppleBasket = document.getElementById('myapplebasket');
    const apples = myAppleBasket.querySelectorAll('img'); // Get all apple images
    for (let i = 0; i < count; i++) {
      if (apples[i]) {
        apples[i].remove(); // Remove one apple image at a time
      }
    }
  }
  
  // Function to reset the game
  function startGame() {
    // Step 1: Remove any images of apples from #applestakenbasket
    document.getElementById('applestakenbasket').innerHTML = '';
  
    // Step 2: Ensure the class 'text-white' exists in #papi and remove from #celine
    //document.getElementById('papi').classList.add('text-white');
    document.getElementById('papisbox').classList.add('hidden');
    document.getElementById('celine').classList.remove('text-white');
  
    // Step 3: Ensure #question is hidden (with class 'hidden')
    document.getElementById('question').classList.add('hidden');
  
    // Step 4: Generate a random number between 7 and 15 for #myapple
    const initialApples = getRandomNumber(7, 15);
    document.getElementById('myapple').textContent = initialApples;
  
    // Display the corresponding number of apples in #myapplebasket
    displayApples('myapplebasket', initialApples);
  
    // Step 5: After 3 seconds, update the UI
    setTimeout(() => {
      // Remove the class 'text-white' from #papi and add it to #celine
      //document.getElementById('papi').classList.remove('text-white');
      document.getElementById('papisbox').classList.remove('hidden');
      document.getElementById('celine').classList.add('text-white');
  
      // Generate a random number NOT bigger than the initial number
      const applesTaken = getRandomNumber(1, Math.floor(initialApples / 2));
      document.getElementById('applestaken').textContent = applesTaken;
  
      // Display the corresponding number of apples in #applestakenbasket
      displayApples('applestakenbasket', applesTaken);
  
      // Remove the same number of apples from #myapplebasket
      removeApplesFromBasket(applesTaken);
  
      
    }, 3000);

    
  setTimeout(() => {
    document.getElementById('papisbox').classList.add('hidden');
    // Step 6: Display the #question by removing the .hidden class
    document.getElementById('question').classList.remove('hidden');
  },6000);
  
  }



  
  // Event listener for the submit button
  document.getElementById('submitButton').addEventListener('click', () => {
    // Get the user's answer and convert it to a number
    const userAnswer = parseInt(document.getElementById('answerbox').value, 10);
  
    // Calculate the correct answer
    const initialApples = parseInt(document.getElementById('myapple').textContent, 10);
    const applesTaken = parseInt(document.getElementById('applestaken').textContent, 10);
    const correctAnswer = initialApples - applesTaken;
  
    // Check if the user's answer matches the correct answer
    if (userAnswer === correctAnswer) {
      // Show the correct notification box
      document.getElementById('notificationBoxCorrect').classList.remove('hidden');
      document.getElementById('notificationBoxWrong').classList.add('hidden');
  
      // Display the "Try Again" button
      const tryAgainButton = document.createElement('button');
      tryAgainButton.textContent = 'Try Again';
      tryAgainButton.classList.add('btn', 'btn-primary', 'mt-3');
      tryAgainButton.addEventListener('click', () => {
        // Reset the game when "Try Again" is clicked
        document.getElementById('notificationBoxCorrect').classList.add('hidden');
        document.getElementById('answerbox').value = ''; // Clear the input field
        startGame();
      });
  
      // Append the "Try Again" button to the notification box
      document.getElementById('notificationBoxCorrect').appendChild(tryAgainButton);
    } else {
      // Show the wrong notification box
      document.getElementById('notificationBoxWrong').classList.remove('hidden');
      document.getElementById('notificationBoxCorrect').classList.add('hidden');
    }
  });
  
  // Start the game on page load
  startGame();