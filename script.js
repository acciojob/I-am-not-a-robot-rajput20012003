//your code here
// Get the main container
const main = document.querySelector('main');

// Define images array
const images = ['img1', 'img2', 'img3', 'img4', 'img5'];

// Shuffle the images array
function shuffleImages() {
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
}

// Render the images
function renderImages() {
  shuffleImages();
  main.innerHTML = '';

  const repeatIndex = Math.floor(Math.random() * images.length);
  let repeatClass = '';

  for (let i = 0; i < images.length; i++) {
    const img = document.createElement('img');
    img.classList.add(images[i]);
    img.src = `https://picsum.photos/200/300?random=${Math.random()}`;

    if (i === repeatIndex) {
      repeatClass = images[i];
    }

    img.addEventListener('click', () => handleImageClick(img));

    main.appendChild(img);
  }

  return repeatClass;
}

// Function to handle image click
let clickedImages = [];
let verifyButton = null;

function handleImageClick(img) {
  if (verifyButton) return;

  img.classList.toggle('selected');

  if (clickedImages.length < 2) {
    clickedImages.push(img);
  }

  if (clickedImages.length === 2) {
    verifyButton = document.createElement('button');
    verifyButton.id = 'verify';
    verifyButton.innerHTML = 'Verify';
    verifyButton.addEventListener('click', handleVerify);
    main.appendChild(verifyButton);
  }

  if (clickedImages.length > 2) {
    main.removeChild(verifyButton);
    clickedImages.forEach(image => image.classList.remove('selected'));
    clickedImages = [];
  }
}

// Function to handle verify button click
function handleVerify() {
  const para = document.createElement('p');
  para.id = 'para';
  para.textContent = clickedImages[0].classList.contains(clickedImages[1].classList[0])
    ? 'You are a human. Congratulations!'
    : 'We can\'t verify you as a human. You selected the non-identical tiles.';
  main.appendChild(para);
  main.removeChild(verifyButton);
  clickedImages.forEach(image => image.classList.remove('selected'));
  clickedImages = [];
}

// Render the initial state
function renderInitialState() {
  const h3 = document.createElement('h3');
  h3.id = 'h';
  h3.textContent = 'Please click on the identical tiles to verify that you are not a robot.';
  main.appendChild(h3);

  const resetButton = document.createElement('button');
  resetButton.id = 'reset';
  resetButton.textContent = 'Reset';
  resetButton.style.display = 'none';
  resetButton.addEventListener('click', handleReset);
  main.appendChild(resetButton);

  renderImages();
}

// Function to handle reset button click
function handleReset() {
  const para = document.getElementById('para');
  if (para) main.removeChild(para);
  if (verifyButton) main.removeChild(verifyButton);
  clickedImages.forEach(image => image.classList.remove('selected'));
  clickedImages = [];
  renderImages();
}

// Initialize the app
renderInitialState();

