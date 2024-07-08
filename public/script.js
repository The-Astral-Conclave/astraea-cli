const outputElement = document.querySelector('.output');
const commandElement = document.querySelector('.command');

commandElement.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    const command = commandElement.value.trim();
    if (command) {
      outputElement.textContent += `${command}\n`;
      commandElement.value = '';

      // Send the command to the worker
      fetch('/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ command })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); 
      })
      .then(result => {
        outputElement.textContent += `${result}\n`;
      })
      .catch(error => {
        console.error('Error executing command:', error);
        outputElement.textContent += `Error: ${error.message}\n`;
      });
    }
  }
});
