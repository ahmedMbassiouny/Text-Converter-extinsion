chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "convertText",
    title: "Convert Text",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "convertText") {
    chrome.tabs.sendMessage(tab.id, { action: "convertText", selectedText: info.selectionText });
  }
});
