const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import the CORS middleware
const app = express();

// Use express.json() instead of bodyParser
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '12345',
    database: 'timesheet_app',
    port: '3306'
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected to MySQL as id ' + connection.threadId);
});

// Allow cross-origin requests for all routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/employees', (req, res) => {
    connection.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            console.error('error fetching employee', err);
            res.status(500).json({ error: 'failed to fetch employees' });
            return;
        }
        res.json(results);
    });
});

app.get('/managers', (req, res) => {
    connection.query('SELECT * FROM managers', (err, results) => {
        if (err) {
            console.error('error fetching managers', err);
            res.status(500).json({ error: 'failed to fetch managers' });
            return;
        }
        res.json(results);
    });
});

app.post('/timesheet', (req, res) => {
    const { employeeId, date, hoursWorked } = req.body;
    connection.query('INSERT INTO timesheets(employee_id, date, hours_worked) VALUES (?,?,?)', [employeeId, date, hoursWorked], (err, results) => {
        if (err) {
            console.error('error submitting timesheet', err);
            res.status(500).json({ error: 'failed to submit timesheet' });
            return;
        }
        res.json({ message: 'Timesheet submitted successfully' });
    });
});

app.post('/ratings', (req, res) => {
    const { employeeId, rating } = req.body;
    connection.query('INSERT INTO ratings (employee_id,date, rating) VALUES (?,?,?)', [employeeId,date, rating], (err, results) => {
        if (err) {
            console.error('error submitting rating', err);
            res.status(500).json({ error: 'failed to submit rating' });
            return;
        }
        res.json({ message: 'Rating submitted successfully' });
    });
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

