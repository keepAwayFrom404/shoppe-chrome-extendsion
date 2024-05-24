const btn = document.getElementById('changeColor')
const toTop = document.getElementById('top')
// btn.onclick = function() {
//   chrome.storage.sync.get('color', data => {
//     console.log(data, 'data ===>')
//     chrome.tabs.query({active: true,currentWindow: true}, tabs => {
//       console.log(tabs, 'tabs')
//       chrome.tabs.executeScript(tabs[0].id, {
//         code: 'document.body.style.backgroundColor = "' + data.color + '";',
//       })
//     })
//   })
// }

function sendMessageToContentScript(message, callback)
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs)
	{
		chrome.tabs.sendMessage(tabs[0].id, message, function(response)
		{
			if(callback) callback(response);
		});
	});
}

 btn.onclick = function () {
  sendMessageToContentScript({cmd:'fanyiInput'}, function(response)
{
	console.log('来自content的回复：'+response);
});
 }
 toTop.onclick = function () {
  sendMessageToContentScript({cmd:'toTop'}, function(response)
{
	console.log('来自content的回复：'+response);
});
 }
