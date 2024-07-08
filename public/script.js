const outputElement = document.querySelector('.output');
const commandElement = document.querySelector('.command');

// Function to handle command execution
async function executeCommand(command) {
  try {
    const response = await fetch('/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ command })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json(); // Assuming the worker returns JSON 

    if (result.error) {
      outputElement.textContent += `Error: ${result.error}\n`;
    } else {
      outputElement.textContent += `${result}\n`; 
    }
  } catch (error) {
    console.error('Error executing command:', error);
    outputElement.textContent += `Error: ${error.message}\n`;
  }
}

// Event listener for user input
commandElement.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const command = commandElement.value.trim();
    if (command) {
      outputElement.textContent += `${command}\n`;
      commandElement.value = '';

      // Execute the command 
      executeCommand(command);
    }
  }
});

// Function to handle "astraea generate-music" command (example)
async function handleMusicGeneration() {
  // Replace this with your logic to retrieve image data from the user
  const imageData = { /* Your image data */ };

  // Send the image data to the worker for music generation
  try {
    const response = await fetch('/generate-music', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(imageData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    outputElement.textContent += `Generated Music: ${result.music}\n`;
  } catch (error) {
    console.error('Error generating music:', error);
    outputElement.textContent += `Error: ${error.message}\n`;
  }
}

// Add event listeners for other Astraea commands (e.g., "astraea help", "astraea about", etc.) 
// ... 
