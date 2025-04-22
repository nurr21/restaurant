const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint
app.get('/api/data', (req, res) => {
    res.json({ message: 'Hello from the server!' });
}); 

// Home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'view.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
