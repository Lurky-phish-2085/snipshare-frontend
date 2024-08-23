const backendApi = 'http://localhost:8080/api/v1/snip';
let retrievalId = null;

document.addEventListener('DOMContentLoaded', () => {
  retrievalId = window.userId;
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
      updateContent(data);
    })
    .catch(error => {
      updateContent(error);
    })
}

const disposableSnipWarningHTML = `
      <article id="delete-warning">
        <h2>Warning! Disposable Snip!</h2>
        <p>
          This snip is <strong>disposable</strong> and will be <strong>disposed</strong> after you read
          it. 
        </p>
        <p>Do you wish to continue?</p>
        <button id="open-snip-btn" type="submit">Open Snip</button>
      </article>
`;

const snipDisplayHTML = `
      <div id="snip-display">
        <h2>Content</h2>
        <article id="content">
          <h4>LOADING...</h4>
        </article>
      </div>
`;

const notFoundHTML = `
      <article>
        <h2>NOT FOUND</h2>
        <p>
          Snip must have been expired, disposed, or deleted by the owner.
        </p>
        <button id="create-snip-btn" type="submit">Create Snip</button>
      </article>
`;

function updateContent(snipData) {
  const main = document.getElementById('main');
  let deleteWarning = null;
  let openSnipBtn = null;

  if (snipData instanceof Error) {
    main.innerHTML = notFoundHTML;
    const createSnipBtn = document.getElementById('create-snip-btn');
    createSnipBtn.addEventListener('click', (event) => {
      window.location.href = 'http://localhost:3000'
    })
    return;
  }

  if (snipData.isDisposable) {
    main.innerHTML = disposableSnipWarningHTML;
    deleteWarning = document.getElementById('delete-warning');
    openSnipBtn = document.getElementById('open-snip-btn');

    openSnipBtn.addEventListener('click', (event) => {
      openSnipBtn.disabled = true;

      fetch(`${backendApi}/${retrievalId}`, 
        {
          method: 'DELETE'
        }
      ).then(response => {
          if (!response.status === 204) {
            throw new Error('Network response was not ok');
          }

          deleteWarning.remove();
          main.innerHTML = snipDisplayHTML;
          const content = document.getElementById('content');
          content.innerText = snipData.content;
      }).catch(error => {
          console.error(error);
      })

    })
  } else {
      main.innerHTML = snipDisplayHTML;
      const content = document.getElementById('content');
      content.innerText = snipData.content;
  }
}
