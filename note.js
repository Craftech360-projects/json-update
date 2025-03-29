
// app.post('/submit', (req, res) => {
//   try {
//     const { name, prompt_selection, language, custom_prompt, custom_action } = req.body;

//     // Construct the start_text based on the name
//     const start_text = `Hiya, little buddy! I’m ${name}, the `;

//     // Determine the prompt text
//     let promptText = "";
//     switch (prompt_selection) {
//       case "puzzle_solver":
//         promptText = "super-duper puzzle solver!";
//         break;
//       case "story_teller":
//         promptText = "amazing story teller!";
//         break;
//       case "joke_teller":
//         promptText = "hilarious joke teller!";
//         break;
//         case "custom":
//           promptText = custom_prompt || "custom prompt writer!";
//           break;
//         default:
//           promptText = "unknown!";
//     }

//     let fullStartText = "";
//     switch (prompt_selection) {
//       case "puzzle_solver":
//         fullStartText = `Hiya, little buddy! I’m ${name}, the ${promptText}! I love helping my friends and finding happy ways to fix puzzle solver things.`;
//         break;
//       case "story_teller":
//         fullStartText = `Hiya, little buddy! I’m ${name}, the ${promptText}! I love helping my friends and finding happy ways to tell stories.`;
//         break;
//       case "joke_teller":
//         fullStartText = `Hiya, little buddy! I’m ${name}, the ${promptText}! I love helping my friends and finding happy ways to tell jokes.`;
//         break;
//         case "custom":
//           fullStartText = `Hiya, little buddy! I’m ${name}, the ${custom_prompt}! I love helping my friends and finding happy ways to ${custom_action}.`;
//           break;
//         default:
//           fullStartText = `Hiya, little buddy! I'm ${name}, the ${promptText}! I love helping my friends and finding happy ways to help.`;
//           break;
//     }

//     const languageText = language ? ` in ${language}.` : ".";
//     const fullPrompt = prompt_selection === 'custom' 
//     ? `You are ${name}, a kind and clever toy. A child asks you about ${custom_prompt}. Respond to questions or requests${languageText} Reply in the respective language with a fun and engaging style.`
//     : `You are ${name}, a kind and clever toy. A child asks you ${promptText} questions${languageText} Reply in a fun and engaging style.`;
//     const mainPromptOptions = fullPrompt;


// // Replace the existing merge logic with this:

// let rawData = "{}";
// try {
//   rawData = fs.readFileSync(inputsFile);
// } catch (error) {
//   console.log("Error reading file, creating new one");
// }
// let inputs = JSON.parse(rawData);

// const newInput = {
//   start_text: fullStartText,
//   prompt: mainPromptOptions
// };

// // Update logic to replace last entry
// let updatedInputs = { ...inputs };
// if (Object.keys(inputs).length === 0) {
//   updatedInputs = { 1: newInput };
// } else {
//   // Get the last key
//   const lastKey = Math.max(...Object.keys(inputs).map(Number));
//   // Replace the last entry
//   updatedInputs[lastKey] = newInput;
// }


// // Write updated data back to file
// fs.writeFileSync(inputsFile, JSON.stringify(updatedInputs, null, 2));

  
//     res.redirect('/?success=true&message=Input+saved+successfully');
//   } catch (error) {
//     console.error('Error saving input:', error);

//     res.redirect(`/?success=false&message=${encodeURIComponent('Error saving input: ' + error.message)}`);
//   }
  
// });
