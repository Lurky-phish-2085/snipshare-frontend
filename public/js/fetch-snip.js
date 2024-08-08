const backendApi = 'http://localhost:8080/api/v1/snip';

document.addEventListener('DOMContentLoaded', () => {
  const retrievalId = window.userId;
  fetchSnippet(retrievalId)
});

async function fetchSnippet(retrievalId) {
  // await new Promise(resolve => setTimeout(resolve, 250));

  fetch(`${backendApi}/${retrievalId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.json();
    })
    .then(data => {
      updateContent(data.content)
    })
    .catch(error => {
      console.error(error);
    })
}

function updateContent(contentDisplay) {
  const content = document.getElementById('content');

  content.innerText = contentDisplay;
}
