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
        throw new Error(`Snip: ${retrievalId} doesn't exist or there is a server error...`);
      }

      return response.json();
    })
    .then(data => {
      updateContent(data.content)
    })
    .catch(error => {
      updateContent(error);
    })
}

function updateContent(contentDisplay) {
  const content = document.getElementById('content');

  content.innerText = contentDisplay;
}
