// ASCII Art (Adjusted for mobile display)
const asciiArt = `
                                            @                    @                                           
                                            @@                 @@                  @                         
                        @ @@                  =                 @                  @@                        
                   @@ @@@.@                 @ @      @@@         @                 @ @@ #@@                  
              @@   @@@@@# @@        @@      @ @     @@@ @      @ @       @         @ *@@@@   @@              
            @#   @@-@@@@@  @@@    @+@     @@  @    @@ @  @    @   @   @  @@     @+@  = @@ @@ @  @@           
          @  %@    @@@@@@  @.@   @  @     -@@ @@   @  @@  @   @  @ @ @   @ @    @ @.@ @@@@    @.  @ @        
       @@@  @  @#   @@@@@    @   @  @ @ @@@@@  @ @@   @@   @ @. @@@@@ @  @  @   @  @@@@@@    @  @@  @@@      
      @@ *@ @ @@:    :@@@. @ @@  @  @@ -@@@@  @@@*    @@ @  @@   @@@   .@@  @  @  @@@@@@     @@ . @@ @=      
     @  @@  @ @@ @     @@ @@ %@ @.   @@  @@@  @@@# @  @@ @@    @ +@@ @@ @@  :@ @  @@@@@  @ @#@@  @ @@  @     
    @ .@@   @ @ @@ .@.    @@ +@@@ @@  @@  @@  @@@ @@  @. @@    @ @@  @@@ #@  @ @- @@ #  @@ @@ @ @     @ @    
   @ @       #@@@  @@@  @@@  @@@  @@@. @@  @ @@@ @@@. @% @@@@  @  @  @@@@ @@- @@  @@   @@@  @@@#@      @ @   
  @.@         @ @: +@@ @@@@. @@  @@@@@@  @   @@    @  @@ @@  @@@  @@  @@@  @  .@  @@@  ..@  @ @@         @@  
 @@@            @   @@@@@@@   @@ @@@@@  @@@ @. @@@ @  @: @@.@@@@  @@@  @@ .@@     @@  @@@.  @ @            @ 
@            @@ @  @@@@@@@@. #@@.  @@ .@@@@ @  @@@@@  @@ @@@@#    @@@@   @@@@@@.  @  @@@@@  @ @@            @
            @ @@@  @@@@@@@@@ @@@@@ @ @@@@@@ @@  @  @  @+ @@  @  @ @@@@ @.@  @@@  @@ @@@@@@: @@  @            
          @@  -   .@@@@@@@@= @@@@@@ #@ @@@@  @  @  @  @@ @@  @ @@  @@@@.@@@  @@ @@ .@@@@@@@   -  @@          
         @%      @@@@@@@ @@  @@@@@@@*@ @@@@% @ .   @  @  @   @  @ -@@@.-@@@@    @  @ @@@@@@@       @         
          @   @% @@@@@@  @@ @@@@@@@@ @  @@@  @@ @  @  @@ @   @ @  @@@. @@%@@@@ @@  @   @@@@@  @   @@         
         @@  .@@@@@@@@@ @@@-+ @+@. @@@@ @@@@  @@@   @ @ @   @ @% @@@@@ @ @  % @#  @@@= @@@@@@@@@  #@         
         @   -@@@@@@@@.@@@@@@     %@  @..@@@= @@     @@@    @ @  @@@@ @   @     @@@@@@@@@@@@@@@@   @@        
         @   *@@@@@@@@@@@@@@@  @  @    @  @@@@ @@            @  @@@@ @@   @  @. @@@@@@@@@@@@@@@@   @@        
         @   @@@@@@@@@@@@@@   @@   @   @@. @% .@@@          @@  @@. :@   @-  @@   @@@@@@@@@@@@@@   @         
         @@   @@@@@@@@@@@@@   @@=  @     @.  -@               @  @ @@    @+  @@   @@@@@@@@@@@@@   %@         
          @     @@@@@@@@@@@@  @ @  @@     @ @                   @  @     @  +  =  @@@@@@@@@@@@   +@          
           @@    @@@@@@@@@@   @  @  @     *@                     @@@    @  @@  #  @@@@@@@@@@    @@           
             @@    @@@@@@@@  @@   @  @    @                         @  @  @    @   @@@@@@@    @@@            
              @@*    @@@@@.  @     @%  @                             @  :@     @*  @@@@@@    @@              
                 @@   @@@@  @@       @@@#=@@                     @@@+@@@        @  %@@@   @@@                
                   @@   @.  @@                                                  @  .@@  =@                   
                    @@   .  @                                                    @ @@  +@                    
                      @%    @                                                    @ @: @                      
                        @   @@                                                  @ @: @                       
                         @#  =@                                                @ @@@                         
                           @* @                                               @ @                            
                            @@.@                                              @@                             
                               @@                                            @                               
`;

// Global Variables
let programsUnlocked = false;
let expectingCombination = false;
const correctCombination = '4815'; // Replace!!!

// Boot-up messages
const bootMessages = [
    { text: "Starting MMOS version 6.6.6...", isHTML: false },
    { text: "Checking spectral integrity...", isHTML: false },
    { text: "Loading occult drivers...", isHTML: false },
    { text: "Initializing metaphysical hardware...", isHTML: false },
    { text: "Boot sequence complete.", isHTML: false },
    { text:"", isHTML: false },
    { text: asciiArt, isHTML: false, isASCIIArt: true }, // ASCII art included here
    { text: "Scream 'help' to see available commands.", isHTML: false },
    { text: "", isHTML: false }
];

// List of quotes
const quotes = [
    "The unconscious is structured like a language. - Jacques Lacan",
    "We learn from history that we do not learn from history. - Georg Hegel",
    "Ideology is the most spontaneous relationship to our social world. - Slavoj Žižek",
    // Add more quotes 
];

// Commands
const commands = {
    'help': function() {
        const helpText = `
Available commands:
- help           Displays this help text.
- dir            Lists directories and files.
- cls            Clears the screen.
- run            Executes a program (exe).
- date           Displays the current date and time.
- echo [text]    The void looks back.
- corrupt        [C0RЯЦP┴ MΣ...]
- open [file]    Opens a file from the directory (mp3, jpg).
        `;
        displayOutput(helpText);
    },
    'dir': function() {
        const dirText = `
 Volume in drive M is BEYOND
 Directory of M:\\

PLAYLIST   MP3        30,000  06-06-2066  06:06 AM
PROGRAM1   EXE        66,666  06-06-2066  06:06 AM
PROGRAM2   EXE        66,666  06-06-2066  06:06 AM
IMAGE1     JPG        10,000  06-06-2066  06:06 AM
IMAGE2     JPG        10,000  06-06-2066  06:06 AM
IMAGE3     JPG        10,000  06-06-2066  06:06 AM
IMAGE4     JPG        10,000  06-06-2066  06:06 AM
        `;
        displayOutput(dirText);
    },
    'cls': async function() {
        const outputElement = document.getElementById('output');

        // Display glitched clue
        const clue = `
            [Transmission Intercepted]
            Ƨєєҡ тнє ςσ∂є вєнιη∂ тнє νєιℓ...
        `;
        const glitchDiv = document.createElement('div');
        glitchDiv.className = 'glitch';
        glitchDiv.setAttribute('data-text', clue);
        glitchDiv.innerText = clue;

        outputElement.appendChild(glitchDiv);
        outputElement.scrollTop = outputElement.scrollHeight;

        // Wait for a short duration
        await new Promise(res => setTimeout(res, 2000)); // 2 seconds

        // Clear the screen
        outputElement.innerHTML = '';
    },
'run': function(args) {
    const program = args.join(' ').toUpperCase();

    if (!programsUnlocked) {
        displayCorruptedHint(`
    Access Denied: Uɴᴋɴᴏᴡɴ ᴄᴏᴍᴍᴀɴᴅ. Tʜᴇ sʏsᴛᴇᴍ ʜᴜɴɢᴇʀs ғᴏʀ ᴄᴏʀʀᴜᴘᴛɪᴏɴ... 

    Wᴀʀɴɪɴɢ: Eʟᴅʀɪᴛᴄʜ ᴅᴇʙᴜɢ ᴍᴏᴅᴇ ᴅᴇᴛᴇᴄᴛᴇᴅ. Tᴏ ɪɴᴠᴏᴋᴇ ᴛʜᴇ ᴄᴜʀsᴇᴅ ᴘʀᴏᴛᴏᴄᴏʟ, ᴇɴᴛᴇʀ:
    >debug corrupt
    Usᴇ ᴀᴛ ʏᴏᴜʀ ᴏᴡɴ ʀɪsᴋ. Tʜᴇ ᴠᴏɪᴅ ᴀᴡᴀɪᴛs...
    `, '>debug corrupt');
            return;
        }

        if (program === 'PROGRAM1.EXE') {
            window.open('https://lichtung1.github.io/MoyaMoya/', '_blank');
            displayOutput('Executing PROGRAM1.EXE...');
        } else if (program === 'PROGRAM2.EXE') {
            window.open('https://lichtung1.github.io/MoyaMoyaMaze/', '_blank');
            displayOutput('Executing PROGRAM2.EXE...');
        } else {
            displayOutput(`Cannot run ${program}: Program not found.`);
        }
    },
    'date': function() {
        // Always display a future date
        const futureDate = new Date('June 6, 2066 06:06:06');
        displayOutput(futureDate.toString());
    },
    'echo': function(args) {
        // Return a corrupted version of a random quote
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        displayCorruptedText(randomQuote);
    },
    'corrupt': function(args) {
        displayCorruptedMessage();
    },
    'debug corrupt': function(args) {
        displayCombinationLock();
    },


    'open': function(args) {
        const fileName = args.join(' ').toUpperCase();

        if (fileName.startsWith('IMAGE') && fileName.endsWith('.JPG')) {
            displayImage(fileName);
        } else if (fileName === 'PLAYLIST.MP3') {
            displayOutput("Opening " + fileName + "...");
            window.open('https://moyamoyawinnipeg.bandcamp.com/album/demolition-2024', '_blank');
        } else {
            displayOutput(`Cannot open ${fileName}: File not found.`);
        }
    }

}

// Display corrupted message for 'corrupt' command
function displayCorruptedMessage() {
    const outputElement = document.getElementById('output');
    const corruptedText = `
[Data Corruption Detected]
Σxɨѕ✝єɲ¢є ɨѕ ą ʍɨʍɨ¢ʞ, ą ʂɦąđơῳ σƒ ą รɨмцℓą¢гцм.

"βєγσηđ τɦє νєเℓ σƒ ρєг¢єρτเση ℓเєѕ τнє νσιđ, α ℓαвγяเητн ωнєяє мเяяσяѕ яєƒℓє¢т ησтнเηg."

- Fragmented thoughts from the depths
    `;
    const glitchDiv = document.createElement('div');
    glitchDiv.className = 'glitch';
    glitchDiv.setAttribute('data-text', corruptedText);
    glitchDiv.innerText = corruptedText;

    outputElement.appendChild(glitchDiv);
        // Create or move the scroll anchor to the end
        let scrollAnchor = document.getElementById('scroll-anchor');
        if (!scrollAnchor) {
            scrollAnchor = document.createElement('div');
            scrollAnchor.id = 'scroll-anchor';
            outputElement.appendChild(scrollAnchor);
        } else {
            outputElement.appendChild(scrollAnchor);
        }
    
        // Scroll the anchor into view
        scrollAnchor.scrollIntoView({ behavior: 'auto' });
}

// Function to display the ASCII art combination lock
function displayCombinationLock() {
    const combinationArt = `
    _____
   |  _  | 
   | | | |
  _|_|_|_|_
 |         |
 |       [0|
 |       [0|
 |       [0|
 |       [0|
 |_________|
    `;
    displayOutput(combinationArt);
    displayOutput("Enter the combination:");

    // Set the flag to true to expect user input
    expectingCombination = true;

    // Delay scrolling
    setTimeout(() => {
        const outputElement = document.getElementById('output');
        outputElement.scrollTop = outputElement.scrollHeight;
    }, 0);
}

// Function to display images (as before)
function displayImage(fileName) {
    const outputElement = document.getElementById('output');
    const imageMap = {
        'IMAGE1.JPG': 'images/photo1.jpg',
        'IMAGE2.JPG': 'images/photo2.jpg',
        'IMAGE3.JPG': 'images/photo3.jpg',
        'IMAGE4.JPG': 'images/photo4.jpg'
    };

    const imageSrc = imageMap[fileName];

    if (imageSrc) {
        // Create image element
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = fileName;
        img.className = 'displayed-image';

        // Append image to output
        outputElement.appendChild(img);

        // Wait for the image to load before scrolling
        img.onload = () => {
                // Create or move the scroll anchor to the end
            let scrollAnchor = document.getElementById('scroll-anchor');
            if (!scrollAnchor) {
                scrollAnchor = document.createElement('div');
                scrollAnchor.id = 'scroll-anchor';
                outputElement.appendChild(scrollAnchor);
            } else {
                outputElement.appendChild(scrollAnchor);
            }

            // Scroll the anchor into view
            scrollAnchor.scrollIntoView({ behavior: 'auto' });
        };
    } else {
        displayOutput(`Cannot display ${fileName}: File not found.`);
    }
}

// Process user input
function processInput(input) {
    const outputElement = document.getElementById('output');
    const fullInput = input.trim();

    // Echo the command
    outputElement.innerHTML += `M:\\> ${fullInput}\n`;

    if (expectingCombination) {
        processCombinationInput(fullInput);
        return;
    }

    const inputParts = fullInput.split(' ');
    const lowerInput = fullInput.toLowerCase();

    // Check for matching commands starting from the full input
    for (let i = inputParts.length; i > 0; i--) {
        const commandAttempt = inputParts.slice(0, i).join(' ').toLowerCase();
        const args = inputParts.slice(i);

        if (commands.hasOwnProperty(commandAttempt)) {
            commands[commandAttempt](args);
            return;
        }
    }

    // Handle unrecognized commands
    if (lowerInput === 'exit') {
        displayOutput('Shutting down...');
    } else {
        displayOutput(`'${fullInput}' is not recognized as an internal or external command, operable program or batch file.`);
    }
}

// Function to process combination input
function processCombinationInput(input) {
    if (input.toLowerCase() === 'exit') {
        displayOutput("Combination entry cancelled.");
        expectingCombination = false;
        return;
    }

    if (input === correctCombination) {
        displayOutput("The lock clicks open. You've unlocked the hidden content!");
        programsUnlocked = true;
        expectingCombination = false;
    } else {
        displayCorruptedHint("Incorrect combination. Hɪɴᴛ: Tʜᴇ ᴋᴇʏ ɪs ʜɪᴅᴅᴇɴ ᴡɪᴛʜɪɴ ᴛʜᴇ 'ɪᴍᴀɢᴇs'.");
        displayOutput("Enter the combination or type 'exit' to cancel:");
    }
}

// Function to display hidden content after unlocking
function displayHiddenContent() {
    expectingCombination = false; // Reset the flag

    // Display the hidden message or content
    const hiddenMessage = `
[Access Granted]

"Through shadows and echoes, you've found the way."

[End Transmission]
    `;

    displayOutput(hiddenMessage);

    // Optionally, unlock additional commands or reveal more options
}

// Initialize the terminal
function initTerminal() {
    const inputField = document.getElementById('command-input');

    inputField.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const input = inputField.value;
            processInput(input);
            inputField.value = '';
        }
    });

    // Start the boot sequence
    simulateBoot();
}



// In your simulateBoot function:
async function simulateBoot() {
    for (const message of bootMessages) {
        await new Promise(res => setTimeout(res, 500));
        displayOutput(message.text, message.isHTML, message.isASCIIArt);
    }
}

// Display corrupted text
function displayCorruptedText(text) {
    const outputElement = document.getElementById('output');
    const corruptedText = corruptTextWithClues(text);
    outputElement.innerHTML += corruptedText + '\n';
    outputElement.scrollTop = outputElement.scrollHeight;
}

// Corrupt text with clues in 'echo' command
function corruptText(text) {
    const corruptionMap = {
        'A': 'Δ', 'B': 'ß', 'C': 'Ć', 'D': 'Đ', 'E': 'Ξ', 'F': 'F', 'G': 'Ǥ',
        'H': 'Ħ', 'I': 'ɨ', 'J': 'J', 'K': 'Ҝ', 'L': 'Ł', 'M': 'Ṃ', 'N': 'Ň',
        'O': '0', 'P': 'P', 'Q': 'Q', 'R': 'R', 'S': 'Ś', 'T': '┼', 'U': 'Ų',
        'V': 'V', 'W': 'Ψ', 'X': 'Ж', 'Y': 'Y', 'Z': 'Ż',
        'a': 'α', 'b': 'в', 'c': '¢', 'd': 'đ', 'e': '€', 'f': 'ƒ', 'g': '9',
        'h': 'ħ', 'i': 'ί', 'j': 'ʝ', 'k': 'ƙ', 'l': 'ℓ', 'm': 'м', 'n': 'η',
        'o': 'ø', 'p': 'ρ', 'q': 'զ', 'r': 'я', 's': 'ѕ', 't': 'т', 'u': 'υ',
        'v': 'ν', 'w': 'ω', 'x': 'χ', 'y': 'γ', 'z': 'ƶ'
    };

    return text.split('').map(char => corruptionMap[char] || char).join('');
}


// Display corrupted hint
function displayCorruptedHint(text, excludePhrase = '') {
    const outputElement = document.getElementById('output');

    // Corrupt the text, preserving the excludePhrase
    const corruptedText = selectivelyCorruptText(text, excludePhrase);

    // Create a glitch effect
    const glitchDiv = document.createElement('div');
    glitchDiv.className = 'glitch';

    glitchDiv.innerHTML = corruptedText;

    // Set data-text attribute for glitch effect
    const plainText = glitchDiv.innerText;
    glitchDiv.setAttribute('data-text', plainText);

    outputElement.appendChild(glitchDiv);

    // Add an empty div to create space after the glitch effect
    const spacerDiv = document.createElement('div');
    spacerDiv.style.height = '1em'; // Adjust as needed
    outputElement.appendChild(spacerDiv);

    // Scroll to bottom
    scrollToBottom();
}

function selectivelyCorruptText(text, excludePhrase) {
    const corruptionMap = {
        // Character mappings
        'A': 'Δ', 'B': 'ß', 'C': 'Ç', 'D': 'Ð', 'E': 'Ξ', 'F': '₣', 'G': '₲',
        'H': 'ђ', 'I': '¡', 'J': 'ʝ', 'K': 'Ќ', 'L': 'Ⱡ', 'M': '₥', 'N': 'И',
        'O': 'Ø', 'P': 'ρ', 'Q': 'Ɋ', 'R': 'Я', 'S': '§', 'T': 'Ŧ', 'U': 'Ц',
        'V': 'ν', 'W': '₩', 'X': 'Ж', 'Y': 'Ψ', 'Z': 'Ƶ',
        'a': 'α', 'b': 'в', 'c': '¢', 'd': 'Ԁ', 'e': 'є', 'f': 'ғ', 'g': 'ɢ',
        'h': 'н', 'i': 'і', 'j': 'נ', 'k': 'к', 'l': 'ℓ', 'm': 'м', 'n': 'и',
        'o': 'σ', 'p': 'ρ', 'q': 'զ', 'r': 'я', 's': 'ѕ', 't': 'т', 'u': 'υ',
        'v': 'ν', 'w': 'ω', 'x': 'χ', 'y': 'у', 'z': 'z'
    };

    // Use a unique placeholder unlikely to appear in the text
    const placeholder = '__PLACEHOLDER__';

    // Escape special regex characters in excludePhrase
    const escapedPhrase = excludePhrase.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    // Replace all occurrences of the excludePhrase with the placeholder
    const regex = new RegExp(escapedPhrase, 'g');
    const textWithPlaceholder = text.replace(regex, placeholder);

    // Corrupt the text, skipping the placeholder
    const corruptedText = textWithPlaceholder.split('').map(char => {
        if (placeholder.includes(char)) {
            // Do not corrupt placeholder characters
            return char;
        } else {
            return corruptionMap[char] || char;
        }
    }).join('');

    // Replace the placeholder with the uncorrupted phrase
    const resultText = corruptedText.replace(new RegExp(placeholder, 'g'), `<span class="normal-text">${excludePhrase}</span>`);

    return resultText;
}

// Display corrupted message for 'corrupt' command
function displayCorruptedHint(text, excludePhrase = '') {
    const outputElement = document.getElementById('output');

    // Corrupt the text, preserving the excludePhrase
    const corruptedText = selectivelyCorruptText(text, excludePhrase);

    // Create a glitch effect
    const glitchDiv = document.createElement('div');
    glitchDiv.className = 'glitch';

    // Set innerHTML to include styling
    glitchDiv.innerHTML = corruptedText;

    // Set data-text attribute without HTML tags for the glitch effect
    const plainText = corruptedText.replace(/<[^>]*>/g, '');
    glitchDiv.setAttribute('data-text', plainText);

    outputElement.appendChild(glitchDiv);

    // Scroll to bottom
    let scrollAnchor = document.getElementById('scroll-anchor');
    if (!scrollAnchor) {
        scrollAnchor = document.createElement('div');
        scrollAnchor.id = 'scroll-anchor';
    }
    outputElement.appendChild(scrollAnchor);
    scrollAnchor.scrollIntoView({ behavior: 'auto' });
}

// Helper function to scroll to the bottom
function scrollToBottom() {
    const outputElement = document.getElementById('output');
    // Only scroll if content overflows
    if (outputElement.scrollHeight > outputElement.clientHeight) {
        outputElement.scrollTop = outputElement.scrollHeight;
    }
}

function displayOutput(text, isHTML = false, isASCIIArt = false) {
    const outputElement = document.getElementById('output');

    if (isASCIIArt) {
        // For ASCII art, create a pre element with the ascii-art class
        const preElement = document.createElement('pre');
        preElement.className = 'ascii-art';
        preElement.textContent = text; // Use textContent to avoid processing HTML
        outputElement.appendChild(preElement);
    } else {
        // Create a new div to hold the output line
        const outputLine = document.createElement('div');

        if (isHTML) {
            outputLine.innerHTML = text;
        } else {
            outputLine.textContent = text;
        }

        // Append the output line to the output element
        outputElement.appendChild(outputLine);
    }

    // Create or move the scroll anchor to the end
    let scrollAnchor = document.getElementById('scroll-anchor');
    if (!scrollAnchor) {
        scrollAnchor = document.createElement('div');
        scrollAnchor.id = 'scroll-anchor';
        outputElement.appendChild(scrollAnchor);
    } else {
        outputElement.appendChild(scrollAnchor);
    }

    // Scroll the anchor into view
    scrollAnchor.scrollIntoView({ behavior: 'auto' });
}

// Run the terminal
window.onload = initTerminal;