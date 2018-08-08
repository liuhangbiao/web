//需要监听copy事件的元素
const listenBlock = document.querySelector('#postContent');
// 给该元素绑定copy事件
listenBlock.addEventListener(
    'copy',
    evt => {
    // IE8以及更早版本，不支持 getSelection，做一下兼容回退处理。
    if (typeof window.getSelection === 'undefined') return; // IE8 or earlier...
    // 获取selection对象
    const selection = window.getSelection();

    // 复制内容过短的话，就不追加内容了，增强下用户体验。
    if (selection.toString().length < 30) return;

    // 动态创建不可见元素，并将复制选取的内容填入
    const tmpDiv = document.createElement('div');
    tmpDiv.style.position = 'absolute';
    tmpDiv.style.left = '-99999px';
    document.body.appendChild(tmpDiv);
    tmpDiv.appendChild(selection.getRangeAt(0).cloneContents());

    // 啊，遇到的坑：pre 标签需要特殊处理一下，否则换行将被清除。
    // 除了 selection 对象，还要了解下 Range: https://developer.mozilla.org/en-US/docs/Web/API/Range
    if (selection.getRangeAt(0).commonAncestorContainer.nodeName == 'PRE') {
        tmpDiv.innerHTML = `<pre>${tmpDiv.innerHTML}</pre>`;
    }
    // 注意换行使用br标签
    tmpDiv.innerHTML += `<br /><br /><br />作者：道心 <br />邮箱：liuhangbiaoo@gmail.com <br />链接：<a href='${
        document.location.href
    }'>${document.location.href}</a> <br />著作权归作者所有，商业转载请联系作者获得授权，非商业转载请注明出处。`;
    // 更新复制内容
    selection.selectAllChildren(tmpDiv);
    // 不要忘了移除动态元素
    window.setTimeout(() => {
        document.body.removeChild(tmpDiv);
    }, 200);
    }
);
