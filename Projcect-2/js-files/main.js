
const title = document.getElementById('title');
const search = document.getElementById('search');
const btnSearch = document.getElementById('btnSearch');
const jiffButton = document.getElementById('jiff');

let isJiffMode = false; 

function turnJiff() {
  isJiffMode = !isJiffMode;

  if (isJiffMode) {
    title.innerHTML = "THE JIFF GENERATOR";
    search.placeholder = "Search for a Jiff";
    btnSearch.innerHTML = "Click to Generate Jiff";
    jiffButton.innerHTML = "Switch to GIF";
  } else {
    title.innerHTML = "THE GIF GENERATOR";
    search.placeholder = "Search for a Gif";
    btnSearch.innerHTML = "Click to Generate Gif";
    jiffButton.innerHTML = "Switch to JIFF"; 
  }

  //  Flip the button color to contrast with the background
  jiffButton.style.backgroundColor = isJiffMode ? "#966d96" : "#699269";

  jiffButton.classList.toggle("jiff-hover-jiff", isJiffMode);
  jiffButton.classList.toggle("jiff-hover-gif", !isJiffMode);

  //Set body background to match mode
  document.body.style.backgroundColor = isJiffMode ? "#699269" : "#966d96";
}



let imageHere = document.getElementById('js-image-appear-here');

async function generateImg() {
  const query = search.value.trim(); 
  if (!query) {
    imageHere.textContent = "Please enter a search term!";
    return;
  }

  const apiKey = "PmclBFOvDxc7GOSn7wQDXdYm20OSjF99";
  const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${encodeURIComponent(query)}&rating=r`;

  try {
    const response = await fetch(url);
    const result = await response.json();

     imageHere.innerHTML = "";


    if (result.data) {
      const gifUrl = result.data.images.original.url;
      const img = document.createElement("img");
      img.src = gifUrl;
      img.alt = query;
            imageHere.appendChild(img);
    } else {
      imageHere.textContent = "No results found, please check your spelling or enter a different search term.";
    }
  } catch (err) {
    console.error(err);
    imageHere.textContent = "No results found, please check your spelling or enter a different search term.";
  }
}




const MAX_REQUESTS = 100;
const COOLDOWN_DURATION = 60 * 60 * 1000; // 1 hour
const cooldownMessage = document.getElementById("cooldown-message");

// Load saved data
let requestCount = parseInt(localStorage.getItem("requestCount")) || 0;
let cooldownEndTime = parseInt(localStorage.getItem("cooldownEndTime")) || null;

// Call this when a request is made
function trackRequest() {
  requestCount++;
  localStorage.setItem("requestCount", requestCount);

  if (requestCount >= MAX_REQUESTS) {
    cooldownEndTime = Date.now() + COOLDOWN_DURATION;
    localStorage.setItem("cooldownEndTime", cooldownEndTime);
    startCooldownTimer();
  }
}

// Countdown logic
function startCooldownTimer() {
  const interval = setInterval(() => {
    const now = Date.now();
    const timeLeft = cooldownEndTime - now;

    if (timeLeft <= 0) {
      clearInterval(interval);
      requestCount = 0;
      cooldownEndTime = null;
      localStorage.removeItem("requestCount");
      localStorage.removeItem("cooldownEndTime");
      cooldownMessage.textContent = "You can now generate GIFs again!";
      setTimeout(() => location.reload(), 3000);
    } else {
      const minutes = Math.floor(timeLeft / 60000);
      const seconds = Math.floor((timeLeft % 60000) / 1000);
      cooldownMessage.textContent = `Cooldown active: ${minutes}m ${seconds}s remaining`;
    }
  }, 1000);
}

// Start timer if cooldown is active on page load
if (cooldownEndTime && Date.now() < cooldownEndTime) {
  startCooldownTimer();
}