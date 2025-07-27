const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const filePath = path.join(__dirname, 'students.json');

// Show login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Show signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Handle signup
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Check if user already exists
  if (users.find(user => user.username === username)) {
    return res.send('User already exists. <a href="/signup">Try again</a>');
  }

  // Add user and save
  users.push({ username, password });
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  res.redirect('/login');
});

// Handle login

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const student = users.find(user => user.username === username && user.password === password);
  if (!student) {
    return res.send('Incorrect username or password. <a href="/login">Try again</a>');
  }
  // Store username in session-like variable (for demo, not secure)
  res.redirect(`/dashboard?user=${encodeURIComponent(username)}`);
});

// Dashboard route
app.get('/dashboard', (req, res) => {
  const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const username = req.query.user || 'User';
  let studentsList = '';
  users.forEach(u => {
    studentsList += `<li>${u.username}</li>`;
  });
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dashboard</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="dashboard">
      <h2>🎓 Welcome, ${username}!</h2>
      <p class="dashboard-desc">Here you can see all registered students and manage your profile.</p>
      <div class="dashboard-actions">
        <button onclick="alert('Profile feature coming soon!')">View Profile</button>
        <button onclick="alert('Edit feature coming soon!')">Edit Details</button>
        <a href="/login"><button class="logout-btn">Logout</button></a>
      </div>
      <h3>Registered Students</h3>
      <ul id="students-list">
        ${studentsList}
      </ul>
    </div>
  </body>
  </html>
  `;
  res.send(html);
});

// Start server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
