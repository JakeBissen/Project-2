
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
  
  document.body.style.backgroundColor = isJiffMode ? "#b2a675ff" : "white";

  document.body.style.backgroundColor = isJiffMode ? "#ffcc00" : "orange";

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

