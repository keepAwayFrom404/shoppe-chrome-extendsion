/**
 * 它是一个常驻的页面(但是即使访问页面也不是真正运行的那个background，只能调试代码，无法真正的访问页面)，它的生命周期是插件中所有类型页面中最长的；它随着浏览器的打开而打开，随着浏览器的关闭而关闭，所以通常把需要一直运行的、启动就运行的、全局的代码放在background里面
 */
chrome.runtime.onInstalled.addListener(function () {
  console.log("shoppe插件已被安装");
  chrome.storage.sync.set({ color: "#ff7200" }, function () {
    console.log("storage init color value");
  });

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { hostEquals: "baidu.com" },
          }),
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()],
      },
    ]);
  });
});

chrome.contextMenus.create({
  id: "cadenli",
  title: "测试右键菜单",
  title: "使用度娘搜索：%s", // %s表示选中的文字
  contexts: ["selection"], // 只有当选中文字时才会出现此右键菜单
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "cadenli") {
    // 注意不能使用location.href，因为location是属于background的window对象
    chrome.tabs.create({
      url: "https://www.baidu.com/s?ie=utf-8&wd=" + encodeURI(info.selectionText),
    });
  }
});
