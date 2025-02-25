// Initialize the basket with 10 apples
let apples = 10;
const basket = document.getElementById("basket");
const feedback = document.getElementById("feedback");

// Function to render apples in the basket
// Function to render apples in the basket
function renderApples() {
    basket.innerHTML = ""; // Clear the basket
    for (let i = 0; i < apples; i++) {
      // Create a container for each apple and its number
      const appleContainer = document.createElement("div");
      appleContainer.classList.add("apple-container");
  
      // Create the number label
      const numberLabel = document.createElement("div");
      numberLabel.classList.add("number-label");
      numberLabel.textContent = i + 1; // Numbers start from 1
  
      // Create the apple
      const apple = document.createElement("div");
      apple.classList.add("apple");
  
      // Append the number and apple to the container
      appleContainer.appendChild(numberLabel);
      appleContainer.appendChild(apple);
  
      // Append the container to the basket
      basket.appendChild(appleContainer);
    }
  }

// Function to handle the subtraction
function handleSubtraction() {
  const input = document.getElementById("input-number");
  const taken = parseInt(input.value);

  if (isNaN(taken) || taken < 1 || taken > 10) {
    feedback.textContent = "Please enter a number between 1 and 10.";
    return;
  }

  const remaining = apples - taken;

  if (remaining >= 0) {
    apples = remaining;
    renderApples();
    feedback.textContent = `Correct! There are ${apples} apples left.`;
  } else {
    feedback.textContent = "Oops! You can't take more than what's in the basket. Try again!";
  }

  input.value = ""; // Clear the input field
}

// Render initial apples
renderApples();

// Add event listener to the submit button
document.getElementById("submit-btn").addEventListener("click", handleSubtraction);

// Add event listener to the "Go to Level 2" button
document.getElementById("next-level-btn").addEventListener("click", () => {
    window.location.href = "level2.html";
  });