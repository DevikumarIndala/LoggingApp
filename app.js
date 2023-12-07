const express = require('express');
const winston = require('winston');
const app = express();
const fs = require('fs');
const path = require('path');

// Function to read logs from a file (for example, 'combined.log')
const readLogsFromFile = (filePath) => {
  try {
    const logsPath = path.join(__dirname, filePath); // Assuming the log file is in the same directory
    const logs = fs.readFileSync(logsPath, 'utf8');
    return logs;
  } catch (err) {
    console.error('Error reading logs:', err);
    return 'Error reading logs.';
  }
};

// Endpoint to retrieve logs from a file ('combined.log')
app.get('/logs', (req, res) => {
  const logs = readLogsFromFile('combined.log');
  res.header('Content-Type', 'text/plain');
  res.send(logs);
});

// Create a logger instance
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp, source, requestInfo, responseData }) => {
      let log = `[${level.toUpperCase()}] -  Source: ${source}, Message: ${message}, Timestamp: ${timestamp}`;
      if (requestInfo) {
        log += `, Request: ${JSON.stringify(requestInfo)}`;
      }
      if (responseData) {
        log += `, Response: ${JSON.stringify(responseData)}`;
      }
      return log;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(__dirname, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(__dirname, 'combined.log') }),
  ],
});

// Logging middleware for requests
app.use((req, res, next) => {
  req.customData = { source: 'request',};
  const { method, url, headers, body } = req;
  const requestInfo = { method, url, headers, body };

  // Log incoming request
  logger.info('Incoming request', {
    ...req.customData,
    timestamp: new Date(),
    requestInfo,
  });

  // Override res.json to capture the response data before sending it
  const originalJson = res.json;
  res.json = function (data) {
    const responseData = data ? { ...data } : null; // Capture response data if available
    logger.info('Outgoing response', {
      ...req.customData,
      timestamp: new Date(),
      responseData,
    });
    originalJson.call(this, data);
  };

  next();
});

// Sample data for fake API
const fakeUsers = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

// Fake API endpoint to get users
app.get('/fakeapi/users', (req, res) => {
  // Simulate an API call delay (2 seconds)
  setTimeout(() => {
    res.json(fakeUsers);
  }, 2000);
});



let logs = []; // Array to store logs

// Function to save logs to a file
const saveLogsToFile = () => {
  const logsPath = path.join(__dirname, 'storedLogs.json');
  fs.writeFileSync(logsPath, JSON.stringify(logs, null, 2));
};

// Endpoint to retrieve stored logs
app.get('/storedLogs', (req, res) => {
  res.json(logs);
});

// Define a middleware function to validate required fields
const validateFields = (req, res, next) => {
  const { source, event, message } = req.body;

  if (!source || !event || !message) {
    return res.status(400).json({ error: 'Fields source, event, and message are required' });
  }

  // If all required fields exist, proceed to the next middleware/route handler
  next();
};
// Endpoint to store logs via POST request
app.post('/storeLog', express.json(), validateFields, (req, res) => {
  const { source, event, message } = req.body;
  const timestamp = new Date();

  const logEntry = { source, event, message, timestamp };
  logs.push(logEntry);
  saveLogsToFile(); // Save logs to a file
  
  
  res.status(200).json({ message: 'Log entry stored successfully' });
});
// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.message, { source: 'error_handler', timestamp: new Date() });

  res.status(err.status || 500).json({
    error: {
      message: err.message,
    },
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
