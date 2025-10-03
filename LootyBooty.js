



async function loadLootData() {
  const response = await fetch('magic-items.txt'); 
  const data = await response.json();
  return data;
}

// ------- Generate Common Loot ------- //////

async function generateCommon() {
  try {
    const lootData = await loadLootData();
    const commonItems = lootData["Common"];
    const randomItem = commonItems[Math.floor(Math.random() * commonItems.length)];
    document.getElementById('commonLootInput').value = randomItem;
  } catch (error) {
    console.error('Error loading common loot:', error);
  }
}

let btnCommon = document.getElementById('btnCommon');
btnCommon.addEventListener('click', generateCommon);



// ------- Generate Uncommon Loot ------- //////


async function generateUncommon() {
  try {
    const lootData = await loadLootData();
    const uncommonItems = lootData["Uncommon"];
    const randomItem = uncommonItems[Math.floor(Math.random() * uncommonItems.length)];
    document.getElementById('uncommonLootInput').value = randomItem;
  } catch (error) {
    console.error('Error loading uncommon loot:', error);
  }
}

let btnUncommon = document.getElementById('btnUncommon');
btnUncommon.addEventListener('click', generateUncommon);


// ------- Generate Rare Loot ------- //////

async function generateRare() {
  try {
    const lootData = await loadLootData();
    const rareItems = lootData["Rare"];
    const randomItem = rareItems[Math.floor(Math.random() * rareItems.length)];
    document.getElementById('rareLootInput').value = randomItem;
  } catch (error) {
    console.error('Error loading rare loot:', error);
  }
}

let btnRare = document.getElementById('btnRare');
btnRare.addEventListener('click', generateRare);


// ------- Generate Very Rare Loot ------- //////

async function generateVeryRare() {
  try {
    const lootData = await loadLootData();
    const veryRareItems = lootData["Very Rare"];
    const randomItem = veryRareItems[Math.floor(Math.random() * veryRareItems.length)];
    document.getElementById('veryRareLootInput').value = randomItem;
  } catch (error) {
    console.error('Error loading very rare loot:', error);
  }
}

let btnVeryRare = document.getElementById('btnVeryRare');
btnVeryRare.addEventListener('click', generateVeryRare);


// fix-me-text