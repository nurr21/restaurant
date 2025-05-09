import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const usersFilePath = path.join(__dirname, 'users.json');
const app = express();
const port = 4001;
app.use(express.json())
app.use(cors());


// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, '/')));

let reservations = [];

app.get('/reservations' , (req,res) => {
    return res.json(reservations)
});

app.post('/reservations', (req, res) => {
    const { day, month, hour, numOfGuests } = req.body;
    console.log("Incoming reservation:", { day, month, hour, numOfGuests });

    if (!day || !hour || !numOfGuests || !month) {
        return res.status(400).json({ message: "Missing required fields: day or hour." });
    }

    const newReservation = {
        id: reservations.length + 1,
        day: day,
        month: month,
        hour: hour,
        numOfGuests: numOfGuests
    };

    reservations.push(newReservation);
    res.status(201).json(newReservation);
});

// Route for main view
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'register.html'));
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
        res.redirect('/restaurantMain.html');
        //res.json({ message: 'Registration successful!' }); 
      });
    });
  });
  
  // Login route
  app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    fs.readFile(usersFilePath, 'utf8', (err, data) => {
      if (err) {
        return res.json({ message: 'error reading users' }); 
      }
  
      const users = JSON.parse(data);
      const foundUser = users.find(user => user.email === email && user.password === password);
  
      if (foundUser) {
        res.redirect('/restaurantMain.html');
        //res.json({ message: 'Loged in successfully!' }); 
      } else {
        return res.json({ message: 'Invalid email or password' });
      }
    });
  });

  app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
});