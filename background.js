chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (!tab.url || changeInfo.status !== 'complete') return;

    const result = await chrome.storage.sync.get('blockedSites');
    const blockedSites = result.blockedSites || [];
    console.log(blockedSites);

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    for (const siteData of blockedSites) {
        if (!tab.url.includes(siteData.site)) continue;

        if (!siteData.time) {
            chrome.tabs.remove(tabId);
            return;
        }

        if (siteData.timeFrom && siteData.timeTo) {
            const [fromH, fromM] = siteData.timeFrom.split(':').map(Number);
            const [toH, toM] = siteData.timeTo.split(':').map(Number);

            const fromMinutes = fromH * 60 + fromM;
            const toMinutes = toH * 60 + toM;

            if (currentMinutes >= fromMinutes && currentMinutes <= toMinutes) {
                chrome.tabs.remove(tabId);
                return;
            }
        }
    }
});
