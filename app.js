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
    const { name, prompt_selection, language } = req.body;

    // Construct the start_text based on the name and language
    const start_text = `Hiya, little buddy! I’m ${name}, the `;

    // Determine the prompt based on the selection
    let promptText = "";
    let mainPromptOptions = [];
    switch (prompt_selection) {
      case "puzzle_solver":
        promptText = "super-duper puzzle solver!";
        mainPromptOptions = [
          "Solve a tricky puzzle",
          "Find a happy way to fix things",
          "Help my friends"
        ];
        break;
      case "story_teller":
        promptText = "amazing story teller!";
        mainPromptOptions = [
          "Tell a story about animals",
          "Tell a story about space",
          "Tell a story about friendship"
        ];
        break;
      case "joke_teller":
        promptText = "hilarious joke teller!";
        mainPromptOptions = [
          "Tell a joke about cats",
          "Tell a joke about dogs",
          "Tell a joke about school"
        ];
        break;
      default:
        promptText = "unknown!";
        mainPromptOptions = [];
    }

    const languageText = language === "hindi" ? " in Hindi." : ".";
    let fullStartText = "";
    
    switch (prompt_selection) {
      case "puzzle_solver":
        fullStartText = `Hiya, little buddy! I’m ${name}, the ${promptText}! I love helping my friends and finding happy ways to fix puzzle solver things${languageText}`;
        break;
      case "story_teller":
        fullStartText = `Hiya, little buddy! I’m ${name}, the ${promptText}! I love helping my friends and finding happy ways to tell stories${languageText}`;
        break;
      case "joke_teller":
        fullStartText = `Hiya, little buddy! I’m ${name}, the ${promptText}! I love helping my friends and finding happy ways to tell jokes${languageText}`;
        break;
      default:
        fullStartText = `Hiya, little buddy! I’m ${name}, the ${promptText}! I love helping my friends and finding happy ways to help${languageText}`;
        break;
    }

    // Define the single new JSON file
    const newInputsFile = path.join(dataDir, "new_inputs.json");

    // Check if the file exists
    if (!fs.existsSync(newInputsFile)) {
      // If the file doesn't exist, create it with an empty object
      fs.writeFileSync(newInputsFile, JSON.stringify({}, null, 2));
    }

    let rawData = "{}";
    try {
        rawData = fs.readFileSync(newInputsFile);
    } catch (error) {
        console.log("Error reading file, creating new one");
    }
    let inputs = JSON.parse(rawData);

    const newInput = {
      start_text: fullStartText,
      prompt: mainPromptOptions
    };

    // Merge the new input with the existing data
    const updatedInputs = Object.assign({}, inputs, newInput);

    // Write updated data back to file
    fs.writeFileSync(newInputsFile, JSON.stringify(updatedInputs, null, 2));

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
