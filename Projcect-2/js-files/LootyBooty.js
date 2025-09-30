/*
<div id="loot-gen-common" class="container row col-4 mx-auto">
        <label for="commonLootInput" class="form-label">Common Loot</label>
        <input id="commonLootInput" type="text" class="form-control" placeholder="Generated loot will appear here" title="Generated loot common" readonly>
        <button type="submit" id="btnCommon" onclick="generateCommon()">Generate Common Loot</button>
    </div>

    */

let allItemDetails = [];

async function preloadItems() {
  const response = await fetch('https://www.dnd5eapi.co/api/magic-items');
  const data = await response.json();

  const validItems = data.results.slice(0, 50); // Limit to 50 for now
  allItemDetails = await Promise.all(
    validItems.map(item =>
      fetch(`https://www.dnd5eapi.co${item.url}`).then(res => res.json())
    )
  );
}

    // --------- common loot generator ----------- /////
async function generateCommon() {
  const apiUrl = 'https://www.dnd5eapi.co/api/magic-items';
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Fetch full details for each item
    const itemDetails = await Promise.all(
      data.results.map(item =>
        fetch(`https://www.dnd5eapi.co${item.url}`).then(res => res.json())
      )
    );

    // Filter by rarity
    const commonItems = itemDetails.filter(item => item.rarity && item.rarity.name === 'Common');

    // Pick one at random
    const randomItem = commonItems[Math.floor(Math.random() * commonItems.length)];
    document.getElementById('commonLootInput').value = randomItem.name;
  } catch (error) {
    console.error('Error fetching common loot:', error);
  }
}
     let btnCommon = document.getElementById('btnCommon');
     btnCommon.addEventListener('click', generateCommon);