document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const currentCat = urlParams.get('cat');
  const currentSystem = urlParams.get('system');
  const id = urlParams.get('id');
  const qsCurrentCat = currentCat ? `cat=${currentCat}` : null;
  const qsCurrentSystem = currentSystem ? `system=${currentSystem}` : null;
  let items = await (await fetch("items.json")).json();
  items = items.filter(item => item.id === id);
  const item = items[0];
  const itemId = item.id;
  const itemTitle = item.title;
  const itemSystem = item.system.id;

  const systemDetails = () => {
    if (itemSystem === 'sega') {
      return ['segaMD', 'md'];
    }
    if (itemSystem === 'nintendo') {
      return ['snes', 'zip'];
    }

    return ['arcade', 'zip']
  };

  const [core, extension] = systemDetails();
  EJS_player = "#game";
  EJS_core = core;
  EJS_gameName = itemTitle;
  EJS_color = "#0064ff";
  EJS_pathtodata = "https://cdn.emulatorjs.org/stable/data/";
  EJS_gameUrl = `assets/${itemId}.${extension}`;
  const homeButton = document.querySelector('.home-btn');
  linkArray = [qsCurrentSystem, qsCurrentCat].filter(Boolean);
  homeButton.href = linkArray.length > 0 ? `/?${linkArray.join('&')}` : '/';
  const myScript = document.createElement("script");
  myScript.setAttribute("src", "https://cdn.emulatorjs.org/stable/data/loader.js");
  document.body.appendChild(myScript);
});