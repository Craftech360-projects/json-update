const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Ensure data directory exists
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Ensure inputs.json exists
const inputsFile = path.join(dataDir, 'inputs.json');
if (!fs.existsSync(inputsFile)) {
  fs.writeFileSync(inputsFile, JSON.stringify([], null, 2));
}

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Input Form' });
});

app.post('/submit', (req, res) => {
  try {
    const { start_text, prompts } = req.body;
    
    // Read existing data
    const rawData = fs.readFileSync(inputsFile);
    const inputs = JSON.parse(rawData);
    
    // Add new input data with timestamp
    const newInput = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      start_text,
      prompts
    };
    
    inputs.push(newInput);
    
    // Write updated data back to file
    fs.writeFileSync(inputsFile, JSON.stringify(inputs, null, 2));
    
    // Redirect back to form with success message
    res.render('index', { 
      title: 'Input Form',
      success: true,
      message: 'Input saved successfully!'
    });
  } catch (error) {
    console.error('Error saving input:', error);
    res.render('index', { 
      title: 'Input Form',
      success: false,
      message: 'Error saving input: ' + error.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
