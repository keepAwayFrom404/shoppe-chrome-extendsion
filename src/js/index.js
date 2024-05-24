console.log(OpenCC, "hello i am good man!");

const cmdMap = {
  /**翻译 */
  fanyiInput,
  /**置顶 */
  toTop,
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // console.log(sender.tab ?"from a content script:" + sender.tab.url :"from the extension");
  cmdMap[request.cmd]();
  sendResponse("我收到了你的消息！");
});

function fanyiInput() {
  var converter = OpenCC.Converter({ from: "cn", to: "hk" });
  var a = document.querySelectorAll(".combination_ipt .ant-input")[0];
  a.value = converter(a.value);
  a.dispatchEvent(new CustomEvent("input"));

  var c = document.getElementsByClassName("product_desc")[0];
  c.value = converter(c.value);
  c.dispatchEvent(new CustomEvent("input"));

  var d = document.querySelectorAll(".edit_variation_name input");
  var e = document.getElementsByClassName("bsicon_save");
  d.forEach((item, idx) => {
    item.value = converter(item.value);
    item.dispatchEvent(new CustomEvent("input"));
    let temp = e[idx];
    temp.click();
  });
}

function toTop() {
  window.scroll({
    top: document.documentElement.scrollHeight,
    behavior: "smooth",
  }); // 滚动到底部才有相应元素
  setTimeout(() => {
    let count = 0;
    let b = document.querySelectorAll(".shopee-dropdown-menu .shopee-popover__ref");
    b.forEach((btn, idx) => {
      if (btn.outerText.includes("点我置顶推广") && count < 5) {
        btn.click();
        count++;
      }
    });
  }, 3000);
}
