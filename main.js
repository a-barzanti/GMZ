document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const currentCat = urlParams.get('cat');
  const currentSystem = urlParams.get('system');
  const qsCurrentCat = currentCat ? `cat=${currentCat}` : null;
  const qsCurrentSystem = currentSystem ? `system=${currentSystem}` : null;
  let items = await (await fetch("items.json")).json();
  if (currentSystem) {
    items = items.filter((item) => item.system.id === currentSystem);
  }
  if (currentCat) {
    items = items.filter((item) => item.cat.id === currentCat);
  }
  const categories = [...new Map(items.map((item) => [item.cat.id, item.cat])).values()];
  const systems = [...new Map(items.map((item) => [item.system.id, item.system])).values()];
  const activeButtonClasses = 'bg-white text-left text-sm text-gray-800 py-2 px-2 rounded flex items-center gap-1 border border-gray-300';
  const inactiveButtonClasses = 'hover:bg-white text-left text-sm text-gray-800 py-2 px-2 rounded flex items-center gap-1';
  const itemButtonClasses = 'w-64 h-48 bg-gray-300 rounded-md bg-cover flex overflow-hidden';
 
  const catButton = document.querySelector('.cat > a');
  categories.forEach((cat) => {
    const newButton = catButton.cloneNode(true);
    if (cat.id === currentCat) {
      newButton.className = `w-full ${activeButtonClasses}`;
    }
    newButton.className = `w-full ${inactiveButtonClasses}`;
    newButton.querySelector(':scope > span').textContent = cat.title;
    newButton.querySelector(':scope > img').src = `/img/cat_${cat.id}.svg`;
    const qsNextCat = `cat=${cat.id}`;
    newButton.href = `?${[qsCurrentSystem, qsNextCat].filter(Boolean).join('&')}`;
    catButton.parentNode.appendChild(newButton);
  });

  const sysButton = document.querySelector('.sys > a');
  systems.forEach((system) => {
    const newButton = sysButton.cloneNode(true);
    if (system.id === currentSystem) {
      newButton.className = `w-24 ${activeButtonClasses}`;
    }
    newButton.className = `w-24 ${inactiveButtonClasses}`;
    newButton.textContent = system.title;
    const qsNextSystem = `system=${system.id}`;
    console.log([qsNextSystem, qsCurrentCat].filter(Boolean));
    newButton.href = `?${[qsNextSystem, qsCurrentCat].filter(Boolean).join('&')}`;
    sysButton.parentNode.appendChild(newButton);
  });

  const itemButton = document.querySelector('.items > a');
  items.forEach((item) => {
    const newButton = itemButton.cloneNode(true);
    newButton.className = itemButtonClasses;
    newButton.style = `background-image: url(/img/${item.id}.png)`;
    newButton.querySelector(':scope > div').textContent = item.title;
    const qsItem = `id=${item.id}`;
    newButton.href = `item.html?${[qsCurrentSystem, qsCurrentCat, qsItem].filter(Boolean).join('&')}`;
    itemButton.parentNode.appendChild(newButton);
  });
});
