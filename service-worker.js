chrome.webNavigation.onCommitted.addListener(async (details) => {
  chrome.storage.sync.set({ 'url': details.url });
});
