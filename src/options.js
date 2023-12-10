const select = document.getElementById('selectColor')
select.onchange = (e) => {
  chrome.storage.sync.set({ color: e.target.value }, function () {
    console.log("color is " + e.target.value);
  });
}