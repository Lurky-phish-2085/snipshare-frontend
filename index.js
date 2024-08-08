const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Set up the EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/:id', (req, res) => {

  const userId = req.params.id;

  res.render('snippet-view', { userId });
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
