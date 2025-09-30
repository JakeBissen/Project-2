/*
<div id="loot-gen-common" class="container row col-4 mx-auto">
        <label for="commonLootInput" class="form-label">Common Loot</label>
        <input id="commonLootInput" type="text" class="form-control" placeholder="Generated loot will appear here" title="Generated loot common" readonly>
        <button type="submit" id="btnCommon" onclick="generateCommon()">Generate Common Loot</button>
    </div>

    */



async function loadLootData() {
  const response = await fetch('/Projcect-2/data/magic-items.json');
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
btnCommon.addEventListener('click', generateUncommon);


