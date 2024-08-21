const resultBaseLink = 'http://localhost:3000';
const backendApi = 'http://localhost:8080/api/v1/snip';

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const content = formData.get('content');
  let title = formData.get('title');
  const altTitle = content
    .split(/\s+/)
    .slice(0, 10)
    .join(' ')
    .trim();

  title = title === "" ? altTitle : title;

  console.log(title);

  const jsonData = {
    'content': content,
    'title': title,
    'isDisposable': formData.get('disposable') === 'true',
    'expiryDate': formData.get('expiry-date'),
  };

  result.innerHTML = `
  <hgroup>
    <h1>SUBMITTING...<h1>
    <p>Please wait a moment...</p>
  </hgroup>
  `;

  setFormInteractivity(false)
  submitForm(jsonData)
});

function setFormInteractivity(isInteractive) {
  form.querySelectorAll('input, textarea, button, select')
    .forEach(element => {
      element.disabled = !isInteractive;
    })
}

async function submitForm(jsonData) {
  await new Promise(resolve => setTimeout(resolve, 250));

  fetch(backendApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return response.headers.get('Location');
    })
    .then(data => {
      const retrievalId = data.split("/").pop();
      updateResult(retrievalId);
    })
    .catch(error => {
      console.error(error);
    })
}

function updateResult(linkResult) {

  const link = `${resultBaseLink}/${linkResult}`;

  result.innerHTML = `
  <hgroup>
    <h1>DONE!</h1>
    <p>Copy and share this link to view the snippet!</p>
  </hgroup>
  <a href=${link} target="_blank" rel="noopener noreferrer">${link}</a>
  `;

  setFormInteractivity(true)
}
