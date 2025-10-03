
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
    imageHere.style.fontFamily = "Bangers, system-ui";
    imageHere.style.fontWeight = "400";
    imageHere.style.fontStyle = "normal";
    return;
  }

  const apiKey = "PmclBFOvDxc7GOSn7wQDXdYm20OSjF99";
  const url =  `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(query)}&limit=50&offset=0&rating=r`;
  try {
    const response = await fetch(url);
    const result = await response.json();

     imageHere.innerHTML = " ";
  
    if (result.data && result.data.length > 0) {
  const shuffled = result.data.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, 10);


  for (let gif of selected) {
  
  const gifUrl = gif.images.original.url;

  const gifBox = document.createElement("div");
  gifBox.classList.add("gif-box");

  const img = document.createElement("img");
  img.src = gifUrl;
  img.alt = query;



  gifBox.appendChild(img);
  imageHere.appendChild(gifBox);
}


} else {
  imageHere.textContent = "No results found, please check your spelling or enter a different search term.";
  imageHere.style.fontFamily = "Bangers, system-ui";
  imageHere.style.fontWeight = "400";
  imageHere.style.fontStyle = "normal";
}

  } catch (err) {
    console.error(err);
    imageHere.textContent = "No results found, please check your spelling or enter a different search term.";
  }
}

