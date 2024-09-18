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

// Boot-up messages
const bootMessages = [
    "Starting MMOS version 6.6.6...",
    "Checking spectral integrity...",
    "Loading occult drivers...",
    "Initializing metaphysical hardware...",
    "Boot sequence complete.",
    "",
    "<pre class='ascii-art'>" + asciiArt + "</pre>",
    "Scream 'help' to see available commands.",
    ""
];

// List of quotes
const quotes = [
    "The unconscious is structured like a language. - Jacques Lacan",
    "We learn from history that we do not learn from history. - Georg Hegel",
    "Ideology is the most spontaneous relationship to our social world. - Slavoj Žižek",
    // Add more quotes as desired
];

// List of available commands
const commands = {
    'help': function() {
        const helpText = `
Available commands:
- help           Displays this help text.
- dir            Lists (visible) directories and files.
- cls            Clears the screen.
- run site1      Casts the first website.
- run site2      Invokes the second website.
- date           Displays the current date and time.
- echo [text]    The void looks back.
- corrupt        [C0RЯЦP┴ MΣ...]
        `;
        displayOutput(helpText);
    },
    'dir': function() {
        const dirText = `
 Volume in drive M is BEYOND
 Directory of M:\\

PROGRAM1   EXE        66,666  06-06-2066  06:06 AM
PROGRAM2   EXE        66,666  06-06-2066  06:06 AM
`;
        displayOutput(dirText);
    },
    'cls': function() {
        document.getElementById('output').innerHTML = '';
    },
    'run site1': function() {
        window.open('https://lichtung1.github.io/MoyaMoya/', '_blank');
        displayOutput('Invoking the first ritual, MOYAMOYA.exe...');
    },
    'run site2': function() {
        window.open('https://lichtung1.github.io/MoyaMoyaMaze/', '_blank');
        displayOutput('Summoning the second entity, maze.exe...');
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
    'corrupt': function() {
        displayCorruptedMessage();
    }
};

// Simulate the boot-up sequence
async function simulateBoot() {
    const outputElement = document.getElementById('output');
    for (const message of bootMessages) {
        await new Promise(res => setTimeout(res, 500)); // Adjust the delay as needed
        outputElement.innerHTML += message + '\n';
        outputElement.scrollTop = outputElement.scrollHeight;
    }
}

// Display output text in the terminal
function displayOutput(text) {
    const outputElement = document.getElementById('output');
    outputElement.innerHTML += text + '\n';
    outputElement.scrollTop = outputElement.scrollHeight;
}

// Display corrupted text
function displayCorruptedText(text) {
    const outputElement = document.getElementById('output');
    const corruptedText = corruptText(text);
    outputElement.innerHTML += corruptedText + '\n';
    outputElement.scrollTop = outputElement.scrollHeight;
}

// Corrupt text by replacing some letters with similar-looking symbols
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
    outputElement.scrollTop = outputElement.scrollHeight;
}

// Process user input
function processInput(input) {
    const outputElement = document.getElementById('output');
    const fullInput = input.trim();
    let [command, ...args] = fullInput.split(' ');

    if (command === '') {
        return;
    }

    // Echo the command
    outputElement.innerHTML += `M:\\> ${fullInput}\n`;

    // Convert command to lowercase for case-insensitive matching
    const commandLower = command.toLowerCase();

    // Check for commands that include arguments (e.g., 'run site1')
    const matchedCommand = Object.keys(commands).find(cmd => fullInput.toLowerCase().startsWith(cmd));

    if (matchedCommand) {
        const cmdLength = matchedCommand.split(' ').length;
        args = fullInput.split(' ').slice(cmdLength);
        commands[matchedCommand](args);
    } else if (fullInput.toLowerCase() === 'exit') {
        displayOutput('Shutting down...');
        // Add any additional shutdown logic here
    } else {
        displayOutput(`'${fullInput}' is not recognized as an internal or external command, operable program or batch file.`);
    }
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

// Run the terminal
window.onload = initTerminal;
