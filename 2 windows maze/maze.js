// maze.js

// Variables for Three.js
let scene, camera, renderer;

// Variables for the maze
const mazeWidth = 20; // Number of cells horizontally
const mazeHeight = 20; // Number of cells vertically
const wallHeight = 2;
const wallThickness = 0.1;
const wallLength = 2; // Length of each cell side

// Variables for textures
let wallTexture, floorTexture;
const photoTextures = [];

// Arrays to store walls
const mazeWalls = [];

// Variables for camera movement
let isMoving = false;
let isRotating = false;
let cameraDirection = null; // Current direction of the camera
let currentX, currentY; // Current cell coordinates
let cameraPath = []; // Keep track of the path

// Variables for insanity level
let insanityLevel = 0;
const maxInsanityLevel = 20; // Set to 20

// Elements for effects
let glitchOverlay;
let gameOverScreen;
let asciiArtElement;
let tryAgainLink;

// Variable to track the current number of hex strings
let currentNumHexStrings = 0;

// Game over variables
let gameOverTriggered = false; // To prevent multiple triggers
const postMaxInsanityDuration = 3000; // Duration after max insanity before fading out (in milliseconds)
const showTryAgainDelay = 3000; // Delay before showing "Try Again?" link (in milliseconds)
let backgroundColor = 'white'; // Background color when fading out ('black' or 'white')

function init() {
  // Create the scene
  scene = new THREE.Scene();

  // Set up the camera
  camera = new THREE.PerspectiveCamera(
    75, window.innerWidth / window.innerHeight, 0.1, 1000
  );

  // Create the renderer and add it to the document
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
  scene.add(ambientLight);

  // Add directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(5, 10, 7.5);
  scene.add(directionalLight);

  // Load textures
  const textureLoader = new THREE.TextureLoader();

  // Ensure the image paths are correct and the images are in the correct folder
  wallTexture = textureLoader.load('wall.png');
  floorTexture = textureLoader.load('floor.png');

  // Load your photos
  const photoPaths = ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg'];
  photoPaths.forEach(path => {
    const texture = textureLoader.load(path);
    photoTextures.push(texture);
  });

  // Generate the maze
  generateMaze();

  // Create the maze
  createMaze();

  // Set the camera's initial position
  currentX = Math.floor(mazeWidth / 2);
  currentY = Math.floor(mazeHeight / 2);
  camera.position.set(
    currentX * wallLength - (mazeWidth * wallLength) / 2 + wallLength / 2,
    wallHeight / 2,
    currentY * wallLength - (mazeHeight * wallLength) / 2 + wallLength / 2
  );
  camera.rotation.y = 0;
  cameraDirection = null;

  // Initialize the glitch overlay
  glitchOverlay = document.getElementById('glitch-overlay');

  // Initialize the game over screen and ASCII art element
  gameOverScreen = document.getElementById('game-over-screen');
  asciiArtElement = document.getElementById('ascii-art');
  tryAgainLink = document.getElementById('try-again-link');

  // Hide the "Try Again?" link initially
  tryAgainLink.style.opacity = '0';

  // Add event listener for "Try Again?" link
  tryAgainLink.addEventListener('click', resetGame);

  // Start the animation loop
  animate();
}

// Variables for the maze grid
const maze = [];

// Function to generate the maze grid
function generateMaze() {
  // Initialize the maze grid
  for (let x = 0; x < mazeWidth; x++) {
    maze[x] = [];
    for (let y = 0; y < mazeHeight; y++) {
      maze[x][y] = {
        visited: false,
        walls: { top: true, right: true, bottom: true, left: true },
      };
    }
  }

  // Recursive backtracking maze generation
  const startX = Math.floor(Math.random() * mazeWidth);
  const startY = Math.floor(Math.random() * mazeHeight);
  carveMaze(startX, startY);
}

// Function to carve the maze using recursive backtracking
function carveMaze(x, y) {
  maze[x][y].visited = true;

  // Shuffle directions
  const directions = ['top', 'right', 'bottom', 'left'];
  shuffleArray(directions);

  for (const direction of directions) {
    const nx = x + (direction === 'left' ? -1 : direction === 'right' ? 1 : 0);
    const ny = y + (direction === 'top' ? -1 : direction === 'bottom' ? 1 : 0);

    if (nx >= 0 && nx < mazeWidth && ny >= 0 && ny < mazeHeight && !maze[nx][ny].visited) {
      // Remove walls between current cell and next cell
      maze[x][y].walls[direction] = false;
      const opposite = oppositeDirection(direction);
      maze[nx][ny].walls[opposite] = false;

      carveMaze(nx, ny);
    }
  }
}

// Helper function to shuffle an array
function shuffleArray(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Helper function to get the opposite direction
function oppositeDirection(direction) {
  const opposites = { 'top': 'bottom', 'right': 'left', 'bottom': 'top', 'left': 'right' };
  return opposites[direction];
}

// Function to create the maze geometry
function createMaze() {
  // Materials
  const wallMaterial = new THREE.MeshStandardMaterial({ map: wallTexture });
  const floorMaterial = new THREE.MeshStandardMaterial({ map: floorTexture });

  // Create floor
  const floorGeometry = new THREE.PlaneGeometry(mazeWidth * wallLength, mazeHeight * wallLength);
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2; // Rotate to be horizontal
  floor.position.y = 0;
  scene.add(floor);

  // Create walls
  for (let x = 0; x < mazeWidth; x++) {
    for (let y = 0; y < mazeHeight; y++) {
      const cell = maze[x][y];
      const posX = x * wallLength - (mazeWidth * wallLength) / 2 + wallLength / 2;
      const posZ = y * wallLength - (mazeHeight * wallLength) / 2 + wallLength / 2;

      // For each wall, check if it exists and create it
      for (const [direction, exists] of Object.entries(cell.walls)) {
        if (exists) {
          let wallGeometry;
          const wallPosition = new THREE.Vector3();
          let wallRotationY = 0;

          if (direction === 'top') {
            wallGeometry = new THREE.BoxGeometry(wallLength, wallHeight, wallThickness);
            wallPosition.set(posX, wallHeight / 2, posZ - wallLength / 2);
            wallRotationY = 0;
          } else if (direction === 'bottom') {
            wallGeometry = new THREE.BoxGeometry(wallLength, wallHeight, wallThickness);
            wallPosition.set(posX, wallHeight / 2, posZ + wallLength / 2);
            wallRotationY = 0;
          } else if (direction === 'left') {
            wallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, wallLength);
            wallPosition.set(posX - wallLength / 2, wallHeight / 2, posZ);
            wallRotationY = 0;
          } else if (direction === 'right') {
            wallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, wallLength);
            wallPosition.set(posX + wallLength / 2, wallHeight / 2, posZ);
            wallRotationY = 0;
          }

          // Determine if the wall should have a photo
          let usePhoto = false;
          let wallMaterialToUse = wallMaterial;
          if (Math.random() < 0.20) { // 20% chance
            usePhoto = true;
            const texture = photoTextures[Math.floor(Math.random() * photoTextures.length)];
            wallMaterialToUse = new THREE.MeshStandardMaterial({ map: texture });
          }

          const wall = new THREE.Mesh(wallGeometry, wallMaterialToUse);
          wall.position.copy(wallPosition);
          wall.rotation.y = wallRotationY;

          // Store additional properties
          wall.isPhotoWall = usePhoto;
          wall.isCameraNear = false; // Initialize isCameraNear
          wall.direction = direction; // Store wall's facing direction

          scene.add(wall);
          mazeWalls.push(wall);
        }
      }
    }
  }
}

// Function to determine if wall is facing the camera
function isWallFacingCamera(wall) {
  const wallNormal = new THREE.Vector3();
  const cameraPosition = camera.position.clone();
  const wallPosition = wall.position.clone();

  // Determine wall normal based on its direction
  switch (wall.direction) {
    case 'top':
      wallNormal.set(0, 0, 1);
      break;
    case 'bottom':
      wallNormal.set(0, 0, -1);
      break;
    case 'left':
      wallNormal.set(1, 0, 0);
      break;
    case 'right':
      wallNormal.set(-1, 0, 0);
      break;
  }

  // Calculate vector from wall to camera
  const wallToCamera = cameraPosition.sub(wallPosition).normalize();

  // Calculate dot product
  const dot = wallNormal.dot(wallToCamera);

  // If dot product is greater than zero, wall is facing the camera
  return dot > 0;
}

// Function to check if camera is near a photo wall and facing it
function checkForPhotoWalls() {
  const cameraPosition = camera.position;

  mazeWalls.forEach(wall => {
    if (wall.isPhotoWall) {
      const distance = cameraPosition.distanceTo(wall.position);
      const isNear = distance < wallLength * 1.1; // Adjust detection radius

      const facing = isWallFacingCamera(wall);

      if (isNear && facing && !wall.isCameraNear) {
        // The camera has just entered the proximity of the wall and is facing it
        console.log('Photo wall detected at distance:', distance);
        increaseInsanity();
      }

      // Update the wall's isCameraNear status
      wall.isCameraNear = isNear && facing;
    }
  });
}

// Function to update the insanity meter display
function updateInsanityMeterDisplay() {
  const insanityFill = document.getElementById('insanity-fill');
  if (insanityFill) {
    const insanityPercentage = (insanityLevel / maxInsanityLevel) * 100;
    insanityFill.style.height = `${insanityPercentage}%`;
  } else {
    console.error('Element with id "insanity-fill" not found.');
  }
}

// Function to increase insanity level
function increaseInsanity() {
  if (insanityLevel < maxInsanityLevel) {
    insanityLevel++;
    console.log('Insanity Level:', insanityLevel);
    updateInsanityMeterDisplay();
  }

  if (insanityLevel >= maxInsanityLevel && !gameOverTriggered) {
    gameOverTriggered = true;
    // Continue movement for specified duration before triggering game over
    setTimeout(() => {
      triggerGameOver();
    }, postMaxInsanityDuration);
  }
}

// Function to decay insanity level over time
function decayInsanity() {
  if (insanityLevel > 0 && insanityLevel < maxInsanityLevel) {
    insanityLevel -= 0.001; // Adjust decay rate as needed
    if (insanityLevel < 0) insanityLevel = 0;
    updateInsanityMeterDisplay();
  }
}

// Function to apply insanity effects to the camera
function applyInsanityEffects() {
  if (insanityLevel > 0) {
    const intensity = insanityLevel / maxInsanityLevel;

    // Linear increase in jitter and spin
    const maxJitter = 0.05 * intensity;
    camera.position.x += (Math.random() - 0.5) * maxJitter;
    camera.position.y += (Math.random() - 0.5) * maxJitter;
    camera.position.z += (Math.random() - 0.5) * maxJitter;

    // Increase spin
    const maxSpin = 0.01 * intensity;
    camera.rotation.x += (Math.random() - 0.5) * maxSpin;
    camera.rotation.y += (Math.random() - 0.5) * maxSpin;
    camera.rotation.z += (Math.random() - 0.5) * maxSpin;

    // Add camera shake at high insanity levels
    if (intensity > 0.8) {
      const shake = 0.1 * (intensity - 0.8) * (Math.random() - 0.5);
      camera.position.x += shake;
      camera.position.y += shake;
      camera.position.z += shake;
    }
  }
}

// Function to update the glitch effect
function updateGlitchEffect() {
  const intensity = insanityLevel / maxInsanityLevel;

  if (intensity >= 1) {
    glitchOverlay.style.opacity = '1';

    let asciiOpacity = (intensity - 0.75) * 4;
    if (asciiOpacity > 1) asciiOpacity = 1;

    glitchOverlay.innerHTML = ASCII_ART;
    
    glitchOverlay.style.display = 'flex';
    glitchOverlay.style.justifyContent = 'center';
    glitchOverlay.style.alignItems = 'center';
    glitchOverlay.style.height = '100vh';
    glitchOverlay.style.width = '100vw';
    
    // Ensure the glow effect is visible
    glitchOverlay.style.opacity = asciiOpacity.toString();
  } else if (intensity >= 0.25) {
    // From insanity level 5 to 15, display random hexadecimal strings
    glitchOverlay.style.opacity = 1; // Keep opacity constant

    // Calculate the desired number of hex strings
    const desiredNumStrings = Math.floor((intensity - 0.25) * (4 / 0.5) * 20); // Adjust multiplier for density

    // Add new hex strings if needed
    const numToAdd = desiredNumStrings - currentNumHexStrings;
    if (numToAdd > 0) {
      for (let i = 0; i < numToAdd; i++) {
        const hexString = document.createElement('span');
        hexString.classList.add('hex-string');

        // Generate a random hexadecimal string (4 to 8 characters long)
        const length = 4 + Math.floor(Math.random() * 5);
        let hexContent = '';
        for (let j = 0; j < length; j++) {
          hexContent += Math.floor(Math.random() * 16).toString(16).toUpperCase();
        }
        hexString.textContent = hexContent;

        // Random position within the viewport
        const randomX = Math.random() * 100; // Percentage
        const randomY = Math.random() * 100; // Percentage
        hexString.style.position = 'absolute';
        hexString.style.left = randomX + 'vw';
        hexString.style.top = randomY + 'vh';

        // Random font size
        const randomFontSize = 10 + Math.random() * 20; // Between 10px and 30px
        hexString.style.fontSize = randomFontSize + 'px';

        // Set font family
        hexString.style.fontFamily = "Consolas, 'Courier New', monospace";

        // Set text-shadow for glow effect
        hexString.style.textShadow = `
          0 0 5px #9900ff,
          0 0 10px #9900ff,
          0 0 20px #9900ff,
          0 0 40px #ff00ff,
          0 0 80px #ff00ff,
          0 0 90px #ff00ff,
          0 0 100px #ff00ff,
          0 0 150px #ff00ff
        `;
        hexString.style.color = '#9900ff'; // Ensure color is set

        glitchOverlay.appendChild(hexString);
      }
      currentNumHexStrings = desiredNumStrings;
    }
  } else {
    // Below insanity level 5, no glitch effect
    glitchOverlay.style.opacity = 0;
    glitchOverlay.innerHTML = '';
    currentNumHexStrings = 0;
  }
}

function triggerGameOver() {
  // Fade out the maze
  renderer.domElement.style.transition = 'opacity 1s ease-in-out';
  renderer.domElement.style.opacity = '0';

  // Fade background to specified color
  document.body.style.transition = 'background-color 1s ease-in-out';
  document.body.style.backgroundColor = backgroundColor;

  // After fade-out duration, proceed
  setTimeout(() => {
    // Hide glitch overlay
    glitchOverlay.style.opacity = '0';

    // Show game over screen
    gameOverScreen.classList.add('show');

    // Display ASCII art in game over screen
    asciiArtElement.innerHTML = ASCII_ART;
    
    // Apply minimal styling
    asciiArtElement.style.display = 'flex';
    asciiArtElement.style.justifyContent = 'center';
    asciiArtElement.style.alignItems = 'center';
    asciiArtElement.style.height = '100vh';
    asciiArtElement.style.width = '100vw';

    // Ensure the glow effect is visible
    asciiArtElement.style.opacity = '1';

    // Show "Try Again?" link after a delay
    setTimeout(() => {
      tryAgainLink.style.opacity = '1';
    }, 3000);
  }, 1000);
}

// Function to reset the game
function resetGame(event) {
  event.preventDefault();

  // Reset insanity level
  insanityLevel = 0;
  updateInsanityMeterDisplay();
  gameOverTriggered = false;

  // Hide glitch overlay
  glitchOverlay.style.opacity = 0;
  glitchOverlay.innerHTML = '';
  currentNumHexStrings = 0;

  // Hide game over screen and clear ASCII art
  gameOverScreen.classList.remove('show');
  asciiArtElement.textContent = '';
  asciiArtElement.style.opacity = '0';

  // Reset "Try Again?" link
  tryAgainLink.style.opacity = '0';

  // Fade in the maze
  renderer.domElement.style.opacity = '1';

  // Reset background color
  document.body.style.backgroundColor = '';

  // Reinitialize variables
  isMoving = false;
  isRotating = false;
  cameraDirection = null;
  cameraPath = [];

  // Reposition the camera
  currentX = Math.floor(mazeWidth / 2);
  currentY = Math.floor(mazeHeight / 2);
  camera.position.set(
    currentX * wallLength - (mazeWidth * wallLength) / 2 + wallLength / 2,
    wallHeight / 2,
    currentY * wallLength - (mazeHeight * wallLength) / 2 + wallLength / 2
  );
  camera.rotation.set(0, 0, 0);

  // Reset walls
  mazeWalls.forEach(wall => {
    wall.isCameraNear = false;
  });

  // Start moving again
  moveCamera();
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Apply insanity effects
  applyInsanityEffects();

  // Update glitch effect
  updateGlitchEffect();

  // Check for photo walls
  checkForPhotoWalls();

  renderer.render(scene, camera);

  // Continue moving the camera if it's not game over
  if (!gameOverTriggered) {
    if (!isMoving && !isRotating) {
      moveCamera();
    }
  }

  // Decay insanity over time
  decayInsanity();
}

// Rest of the code remains unchanged (moveCamera, moveForward, updateCameraPositionMultipleCells, etc.)

// Function to move the camera
function moveCamera() {
  // Randomly decide to change direction based on insanity level
  const changeDirectionProbability = insanityLevel / (2 * maxInsanityLevel); // Up to 50% at max insanity
  if (insanityLevel > 0 && Math.random() < changeDirectionProbability) {
    // Choose a random available direction other than the current one
    const cell = maze[currentX][currentY];
    let possibleDirections = [];

    if (!cell.walls.top) possibleDirections.push('top');
    if (!cell.walls.right) possibleDirections.push('right');
    if (!cell.walls.bottom) possibleDirections.push('bottom');
    if (!cell.walls.left) possibleDirections.push('left');

    // Exclude the opposite of current direction
    if (cameraDirection) {
      const opposite = oppositeDirection(cameraDirection);
      const index = possibleDirections.indexOf(opposite);
      if (index !== -1 && possibleDirections.length > 1) {
        possibleDirections.splice(index, 1);
      }
    }

    if (possibleDirections.length > 0) {
      // Pick a random new direction
      const newDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
      // Update cameraDirection
      cameraDirection = newDirection;
      // Rotate camera to new direction
      isRotating = true;
      turnCamera(newDirection, () => {
        isRotating = false;
        moveForward();
      });
      return;
    }
    // If no other directions, proceed as normal
  }

  // Determine possible directions the camera can move from the current cell
  const cell = maze[currentX][currentY];
  let possibleDirections = [];

  if (!cell.walls.top) possibleDirections.push('top');
  if (!cell.walls.right) possibleDirections.push('right');
  if (!cell.walls.bottom) possibleDirections.push('bottom');
  if (!cell.walls.left) possibleDirections.push('left');

  // Exclude the direction we just came from (unless it's the only option)
  if (cameraPath.length > 0) {
    const lastDirection = cameraPath[cameraPath.length - 1];
    const opposite = oppositeDirection(lastDirection);
    const index = possibleDirections.indexOf(opposite);
    if (index !== -1 && possibleDirections.length > 1) {
      possibleDirections.splice(index, 1);
    }
  }

  // Handle dead-ends by allowing backtracking
  let nextDirection;
  if (possibleDirections.length === 0) {
    const lastDirection = cameraPath.pop(); // Remove last move
    nextDirection = oppositeDirection(lastDirection);
    cameraPath.push(nextDirection); // Add backtracking move
  } else {
    // Randomly choose a direction
    nextDirection = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
    cameraPath.push(nextDirection);
  }

  // Start rotation if changing direction
  if (nextDirection !== cameraDirection) {
    isRotating = true;
    turnCamera(nextDirection, () => {
      isRotating = false;
      cameraDirection = nextDirection;
      moveForward();
    });
  } else {
    moveForward();
  }
}

// Function to move the camera forward
function moveForward() {
  // Determine how many cells we can move forward in the current direction
  let distance = 0;
  let x = currentX;
  let y = currentY;

  while (true) {
    // Determine the next cell in the current direction
    let nextX = x;
    let nextY = y;

    if (cameraDirection === 'top') {
      nextY--;
    } else if (cameraDirection === 'bottom') {
      nextY++;
    } else if (cameraDirection === 'left') {
      nextX--;
    } else if (cameraDirection === 'right') {
      nextX++;
    }

    // Check if the next cell is within the maze bounds
    if (nextX < 0 || nextX >= mazeWidth || nextY < 0 || nextY >= mazeHeight) {
      break;
    }

    const currentCell = maze[x][y];
    const nextCell = maze[nextX][nextY];

    // Check if there's a wall between the current cell and the next cell
    if (currentCell.walls[cameraDirection] || nextCell.walls[oppositeDirection(cameraDirection)]) {
      break;
    }

    // Update x and y for the next iteration
    x = nextX;
    y = nextY;
    distance++;
  }

  if (distance > 0) {
    isMoving = true;
    updateCameraPositionMultipleCells(distance, cameraDirection, () => {
      // Update current position after movement completes
      if (cameraDirection === 'top') currentY -= distance;
      else if (cameraDirection === 'right') currentX += distance;
      else if (cameraDirection === 'bottom') currentY += distance;
      else if (cameraDirection === 'left') currentX -= distance;

      isMoving = false;
      moveCamera(); // Continue moving
    });
  } else {
    // Cannot move forward, need to choose a new direction
    moveCamera();
  }
}

// Function to move the camera over multiple cells
function updateCameraPositionMultipleCells(distance, direction, callback) {
  let dx = 0, dy = 0;
  if (direction === 'top') dy = -distance;
  else if (direction === 'bottom') dy = distance;
  else if (direction === 'left') dx = -distance;
  else if (direction === 'right') dx = distance;

  const targetPosition = new THREE.Vector3(
    (currentX + dx) * wallLength - (mazeWidth * wallLength) / 2 + wallLength / 2,
    wallHeight / 2,
    (currentY + dy) * wallLength - (mazeHeight * wallLength) / 2 + wallLength / 2
  );

  const baseSpeed = 0.0025; // Adjusted base speed
  const insanityMultiplier = 1 + (insanityLevel / maxInsanityLevel) * 0.5; // Up to 1.5x speed
  const speed = baseSpeed * insanityMultiplier;
  const distanceUnits = distance * wallLength;
  const duration = distanceUnits / speed;

  const initialPosition = camera.position.clone();
  const startTime = performance.now();

  function animateMovement(time) {
    const elapsed = time - startTime;
    const t = Math.min(elapsed / duration, 1);
    camera.position.lerpVectors(initialPosition, targetPosition, t);

    if (t < 1) {
      requestAnimationFrame(animateMovement);
    } else {
      camera.position.copy(targetPosition);
      if (callback) callback();
    }
  }

  requestAnimationFrame(animateMovement);
}

// Function to smoothly rotate the camera
function turnCamera(direction, callback) {
  let targetRotationY;
  if (direction === 'top') targetRotationY = 0;
  else if (direction === 'right') targetRotationY = -Math.PI / 2;
  else if (direction === 'bottom') targetRotationY = -Math.PI;
  else if (direction === 'left') targetRotationY = -Math.PI * 1.5;

  // Normalize angles
  targetRotationY = normalizeAngle(targetRotationY);
  let initialRotationY = normalizeAngle(camera.rotation.y);
  let deltaY = targetRotationY - initialRotationY;

  // Adjust deltaY for shortest rotation path
  if (deltaY > Math.PI) deltaY -= 2 * Math.PI;
  else if (deltaY < -Math.PI) deltaY += 2 * Math.PI;

  const baseRotationSpeed = 0.0025; // Adjusted base rotation speed
  const insanityMultiplier = 1 + (insanityLevel / maxInsanityLevel);
  const rotationSpeed = baseRotationSpeed * insanityMultiplier;
  const rotationAngle = Math.abs(deltaY);
  const duration = rotationAngle / rotationSpeed;

  const startTime = performance.now();

  function animateRotation(time) {
    const elapsed = time - startTime;
    const t = Math.min(elapsed / duration, 1);
    camera.rotation.y = initialRotationY + deltaY * t;

    if (t < 1) {
      requestAnimationFrame(animateRotation);
    } else {
      camera.rotation.y = targetRotationY;
      if (callback) callback();
    }
  }

  requestAnimationFrame(animateRotation);
}

// Helper function to normalize angles between -PI and PI
function normalizeAngle(angle) {
  angle = angle % (2 * Math.PI);
  if (angle < -Math.PI) angle += 2 * Math.PI;
  else if (angle > Math.PI) angle -= 2 * Math.PI;
  return angle;
}

// Event listener for window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize the scene when the content is loaded
document.addEventListener('DOMContentLoaded', () => {
  init();
  updateInsanityMeterDisplay();
});

// Define ASCII art here
const ASCII_ART = `

                                                                                              @                                                             
                                                               @@                           @@                         @                                    
                                                                @@@           @           @#@                          @@                                   
                                   @ @@@                        @ #@         @@           @.@                          @@@                                  
                              @@@@@@@@@                         @ %@        @@@@         @  @@                         @ @@@@@@@                            
                        @ @@* @@@@@@ @@                        @@ @@       @@@@@@         @ .@                         @  @@@@. @@@@@                       
                     @@ .   @@@@@@@  @@             @@         @  @@       @@#@ @@        @  @                        @@@ @@@@@@#   .@@@                    
                  @@@  . @@@@@@@@@@:  @@ @@       @:@        @@  @@       @@ @@ .@@      @@   @         @@          @@@   @@@@@@@@@    .@@                  
                @@   @@ @@  @@@@@@@@  =@@@@     @@ @@       @@    @@     @@  @@   @@      @    @@   @   @@@@       @ @@     =@@@@ #@+ @   =@@               
              @@   :@@     @@@@@@@@@   @ @@     @  @@       @@@@* @@     @   @@@   :@    @   @* @ @@@    @  @      @ + .@@ =@@@@@     =@@-  @@              
           @@@-  @@@        @@@@@@@@     @@    @@  @@  @@@@@@@@@@  @@@ @@.   %@     @@  @   @@@@@@@ @    @  @@     @   %@@ @@@@+-       *@@   @@@@          
        @@@@@  @@@   @@@     @@@@@@@      @@   @   @@ @@%@@@@@@@@ @@@@@@  %  @@@  @  @@@@@   @@@@@@ @@@@ @*  @    @.  @@@@@@@@@@    @@@@  @@@. .@ @         
        @@*  @@@ @  @@@. .     @@@@@.  %  @@   @@  @@@@  @@@@@@   @@@@@@  @  @@@  @   @@@    -@@@@    @@ @   @    @   @@@@@@@%     - @@@+ @@ @@  @ @        
       @@    @@  @  @@@ @@      @@@:  @@  @@  @@    -@@@  .@@@@  =@@@@@@ @@  @@@  @@   @. .  .@@@  @@  @@@  @@@  @@  #@@@@@@+   @ @@ @@@  @@  @@   %@       
      @@  #@@@   @  @@@ @:  @    @@  @@@  @@  @. %@  #@@@  @@@@= =@@@@@ @@@  @@@  @@@     @  :@@@  @@@   @    @  @@  @@@@@@    @@  @@ @@  %@    @@  @@      
      @: @@@@    @# @@ @@@  @@@      @@-  @@@@@  @@@   @@   @@@  @@@@  %@@@  @@#  @@@ .  -@*  @@  @@@@@  @@@  @@ @@   @@      @@*  @@  @@ @       @* @      
    @@  @@        @ @@@@@  -@@@:   @@@@   @@@@  *@@@@#  @@@  @@  @@@@ #@@@@  @@%  @@@@@# .@@  @@  .@@@@@  @@@  @@@@  %@@    @@@@@   @@ @@@@        @@ @     
   @@ @@          @@@@@@@   @@@@ :@@@@@   @@%  :@@@@@@*  #@@     @@@ -@@+@@  @@   @@@@@@ =@@   @@  @@@@@@  @@@  @@   @@@@    @@@@  @@ @@@@           @.@@   
  @@.@              @  @@   @@@ @@@@@@@   @@   @@@@@@@@@  @@@   @@@      @@  @@@  @@    @@@@   @@@  *@@@@   @   =@@  @@@@  .  +@@  :@   @             @@@@  
 @@@@                @ @@   @@@ @@@@@@@    @@  +@@@@@@%  %@@@  *@   @@@@ @@  @@   @@ @@@@@@.   @@@@  @@@   @@@.   @  @@@  :@@@@@   :@ @                 @.@ 
 @@                 @@ @@  #@@@@@@@@@@@   @@@@  @@@@@@ :@@@@@  @@  @@@@@@@   @@%  @@@@@@@@     @@@@@. @:  @@@@@@     @@@  @@@@@@@   @  @@                 @@
@                  @*@ @@  @@@@@@@@@@@@   @@@@@   @@#  %@@@@@  @@   @@@@@@.  @@@  @@ @@@    @- @@@@@@   .@@ @@@@@@   @@  @@@@@@@@   @  @#@                  
                 @@ @@@@+  @@@@@@@@@@@@=  @@@@@@  =  =@.@@@@@  @@   @@   @   @@:  @@   @   @@@ @@@@@:@@ @@  @@@@@@  @@   @@@@@@@@.  @@ @ @@                 
                @@  @@@    .@@@@@@@@@@@:  @@@@@@@   #@ @@@@@@  #@:  @@  @@@  @@. .@@   @@  @@  @@@@@@ @@@@@  #@@@  @@   @@@@@@@@@    #@@:  @@               
              @@+         @@@@@@@@@@@@@   %@@@@@@@  @@ @@@@@@   @@  @    @@  @@@ :@     @  @@   @@@@@ .@@@@=  @@@  @@  @@=@@@@@@@@          @@              
             @@         =@@@@@@@@@. @@@  @@@@@@@@@@%@@ @@@@@@@  %@  @     @  .@  =@    @@  @   :@@@@@ @@@@@@#  @  @@  =@= @@@@@@@@@@         @@             
              @@     @  @@@@@@@@@@      @@@@@@@@@@@@@@@ #@@@@@-  @@ +@   @@  @@   @@   @#  @  @@@@@@  @@@@@@@@@  @@@      @@@@@@@@@@@ %.    %@              
              @@    @@@@@@@@@@@@.   *@ @@@@@@@@@@@  @@@  @@@@@@  @@@*@   @@  @@@ @@    @ %@   @@@@@@  @@+ %@@@@@@@@.  .@    @@@@@@@@@@ @@    @@             
             @@#   @@@@@@@@@@@@@* @@@@ %@  @@ @   -@  @: .@@@@@   @@@@    @@ %@ @@    @=@@@  @.@@@@@  @  @   #.@@@   @@@@@- @@@@@@@@@@@@@    @@             
            @@     @@@@@@@@@@@@@ @@@@@@@@         @   @@  @@@@@   @@ @      @@@@@     @@@@   @@@@@@  @@  @@        @@@@@@@@@-@@@@@@@@@@@@     =@            
             @     @@@@@@@@@@@@@@@@@@@@@@@:  %   @@    @@  @@@@@    @        @@      @ @@   @@@@@@. +@    @    @  @@@@@@@@@@@@@@@@@@@@@@@     @@            
             @     @@@@@@@@@@@@@@@@@@@@@@.  @@   @@     @@  .@@@@  .@@                 @   @@@@@@  @@     @    @   @@@@@@@@@@@@@@@@@@@@@@     @@            
             @-    @@@@@@@@@@@@@@@@@@@@@   :@@    %@    @@@  .@@@-   @@               @    =@@@.  #@    @@    #@@   @@@@@@@@@@@@@@@@@@@@@=    @@            
            @@+    %@@@@@@@@@@@@@@@@@@     @@@   .@       @@* @   @@@@               @@ @#   @   @@       @    @@     @@@@@@@@@@@@@@@@@@@     @@            
              @%     @@@@@@@@@@@@@@@@@@    @@@@   @@       @@    @@                      @@.    @@       @:   @ @=   @@@@@@@@@@@@@@@@@@*     @@             
              @@      @@@@@@@@@@@@@@@@@:   @@ @   @@@       @@ @@                          @@   @       @@    @  @   @@@@@@@@@@@@@@@@@      @@              
               @@      %@@@@@@@@@@@@@@=   #@@ @@   @@       @ @@                             @* @       @    @@ @@    @@@@@@@@@@@@@@@     %@@               
               @@@@:     @@@@@@@@@@@@@@    @   @@   @@     @@@                                @@@@    @@.  @@   @@    @@@@@@@@@@@@@@     @@@                
                   @@:     @@@@@@@@@@@    @@    @@   @@     @@                                   @@   @-  @@     @.   @@@@@@@@@@@#     @@@                  
                    @@      %@@@@@@@@@    @@     @@   :@@                                           @@   @@      @@   @@@@@@@@@@      @@@                   
                      @@.     @@@@@@@=   @@        @@   .@@                                       @@   @@@        @.   @@@@@@@      @@@                     
                        @@@    .@@@@@   .@           @@@@- @@@@                              @@@@. @@@@@           @   @@@@@@    .@@@                       
                          @@@    @@@@   @@                                                       @                 @   .@@@%   @@@@                         
                            @@    #@.   @@                                                                         @@  @@@    @@                            
                             @@     .  .@                                                                           @  @@    @@                             
                              @@@      .@                                                                          @@  @@   @@                              
                                @@@     @                                                                          @: @@+.@@                                
                                  @@     @                                                                        @@ @@  @@                                 
                                    @@    =@                                                                    @@. *@ @@                                   
                                    @@@   @@                                                                     @ .@                                       
                                      @@@  @                                                                    @  @                                        
                                        @@@:@                                                                   @-@                                         
                                          @@@@                                                                 @@@                                          
                                            @@                                                                @@                                                                 

`; 