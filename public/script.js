// Define the API endpoint
const apiUrl = 'http://127.0.0.1:8080/api/v1/snip/CSulB9CN'

// Function to fetch data from the API
async function fetchData() {
  try {
    // Fetch data from the API
    const response = await fetch(apiUrl);

    // Check if the response is okay (status code 200-299)
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    // Parse the JSON data
    const data = await response.json();

    update(data);
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }

}

function update(data) {
  const cb = document.getElementById('code-block');

  cb.innerHTML += '\n' + data.content;
}


document.getElementById('form').addEventListener('submit', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  const cb = document.getElementById('code-block');
  fetchData();
});
