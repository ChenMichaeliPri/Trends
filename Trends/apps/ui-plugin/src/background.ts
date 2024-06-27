chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "get_url") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError);
        sendResponse({ url: null });
        return;
      }
      const activeTab = tabs[0];
      sendResponse({ url: activeTab.url });
    });
    return true; // Indicate you wish to send a response asynchronously
  }
});
