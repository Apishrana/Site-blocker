const timeDiv = document.getElementById('timeDiv');
const form = document.querySelector('form');
const timeToggle = document.getElementById('timeToggle');

timeToggle.addEventListener('change', () => {
    timeDiv.style.display = timeToggle.checked ? 'flex' : 'none';
});

timeDiv.style.display = timeToggle.checked ? 'flex' : 'none';

const list = document.getElementById('list');

async function render() {
    const { blockedSites = [] } = await chrome.storage.sync.get('blockedSites');
    list.innerHTML = '';
    blockedSites.forEach((siteData) => {
        const li = document.createElement('li');
        const del = document.createElement('button');
        del.textContent = 'X';
        del.onclick = async () => {
            const updated = blockedSites.filter(
                (s) => s.site !== siteData.site,
            );
            await chrome.storage.sync.set({
                blockedSites: updated,
            });
            render();
        };
        li.textContent = siteData.site + ' ';
        li.appendChild(del);
        list.appendChild(li);
    });
}

form.onsubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const { blockedSites = [] } = await chrome.storage.sync.get('blockedSites');

    const Pl = {
        site: data.get('site').trim(),
        time: timeToggle.checked,
        timeFrom: data.get('timeInputFrom') || '',
        timeTo: data.get('timeInputTo') || '',
    };
    
    if (Pl.time && (!Pl.timeFrom?.trim() || !Pl.timeTo?.trim())) {
        console.log('a');
        Pl.time = false;
        timeToggle.checked = false;
        timeDiv.style.display = 'none';
    }

    blockedSites.push(Pl);
    console.log(blockedSites);

    await chrome.storage.sync.set({
        blockedSites,
    });
    form.reset();
    timeToggle.checked = false;
    timeDiv.style.display = 'none';
    render();
};

render();
