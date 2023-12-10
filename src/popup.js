const btn = document.getElementById('changeColor')
btn.onclick = function() {
  chrome.storage.sync.get('color', data => {
    console.log(data, 'data ===>')
    chrome.tabs.query({active: true,currentWindow: true}, tabs => {
      console.log(tabs, 'tabs')
      chrome.tabs.executeScript(tabs[0].id, {
        code: 'document.body.style.backgroundColor = "' + data.color + '";',
      })
    })
  })
}