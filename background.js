chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
    if (!tab.url || changeInfo.status !== 'complete') return;
    const result = await chrome.storage.sync.get('blockedSites');
    const blockedSites = result.blockedSites || [];
    for (const siteData of blockedSites) {
        if (!siteData.time) {
        }
        // if (tab.url.includes(site)) {
        //     chrome.tabs.remove(tabId);
        //     return;
        // }
    }
});
