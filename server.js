const express = require('express');
const path = require('path');
const usersFilePath = path.join(__dirname, 'users.json'); 
const app = express();
const PORT = 3000;

const bodyParser = require('body-parser');
const fs = require('fs');
// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, '/')));

// Route for main view
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view.html'));
});

// Register route
app.post('/register', (req, res) => {
    const { email, password } = req.body;
  
    // Read existing users
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
      let users = [];
      if (!err && data) {
        users = JSON.parse(data);
      }
  
      // Check if user already exists
      const existingUser = users.find(user => user.email === email);
      if (existingUser) {
        return res.send('Email already registered.');
      }
  
      users.push({ email, password });
  
      // Save updated users list
      fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), err => {
        if (err) {
          return res.send('Error saving user.');
        }
        res.send('Registration successful!');
      });
    });
  });
  
  // Login route
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
      if (err) {
        return res.send('Error reading users.');
      }
  
      const users = JSON.parse(data);
      const foundUser = users.find(user => user.email === email && user.password === password);
  
      if (foundUser) {
        res.send('Login successful!');
      } else {
        res.send('Invalid email or password.');
      }
    });
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

